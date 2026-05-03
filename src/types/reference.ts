import { Status } from "@types";

export interface ReferenceFilters {
  category?: string;
  status?: Status;
  tag?: string;
}

export interface CreateReferenceData {
  title: string;
  description?: string | null;
  author?: string | null;
  url: string;
  category: string;
  status: Status;
  tags?: string[] | null;
  rating?: number | null;
}

export type UpdateReferenceData = Partial<CreateReferenceData>;
