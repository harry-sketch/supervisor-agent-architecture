import { createAgent } from "langchain";
import { model } from "../../llm/openAi.model.ts";
import { CONTACT_AGENT_PROMPT } from "../../prompts/index.ts";
import { contactTools } from "../../tools/contact.tool.ts";

export const contactAgent = createAgent({
  model,
  tools: contactTools,
  systemPrompt: CONTACT_AGENT_PROMPT,
  name: "contact_agent",
});
