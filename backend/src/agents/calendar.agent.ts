import { createAgent } from "langchain";
import { model } from "../llm/openAi.model.ts";
import { CALENDAR_AGENT_PROMPT } from "../prompts/index.ts";
import { calendarTools } from "../tools/calendar.tool.ts";

export const calendarAgent = createAgent({
  model,
  tools: calendarTools,
  name: "calendar_agent",
  systemPrompt: CALENDAR_AGENT_PROMPT,
});
