import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../erros/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  user_id: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Bearer token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // pegar o token do header
  // [0] = Bearer
  // [1] = Token
  const [, token] = authHeader.split(" ");

  try {
    const { user_id } = verify(
      token,
      "b59785b7da2085fdc46442df3728f5ad"
    ) as IPayload; // pega o id do usuário

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: user.id,
    };
    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
