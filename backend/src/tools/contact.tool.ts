import { tool } from "langchain";
import z from "zod";

const getContacts = tool(
  () => {
    return JSON.stringify([
      { id: 1, team: "design", name: "Sujoy", email: "sujoy@codersgyan.com" },
      { id: 2, team: "design", name: "John", email: "john@codersgyan.com" },
      {
        id: 2,
        team: "development",
        name: "Kevin",
        email: "kevin@codersgyan.com",
      },
    ]);
  },
  {
    name: "get_contacts",
    description: "Get contact lists.",
    schema: z.object({
      search: z
        .string()
        .describe("search query for the contact. e.g: design or sujoy"),
    }),
  },
);

export const contactTools = [getContacts];
