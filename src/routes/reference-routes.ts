import { Router } from "express";
import { ReferenceController } from "@controllers";
import { validate } from "@middlewares";
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
  validate(referenceFiltersSchema, "query"),
  controller.getAll.bind(controller),
);

router.get(
  "/:id",
  validate(referenceIdSchema, "params"),
  controller.getById.bind(controller),
);

router.post(
  "/",
  validate(createReferenceSchema),
  controller.create.bind(controller),
);

router.patch(
  "/:id",
  validate(referenceIdSchema, "params"),
  validate(updateReferenceSchema),
  controller.update.bind(controller),
);

router.delete(
  "/:id",
  validate(referenceIdSchema, "params"),
  controller.delete.bind(controller),
);

router.patch(
  "/:id/rating",
  validate(referenceIdSchema, "params"),
  validate(updateRatingSchema),
  controller.updateRating.bind(controller),
);

export { router as referenceRoutes };
