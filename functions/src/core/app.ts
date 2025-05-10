import express from "express";
import { routes } from "../routes";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(routes);

export default app;
