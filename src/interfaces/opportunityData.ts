export interface Opportunity {
  id: string;
  name: string;
  stage: "New" | "In Progress" | "Closed Won" | "Closed Lost";
  leadId: string;
}