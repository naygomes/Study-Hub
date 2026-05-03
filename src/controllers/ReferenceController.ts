import { Request, Response } from "express";
import { ReferenceService } from "@services";
import { ReferenceFilters } from "@types";

export class ReferenceController {
  constructor(
    private readonly service: ReferenceService = new ReferenceService(),
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const filters: ReferenceFilters = {
      category: req.query.category as string | undefined,
      status: req.query.status as ReferenceFilters["status"] | undefined,
      tag: req.query.tag as string | undefined,
    };

    const references = await this.service.getAll(filters);
    res.status(200).json({ success: true, data: references });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const reference = await this.service.getById(id);
    res.status(200).json({ success: true, data: reference });
  }

  async create(req: Request, res: Response): Promise<void> {
    const reference = await this.service.create(req.body);
    res.status(201).json({ success: true, data: reference });
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const reference = await this.service.update(id, req.body);
    res.status(200).json({ success: true, data: reference });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const message = await this.service.delete(id);
    res.status(200).send({ success: true, message });
  }

  async updateRating(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { rating } = req.body;
    const reference = await this.service.updateRating(id, rating);
    res.status(200).json({ success: true, data: reference });
  }
}
