import { Request, Response, NextFunction } from "express";
import { errorHandler } from "@middlewares";
import { AppError, BadRequestError, NotFoundError } from "@errors";

const mockReq = {} as Request;
const mockNext = jest.fn() as NextFunction;

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as unknown as Response;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("errorHandler", () => {
  describe("when error is an AppError", () => {
    it("should return the AppError statusCode and message", () => {
      const error = new AppError("Erro customizado.", 422);

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: "Erro customizado.",
      });
    });

    it("should return 400 when error is a BadRequestError", () => {
      const error = new BadRequestError("Dados inválidos.");

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: "Dados inválidos.",
      });
    });

    it("should return 404 when error is a NotFoundError", () => {
      const error = new NotFoundError("Recurso não encontrado.");

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: "Recurso não encontrado.",
      });
    });
  });

  describe("when error is not an AppError", () => {
    it("should return 500 with generic message for generic Error", () => {
      const error = new Error("Erro inesperado.");

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: "Erro interno no servidor.",
        status: 500,
      });
    });

    it("should return 500 for TypeError", () => {
      const error = new TypeError("Cannot read properties of undefined.");

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
});
