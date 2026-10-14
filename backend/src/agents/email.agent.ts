import { createAgent } from "langchain";
import { model } from "../llm/openAi.model";
import { EMAIL_AGENT_PROMPT } from "../prompts/index.ts";
import { emailTools } from "../tools/email.tool.ts";

export const emailAgent = createAgent({
  model,
  tools: emailTools,
  name: "email_agent",
  systemPrompt: EMAIL_AGENT_PROMPT,
});
