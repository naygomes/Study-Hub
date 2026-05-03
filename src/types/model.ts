export type Status = "pending" | "reading" | "completed" | "review";

export interface Reference {
  id: number;
  title: string;
  description?: string | null;
  author?: string | null;
  url?: string | null;
  status: Status;
  tags: string[];
  rating?: number | null;
  categoryId: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateReferenceInput = Omit<
  Reference,
  "id" | "createdAt" | "updatedAt"
> & {
  tags: string[];
};

export type UpdateReferenceInput = Partial<CreateReferenceInput>;
