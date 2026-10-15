import "dotenv/config";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { HumanMessage } from "langchain";
import { supervisorAgent } from "./src/agents/supervisor.agent";
import { config } from "./src/config/index.ts";
import type { IInterrupt, TResponseType } from "./src/types/index.ts";

const main = async () => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    while (true) {
      const question = await rl.question("You: ");

      if (["bye", "thanks"].includes(question.toLowerCase().trim())) {
        break;
      }

      console.log("🤔 Thinking....");

      const resp: TResponseType = await supervisorAgent.invoke(
        {
          messages: new HumanMessage(question),
        },
        config,
      );

      if (resp.__interrupt__) {
        const value = resp.__interrupt__[0]?.value as IInterrupt;

        console.log(value);
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
