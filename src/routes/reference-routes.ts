import { Router } from "express";
import { ReferenceController } from "@controllers";
import { validateReference } from "@middlewares";
import {
  createReferenceSchema,
  referenceFiltersSchema,
  referenceIdSchema,
  updateRatingSchema,
  updateReferenceSchema,
} from "@schemas";

const router = Router();
const controller = new ReferenceController();

router.get(
  "/",
  validateReference(referenceFiltersSchema, "query"),
  (req, res) => controller.getAll(req, res),
);

router.get("/:id", validateReference(referenceIdSchema, "params"), (req, res) =>
  controller.getById(req, res),
);

router.post("/", validateReference(createReferenceSchema), (req, res) =>
  controller.create(req, res),
);

router.put(
  "/:id",
  validateReference(referenceIdSchema, "params"),
  validateReference(updateReferenceSchema),
  (req, res) => controller.update(req, res),
);

router.delete(
  "/:id",
  validateReference(referenceIdSchema, "params"),
  (req, res) => controller.delete(req, res),
);

router.patch(
  "/:id/rating",
  validateReference(referenceIdSchema, "params"),
  validateReference(updateRatingSchema),
  (req, res) => controller.updateRating(req, res),
);

export { router as referenceRoutes };
