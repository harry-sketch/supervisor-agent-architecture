import "dotenv/config";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { HumanMessage } from "langchain";
import { supervisorAgent } from "./src/agents/supervisor.agent";
import { config } from "./src/config/index.ts";

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

      const resp = await supervisorAgent.invoke(
        {
          messages: new HumanMessage(question),
        },
        config,
      );

      const aiMsg = resp.messages.at(-1)?.content;

      console.log(`Assistant: ${aiMsg}`);
    }
  } catch (error) {
    console.log("Somehing went wrong~~~", error);
  } finally {
    rl.close();
  }
};

main();
