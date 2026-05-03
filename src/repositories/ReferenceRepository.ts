import { PrismaClient } from "@prisma/client";
import {
  CreateReferenceData,
  ReferenceFilters,
  UpdateReferenceData,
} from "@types";
import prisma from "../lib/prisma";

export class ReferenceRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  private deserializeTags(reference: {
    tags: string | null;
    [key: string]: unknown;
  }) {
    return {
      ...reference,
      tags: reference.tags ? (JSON.parse(reference.tags) as string[]) : [],
    };
  }

  async findAll(filters: ReferenceFilters = {}) {
    const category = filters?.category?.toLowerCase();
    const status = filters?.status;
    const tag = filters?.tag?.toLowerCase();

    const references = await this.db.reference.findMany({
      where: {
        ...(category && { category }),
        ...(status && { status }),
        ...(tag && { tags: { contains: tag } }),
      },
      orderBy: { createdAt: "desc" },
    });

    return references.map((ref: any) => this.deserializeTags(ref));
  }

  async findById(id: number) {
    const reference = await this.db.reference.findUnique({ where: { id } });
    return reference ? this.deserializeTags(reference) : null;
  }

  async create(data: CreateReferenceData) {
    const reference = await this.db.reference.create({
      data: {
        title: data.title,
        description: data?.description ?? null,
        author: data?.author ?? null,
        url: data.url,
        category: data.category.toLowerCase(),
        status: data.status,
        rating: data?.rating ?? null,
        tags: data?.tags ? JSON.stringify(data.tags) : null,
      },
    });

    return this.deserializeTags(reference);
  }

  async update(id: number, data: UpdateReferenceData) {
    const reference = await this.db.reference.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description ?? null,
        author: data.author ?? null,
        url: data.url,
        category: data.category?.toLowerCase(),
        status: data.status,
        rating: data.rating ?? null,
        ...(data.tags !== undefined && { tags: JSON.stringify(data.tags) }),
      },
    });

    return this.deserializeTags(reference);
  }

  async updateRating(id: number, rating: number) {
    const reference = await this.db.reference.update({
      where: { id },
      data: { rating },
    });

    return this.deserializeTags(reference);
  }

  async delete(id: number) {
    await this.db.reference.delete({ where: { id } });
  }
}
