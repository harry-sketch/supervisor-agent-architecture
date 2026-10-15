import { HumanMessage, tool } from "langchain";
import z from "zod";
import { calendarAgent } from "../agents/sub-agents/calendar.agent.ts";
import { contactAgent } from "../agents/sub-agents/contact.agent.ts";
import { emailAgent } from "../agents/sub-agents/email.agent.ts";

const calendarAgentTool = tool(
  async ({ request }) => {
    const resp = await calendarAgent.invoke({
      messages: [new HumanMessage(request)],
    });

    const lastMsg = resp.messages[resp.messages.length - 1]?.text;

    return lastMsg;
  },
  {
    name: "manage_calendar_events",
    description: `
       Schedule calendar events using natural language.
       Use this when the user wants to create, modify, or check calendar appointments.
       Handles date/time parsing, availability checking, and event creation.

       Input: Natural language scheduling request (e.g., 'meeting with design team next Tuesday at 2pm')
    `.trim(),
    schema: z.object({
      request: z.string().describe("Natural language scheduling request"),
    }),
  },
);

const emailAgentTool = tool(
  async ({ request }) => {
    const resp = await emailAgent.invoke({
      messages: new HumanMessage(request),
    });

    const lastMsg = resp.messages.at(-1)?.text;

    return lastMsg;
  },
  {
    name: "manage_email",
    description: `Send emails using natural language.
      Use this when the user wants to send notifications, reminders, or any email communication.
      Handles recipient extraction, subject generation, and email composition.

     Input: Natural language email request (e.g., 'send them a reminder about the meeting`.trim(),
    schema: z.object({
      request: z.string().describe("Natural language email request"),
    }),
  },
);

const contactAgentTool = tool(
  async ({ request }) => {
    const resp = await contactAgent.invoke({
      messages: new HumanMessage(request),
    });

    const lastMsg = resp.messages.at(-1)?.text;

    return lastMsg;
  },
  {
    name: "manage_contacts",
    description: `
     Get contacts using natural language.
     Use this when the user wants to get list of contacts or even single contact.

     Input: Natural language contact request (e.g., 'give me all contacts for design team.')
    `.trim(),
    schema: z.object({
      request: z.string().describe("Natural language contact list request"),
    }),
  },
);

export const supervisorTools = [
  contactAgentTool,
  emailAgentTool,
  calendarAgentTool,
];
