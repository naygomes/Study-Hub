import { Request, Response } from "express";
import { ReferenceService } from "@services";
import { ReferenceFilters } from "@types";
import { ReferenceFiltersSchema } from "@schemas";

export class ReferenceController {
  constructor(
    private readonly service: ReferenceService = new ReferenceService(),
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const filters: ReferenceFilters = req.query as ReferenceFiltersSchema;
    const references = await this.service.getAll(filters);
    res.status(200).json({ success: true, data: references });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id); // ok, já validado pelo Zod
    const reference = await this.service.getById(id);
    res.status(200).json({ success: true, data: reference });
  }

  async create(req: Request, res: Response): Promise<void> {
    const reference = await this.service.create(req.body);
    res.status(201).json({ success: true, data: reference });
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id); // ok, já validado pelo Zod
    const reference = await this.service.update(id, req.body);
    res.status(200).json({ success: true, data: reference });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id); // ok, já validado pelo Zod
    await this.service.delete(id);
    res.status(204).send();
  }

  async updateRating(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { rating } = req.body;
    const reference = await this.service.updateRating(id, rating);
    res.status(200).json({ success: true, data: reference });
  }
}
