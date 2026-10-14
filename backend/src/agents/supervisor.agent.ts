import { MemorySaver } from "@langchain/langgraph";
import { createAgent } from "langchain";
import { model } from "../llm/openAi.model.ts";
import { SUPERVISOR_PROMPT } from "../prompts/index.ts";
import { supervisorTools } from "../tools/index.ts";

const checkpointer = new MemorySaver();

export const supervisorAgent = createAgent({
  model: model,
  tools: supervisorTools,
  systemPrompt: SUPERVISOR_PROMPT,
  name: "supervisor_agent",
  checkpointer,
});
