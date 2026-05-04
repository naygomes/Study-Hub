import { ReferenceService } from "@services";
import { ReferenceRepository } from "@repositories";
import { NotFoundError } from "@errors";
import { MOCK_REFERENCE_SERVICE } from "../../__mocks__/referenceService.mock";

const mockRepository: jest.Mocked<ReferenceRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateRating: jest.fn(),
  delete: jest.fn(),
} as unknown as jest.Mocked<ReferenceRepository>;

const service = new ReferenceService(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ReferenceService", () => {
  describe("getAll", () => {
    it("should return all references when no filters are provided", async () => {
      mockRepository.findAll.mockResolvedValue([MOCK_REFERENCE_SERVICE]);

      const result = await service.getAll();

      expect(mockRepository.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual([MOCK_REFERENCE_SERVICE]);
    });

    it("should return filtered references when filters are provided", async () => {
      mockRepository.findAll.mockResolvedValue([MOCK_REFERENCE_SERVICE]);

      const result = await service.getAll({
        category: "livro",
        status: "pending",
      });

      expect(mockRepository.findAll).toHaveBeenCalledWith({
        category: "livro",
        status: "pending",
      });
      expect(result).toEqual([MOCK_REFERENCE_SERVICE]);
    });

    it("should return empty array when no references match filters", async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await service.getAll({ category: "inexistente" });

      expect(result).toEqual([]);
    });

    it("should throw when repository throws an error", async () => {
      mockRepository.findAll.mockRejectedValue(new Error("Repository error"));

      await expect(service.getAll()).rejects.toThrow("Repository error");
    });
  });

  describe("getById", () => {
    it("should return reference when it exists", async () => {
      mockRepository.findById.mockResolvedValue(MOCK_REFERENCE_SERVICE);

      const result = await service.getById(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(MOCK_REFERENCE_SERVICE);
    });

    it("should throw NotFoundError when reference does not exist", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getById(99)).rejects.toThrow(NotFoundError);
      await expect(service.getById(99)).rejects.toThrow(
        "Referência não encontrada.",
      );
    });

    it("should throw when repository throws an error", async () => {
      mockRepository.findById.mockRejectedValue(new Error("Repository error"));

      await expect(service.getById(1)).rejects.toThrow("Repository error");
    });
  });

  describe("create", () => {
    it("should create and return reference when data is valid", async () => {
      mockRepository.create.mockResolvedValue(MOCK_REFERENCE_SERVICE);

      const result = await service.create({
        title: "Clean Code",
        url: "https://exemplo.com",
        category: "livro",
        status: "pending",
      });

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MOCK_REFERENCE_SERVICE);
    });

    it("should throw when repository throws an error", async () => {
      mockRepository.create.mockRejectedValue(new Error("Repository error"));

      await expect(
        service.create({
          title: "Test",
          url: "https://exemplo.com",
          category: "livro",
          status: "pending",
        }),
      ).rejects.toThrow("Repository error");
    });
  });

  describe("update", () => {
    it("should update and return reference when it exists", async () => {
      mockRepository.findById.mockResolvedValue(MOCK_REFERENCE_SERVICE);
      mockRepository.update.mockResolvedValue({
        ...MOCK_REFERENCE_SERVICE,
        title: "Clean Code Atualizado",
      } as typeof MOCK_REFERENCE_SERVICE);

      const result = await service.update(1, {
        title: "Clean Code Atualizado",
      });

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.update).toHaveBeenCalledWith(1, {
        title: "Clean Code Atualizado",
      });
      expect(result).toEqual({
        ...MOCK_REFERENCE_SERVICE,
        title: "Clean Code Atualizado",
      });
    });

    it("should throw NotFoundError when reference does not exist", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.update(99, { title: "Novo título" }),
      ).rejects.toThrow(NotFoundError);
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("should throw when repository throws an error on update", async () => {
      mockRepository.findById.mockResolvedValue(MOCK_REFERENCE_SERVICE);
      mockRepository.update.mockRejectedValue(new Error("Repository error"));

      await expect(service.update(1, { title: "Novo título" })).rejects.toThrow(
        "Repository error",
      );
    });
  });

  describe("delete", () => {
    it("should delete reference when it exists", async () => {
      mockRepository.findById.mockResolvedValue(MOCK_REFERENCE_SERVICE);
      mockRepository.delete.mockResolvedValue(undefined);

      await service.delete(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundError when reference does not exist", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.delete(99)).rejects.toThrow(NotFoundError);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it("should throw when repository throws an error on delete", async () => {
      mockRepository.findById.mockResolvedValue(MOCK_REFERENCE_SERVICE);
      mockRepository.delete.mockRejectedValue(new Error("Repository error"));

      await expect(service.delete(1)).rejects.toThrow("Repository error");
    });
  });

  describe("updateRating", () => {
    it("should update rating and return reference when it exists", async () => {
      mockRepository.findById.mockResolvedValue(MOCK_REFERENCE_SERVICE);
      mockRepository.updateRating.mockResolvedValue({
        ...MOCK_REFERENCE_SERVICE,
        rating: 3,
      } as typeof MOCK_REFERENCE_SERVICE);

      const result = await service.updateRating(1, 3);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.updateRating).toHaveBeenCalledWith(1, 3);
      expect(result).toEqual({
        ...MOCK_REFERENCE_SERVICE,
        rating: 3,
      });
    });

    it("should throw NotFoundError when reference does not exist", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.updateRating(99, 5)).rejects.toThrow(NotFoundError);
      expect(mockRepository.updateRating).not.toHaveBeenCalled();
    });

    it("should throw when repository throws an error on updateRating", async () => {
      mockRepository.findById.mockResolvedValue(MOCK_REFERENCE_SERVICE);
      mockRepository.updateRating.mockRejectedValue(
        new Error("Repository error"),
      );

      await expect(service.updateRating(1, 5)).rejects.toThrow(
        "Repository error",
      );
    });
  });
});
