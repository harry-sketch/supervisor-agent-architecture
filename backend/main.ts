import "dotenv/config";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { Command } from "@langchain/langgraph";
import { HumanMessage } from "langchain";
import { supervisorAgent } from "./src/agents/supervisor.agent";
import { config } from "./src/config/index.ts";
import type { IInterrupt, TResponseType } from "./src/types/index.ts";

const main = async () => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  let interruptsArr = [];

  try {
    while (true) {
      const question = await rl.question("You: ");

      const answer = question.toLowerCase().trim();

      if (
        ["bye", "thanks", "okay", "thenks"].includes(
          question.toLowerCase().trim(),
        )
      ) {
        break;
      }

      const approveType = answer === "1" || answer === "yes";

      const editType = answer === "2" || answer === "edit";

      const resume: Record<
        string,
        { decisions: [{ type: "approve" | "reject" | "edit" }] }
      > = {};

      if (interruptsArr.length > 0) {
        const interrupt = interruptsArr[0];
        resume[interrupt?.id ?? ""] = {
          decisions: [
            {
              type: approveType ? "approve" : editType ? "edit" : "reject",
            },
          ],
        };
      }

      console.log("🤔 Thinking....");

      const resp: TResponseType = await supervisorAgent.invoke(
        interruptsArr.length > 0
          ? new Command({
              resume,
            })
          : { messages: new HumanMessage(question) },
        config,
      );

      interruptsArr = [];

      if (resp.__interrupt__) {
        interruptsArr.push(resp.__interrupt__[0]);

        const value = resp.__interrupt__[0]?.value as IInterrupt;

        const description = value.actionRequests.map(
          ({ description }) => description,
        );

        const actionsType = value.reviewConfigs[0]?.allowedDecisions ?? [];

        const actions = actionsType
          .map((val, id) => `${id + 1}: ${val}`)
          .join("\n");

        console.log(description[0]?.replace("/\\n/g", "\n"));
        console.log("\n");
        console.log(`Choose an option \n`);
        console.log(actions);
        console.log("\n");
      } else {
        const aiMsg = resp.messages.at(-1)?.content;
        console.log(`Assistant: ${aiMsg}`);
      }
    }
  } catch (error) {
    console.log("Somehing went wrong~~~", error);
  } finally {
    rl.close();
  }
};

main();
