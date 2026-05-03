import "dotenv/config";
import express, { Request, Response } from "express";
import { referenceRoutes } from "@routes";
import { errorHandler } from "@middlewares";
import { PORT } from "./settings";

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
app.use("/api/v1/references", referenceRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

export default app;
