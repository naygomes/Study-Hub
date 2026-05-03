export type Status = "pending" | "reading" | "completed" | "review";

export interface Reference {
  id: number;
  title: string;
  description?: string | null;
  author?: string | null;
  url: string;
  status: Status;
  tags?: string[] | null;
  rating?: number | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateReferenceInput = Omit<
  Reference,
  "id" | "createdAt" | "updatedAt"
> & {
  tags?: string[] | null;
};

export type UpdateReferenceInput = Partial<CreateReferenceInput>;
