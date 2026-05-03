import { NotFoundError } from "@errors";
import { ReferenceRepository } from "@repositories";
import {
  CreateReferenceData,
  ReferenceFilters,
  UpdateReferenceData,
} from "@types";

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
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateReferenceData) {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.repository.delete(id);
  }

  async updateRating(id: number, rating: number) {
    await this.getById(id);
    return this.repository.updateRating(id, rating);
  }
}
