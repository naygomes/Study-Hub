import { BadRequestError, NotFoundError } from "@errors";
import { ReferenceRepository } from "@repositories";
import {
  CreateReferenceData,
  ReferenceFilters,
  UpdateReferenceData,
} from "@types";

const VALID_STATUSES = ["pending", "reading", "completed", "review"] as const;

export class ReferenceService {
  constructor(
    private readonly repository: ReferenceRepository = new ReferenceRepository(),
  ) {}

  async getAll(filters: ReferenceFilters = {}) {
    return this.repository.findAll(filters);
  }

  async getById(id: number) {
    const reference = await this.repository.findById(id);

    if (!reference) {
      throw new NotFoundError("Referência não encontrada.");
    }

    return reference;
  }

  async create(data: CreateReferenceData) {
    if (!data.title?.trim()) {
      throw new BadRequestError("O título é obrigatório.");
    }

    if (!data.category?.trim()) {
      throw new BadRequestError("A categoria é obrigatória.");
    }

    if (!data.url?.trim()) {
      throw new BadRequestError("A URL é obrigatória.");
    }

    return this.repository.create(data);
  }

  async update(id: number, data: UpdateReferenceData) {
    await this.getById(id);

    if (!data?.title?.trim()) {
      throw new BadRequestError("O título não pode ser vazio.");
    }

    if (!data?.category?.trim()) {
      throw new BadRequestError("A categoria não pode ser vazia.");
    }

    if (!data?.url?.trim()) {
      throw new BadRequestError("A URL não pode ser vazia.");
    }

    if (!data?.status?.trim()) {
      throw new BadRequestError("O status não pode ser vazio.");
    }

    if (data?.rating == null) {
      throw new BadRequestError("A nota não pode ser vazia.");
    }

    if (
      !Number.isInteger(data?.rating) ||
      data?.rating < 0 ||
      data?.rating > 5
    ) {
      throw new BadRequestError(
        "A nota deve ser um número inteiro entre 0 e 5.",
      );
    }

    if (
      !VALID_STATUSES.includes(data.status as (typeof VALID_STATUSES)[number])
    ) {
      throw new BadRequestError("O status é inválido.");
    }

    return this.repository.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id);
    return this.repository.delete(id);
  }

  async updateRating(id: number, rating: number) {
    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      throw new BadRequestError(
        "A nota deve ser um número inteiro entre 0 e 5.",
      );
    }

    await this.getById(id);
    return this.repository.updateRating(id, rating);
  }
}

export default new ReferenceService();
