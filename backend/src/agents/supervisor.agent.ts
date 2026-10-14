import { createAgent } from "langchain";
import { model } from "../llm/openAi.model.ts";
import { SUPERVISOR_PROMPT } from "../prompts/index.ts";
import { supervisorTools } from "../tools/index.ts";

export const supervisorAgnt = createAgent({
  model: model,
  tools: supervisorTools,
  systemPrompt: SUPERVISOR_PROMPT,
  name: "supervisor_agent",
});
