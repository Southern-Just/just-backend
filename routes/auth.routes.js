import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

//path : /api/vi/auth/sign-up--> Post body --> {name,email, password} --> creates a new user

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
