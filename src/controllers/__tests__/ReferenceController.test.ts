import { Request, Response } from "express";
import { ReferenceController } from "@controllers";
import { ReferenceService } from "@services";
import { NotFoundError } from "@errors";
import { MOCK_REFERENCE_SERVICE } from "../../__mocks__/referenceService.mock";

const mockService: jest.Mocked<ReferenceService> = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateRating: jest.fn(),
  delete: jest.fn(),
} as unknown as jest.Mocked<ReferenceService>;

const controller = new ReferenceController(mockService);

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
} as unknown as Response;

const mockReq = (overrides: Partial<Request> = {}): Request =>
  ({
    query: {},
    params: {},
    body: {},
    ...overrides,
  }) as unknown as Request;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ReferenceController", () => {
  describe("getAll", () => {
    it("should return 200 with references when service returns data", async () => {
      mockService.getAll.mockResolvedValue([MOCK_REFERENCE_SERVICE]);

      await controller.getAll(mockReq({ query: {} }), mockRes);

      expect(mockService.getAll).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: [MOCK_REFERENCE_SERVICE],
      });
    });

    it("should pass filters to service when query params are provided", async () => {
      mockService.getAll.mockResolvedValue([MOCK_REFERENCE_SERVICE]);

      await controller.getAll(
        mockReq({ query: { category: "livro", status: "pending" } }),
        mockRes,
      );

      expect(mockService.getAll).toHaveBeenCalledWith({
        category: "livro",
        status: "pending",
      });
    });

    it("should throw when service throws an error", async () => {
      mockService.getAll.mockRejectedValue(new Error("Service error"));

      await expect(controller.getAll(mockReq(), mockRes)).rejects.toThrow(
        "Service error",
      );
    });
  });

  describe("getById", () => {
    it("should return 200 with reference when it exists", async () => {
      mockService.getById.mockResolvedValue(MOCK_REFERENCE_SERVICE);

      await controller.getById(mockReq({ params: { id: "1" } }), mockRes);

      expect(mockService.getById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: MOCK_REFERENCE_SERVICE,
      });
    });

    it("should throw NotFoundError when service throws NotFoundError", async () => {
      mockService.getById.mockRejectedValue(
        new NotFoundError("Referência não encontrada."),
      );

      await expect(
        controller.getById(mockReq({ params: { id: "99" } }), mockRes),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("create", () => {
    it("should return 201 with created reference when data is valid", async () => {
      mockService.create.mockResolvedValue(MOCK_REFERENCE_SERVICE);
      const body = {
        title: "Clean Code",
        url: "https://exemplo.com",
        category: "livro",
        status: "pending",
      };

      await controller.create(mockReq({ body }), mockRes);

      expect(mockService.create).toHaveBeenCalledWith(body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: MOCK_REFERENCE_SERVICE,
      });
    });

    it("should throw when service throws an error", async () => {
      mockService.create.mockRejectedValue(new Error("Service error"));

      await expect(
        controller.create(mockReq({ body: {} }), mockRes),
      ).rejects.toThrow("Service error");
    });
  });

  describe("update", () => {
    it("should return 200 with updated reference when it exists", async () => {
      const updated = { ...MOCK_REFERENCE_SERVICE, title: "Updated Title" };
      mockService.update.mockResolvedValue(updated);

      await controller.update(
        mockReq({ params: { id: "1" }, body: { title: "Updated Title" } }),
        mockRes,
      );

      expect(mockService.update).toHaveBeenCalledWith(1, {
        title: "Updated Title",
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: updated,
      });
    });

    it("should throw NotFoundError when service throws NotFoundError", async () => {
      mockService.update.mockRejectedValue(
        new NotFoundError("Referência não encontrada."),
      );

      await expect(
        controller.update(mockReq({ params: { id: "99" }, body: {} }), mockRes),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("delete", () => {
    it("should return 204 with no body when reference is deleted", async () => {
      mockService.delete.mockResolvedValue(undefined);

      await controller.delete(mockReq({ params: { id: "1" } }), mockRes);

      expect(mockService.delete).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalledWith();
    });

    it("should throw NotFoundError when service throws NotFoundError", async () => {
      mockService.delete.mockRejectedValue(
        new NotFoundError("Referência não encontrada."),
      );

      await expect(
        controller.delete(mockReq({ params: { id: "99" } }), mockRes),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("updateRating", () => {
    it("should return 200 with updated reference when rating is valid", async () => {
      const updated = { ...MOCK_REFERENCE_SERVICE, rating: 3 };
      mockService.updateRating.mockResolvedValue(updated);

      await controller.updateRating(
        mockReq({ params: { id: "1" }, body: { rating: 3 } }),
        mockRes,
      );

      expect(mockService.updateRating).toHaveBeenCalledWith(1, 3);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: updated,
      });
    });

    it("should throw NotFoundError when service throws NotFoundError", async () => {
      mockService.updateRating.mockRejectedValue(
        new NotFoundError("Referência não encontrada."),
      );

      await expect(
        controller.updateRating(
          mockReq({ params: { id: "99" }, body: { rating: 5 } }),
          mockRes,
        ),
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw when service throws an error", async () => {
      mockService.updateRating.mockRejectedValue(new Error("Service error"));

      await expect(
        controller.updateRating(
          mockReq({ params: { id: "1" }, body: { rating: 5 } }),
          mockRes,
        ),
      ).rejects.toThrow("Service error");
    });
  });
});
