import { PrismaClient } from "@prisma/client";
import { ReferenceRepository } from "@repositories";
import { MOCK_REFERENCE } from "./reference.mock";

const mockPrisma = {
  reference: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as unknown as PrismaClient;

const repository = new ReferenceRepository(mockPrisma);

const deserializedReference = {
  ...MOCK_REFERENCE,
  tags: ["typescript", "boas-praticas"],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ReferenceRepository", () => {
  describe("findAll", () => {
    it("should return all references when no filters are provided", async () => {
      (mockPrisma.reference.findMany as jest.Mock).mockResolvedValue([
        MOCK_REFERENCE,
      ]);

      const result = await repository.findAll();

      expect(mockPrisma.reference.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual([deserializedReference]);
    });

    it("should return filtered references when filters are provided", async () => {
      (mockPrisma.reference.findMany as jest.Mock).mockResolvedValue([
        MOCK_REFERENCE,
      ]);

      const result = await repository.findAll({
        category: "Livro",
        status: "pending",
      });

      expect(mockPrisma.reference.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category: "livro",
            status: "pending",
          }),
        }),
      );
      expect(result).toEqual([deserializedReference]);
    });

    it("should return empty array when no references are found", async () => {
      (mockPrisma.reference.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });

    it("should throw when Prisma throws an error", async () => {
      (mockPrisma.reference.findMany as jest.Mock).mockRejectedValue(
        new Error("DB error"),
      );

      await expect(repository.findAll()).rejects.toThrow("DB error");
    });
  });

  describe("findById", () => {
    it("should return deserialized reference when found", async () => {
      (mockPrisma.reference.findUnique as jest.Mock).mockResolvedValue(
        MOCK_REFERENCE,
      );

      const result = await repository.findById(1);

      expect(mockPrisma.reference.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(deserializedReference);
    });

    it("should return null when reference is not found", async () => {
      (mockPrisma.reference.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });

    it("should throw when Prisma throws an error", async () => {
      (mockPrisma.reference.findUnique as jest.Mock).mockRejectedValue(
        new Error("DB error"),
      );

      await expect(repository.findById(1)).rejects.toThrow("DB error");
    });
  });

  describe("create", () => {
    it("should create and return deserialized reference when data is valid", async () => {
      (mockPrisma.reference.create as jest.Mock).mockResolvedValue(
        MOCK_REFERENCE,
      );

      const result = await repository.create({
        title: "Clean Code",
        url: "https://exemplo.com",
        category: "Livro",
        status: "pending",
        tags: ["typescript", "boas-praticas"],
        rating: 5,
      });

      expect(mockPrisma.reference.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            category: "livro",
            tags: JSON.stringify(["typescript", "boas-praticas"]),
          }),
        }),
      );
      expect(result).toEqual(deserializedReference);
    });

    it("should store tags as null when tags are not provided", async () => {
      (mockPrisma.reference.create as jest.Mock).mockResolvedValue({
        ...MOCK_REFERENCE,
        tags: null,
      });

      await repository.create({
        title: "Clean Code",
        url: "https://exemplo.com",
        category: "livro",
        status: "pending",
      });

      expect(mockPrisma.reference.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ tags: null }),
        }),
      );
    });

    it("should throw when Prisma throws an error", async () => {
      (mockPrisma.reference.create as jest.Mock).mockRejectedValue(
        new Error("DB error"),
      );

      await expect(
        repository.create({
          title: "Test",
          url: "https://exemplo.com",
          category: "livro",
          status: "pending",
        }),
      ).rejects.toThrow("DB error");
    });
  });

  describe("update", () => {
    it("should update and return deserialized reference when data is valid", async () => {
      (mockPrisma.reference.update as jest.Mock).mockResolvedValue(
        MOCK_REFERENCE,
      );

      const result = await repository.update(1, {
        title: "Clean Code Atualizado",
      });

      expect(mockPrisma.reference.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
      expect(result).toEqual(deserializedReference);
    });

    it("should throw when Prisma throws P2025 (record not found)", async () => {
      const prismaError = Object.assign(new Error("Record not found"), {
        code: "P2025",
      });
      (mockPrisma.reference.update as jest.Mock).mockRejectedValue(prismaError);

      await expect(
        repository.update(99, { title: "Novo título" }),
      ).rejects.toMatchObject({ code: "P2025" });
    });

    it("should throw when Prisma throws an error", async () => {
      (mockPrisma.reference.update as jest.Mock).mockRejectedValue(
        new Error("DB error"),
      );

      await expect(
        repository.update(1, { title: "Novo título" }),
      ).rejects.toThrow("DB error");
    });
  });

  describe("updateRating", () => {
    it("should update rating and return deserialized reference", async () => {
      (mockPrisma.reference.update as jest.Mock).mockResolvedValue(
        MOCK_REFERENCE,
      );

      const result = await repository.updateRating(1, 5);

      expect(mockPrisma.reference.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { rating: 5 },
      });
      expect(result).toEqual(deserializedReference);
    });

    it("should throw when Prisma throws an Error", async () => {
      (mockPrisma.reference.update as jest.Mock).mockRejectedValue(
        new Error("DB error"),
      );

      await expect(repository.updateRating(99, 5)).rejects.toThrow("DB error");
    });
  });

  describe("delete", () => {
    it("should delete reference and return void when reference exists", async () => {
      (mockPrisma.reference.delete as jest.Mock).mockResolvedValue(
        MOCK_REFERENCE,
      );

      const result = await repository.delete(1);

      expect(mockPrisma.reference.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toBeUndefined();
    });

    it("should throw when Prisma throws an error", async () => {
      (mockPrisma.reference.delete as jest.Mock).mockRejectedValue(
        new Error("DB error"),
      );

      await expect(repository.delete(1)).rejects.toThrow("DB error");
    });
  });
});
