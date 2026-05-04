import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "@middlewares";

const mockNext = jest.fn() as NextFunction;

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as unknown as Response;

const mockReq = (overrides: Partial<Request> = {}): Request =>
  ({
    body: {},
    params: {},
    query: {},
    ...overrides,
  }) as unknown as Request;

const testSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  age: z.number().int().min(0, "A idade deve ser positiva."),
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("validate middleware", () => {
  describe("when validating body (default)", () => {
    it("should call next when body is valid", () => {
      const req = mockReq({ body: { name: "Nayara", age: 25 } });

      validate(testSchema)(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should replace req.body with parsed data when body is valid", () => {
      const req = mockReq({ body: { name: "Nayara", age: 25 } });

      validate(testSchema)(req, mockRes, mockNext);

      expect(req.body).toEqual({ name: "Nayara", age: 25 });
    });

    it("should return 400 with errors when body is invalid", () => {
      const req = mockReq({ body: { name: "", age: 25 } });

      validate(testSchema)(req, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false, errors: expect.any(Array) }),
      );
    });

    it("should return errors with field and message when body is invalid", () => {
      const req = mockReq({ body: { name: "", age: -1 } });

      validate(testSchema)(req, mockRes, mockNext);

      const response = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(response.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "name",
            message: expect.any(String),
          }),
        ]),
      );
    });

    it("should return 400 when required field is missing", () => {
      const req = mockReq({ body: { age: 25 } });

      validate(testSchema)(req, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("when validating params", () => {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive("O id deve ser positivo."),
    });

    it("should call next when params are valid", () => {
      const req = mockReq({ params: { id: "1" } });

      validate(paramsSchema, "params")(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });

    it("should return 400 when param is invalid", () => {
      const req = mockReq({ params: { id: "abc" } });

      validate(paramsSchema, "params")(req, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should not replace req.params when valid", () => {
      const req = mockReq({ params: { id: "1" } });

      validate(paramsSchema, "params")(req, mockRes, mockNext);

      expect(req.params).toEqual({ id: "1" });
    });
  });

  describe("when validating query", () => {
    const querySchema = z.object({
      status: z.enum(["pending", "reading"]).optional(),
    });

    it("should call next when query is valid", () => {
      const req = mockReq({ query: { status: "pending" } });

      validate(querySchema, "query")(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });

    it("should return 400 when query has invalid enum value", () => {
      const req = mockReq({ query: { status: "invalid_status" } });

      validate(querySchema, "query")(req, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next when optional query field is absent", () => {
      const req = mockReq({ query: {} });

      validate(querySchema, "query")(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });
});
