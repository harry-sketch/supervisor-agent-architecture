import type { supervisorAgent } from "../agents/supervisor.agent";

export type TResponseType = Awaited<ReturnType<typeof supervisorAgent.invoke>>;

export interface IInterrupt {
  actionRequests: {
    name: string;
    description: string;
  }[];
  reviewConfigs: {
    allowedDecisions: ("approve" | "edit" | "reject")[];
  }[];
}
