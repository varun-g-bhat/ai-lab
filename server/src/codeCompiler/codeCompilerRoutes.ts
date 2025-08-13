import express from "express";
import {
  compileCode,
  fetchQuiz,
  generate_hints,
  generateQuiz,
} from "./codeCompilerConrtoller";
import authenticate from "../middleware/authUser";

const compileRouter = express.Router();

compileRouter.post("/compile", compileCode);
compileRouter.post("/hints", generate_hints);
compileRouter.post("/quiz", authenticate, generateQuiz);
compileRouter.get("/quiz", authenticate, fetchQuiz);

export default compileRouter;
