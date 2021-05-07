export interface IMail {
  to: string[];
  templateId: string;
  payload?: Record<string, unknown>;
}
