import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Bearer token
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // pegar o token do header
  // [0] = Bearer
  // [1] = Token
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload; // pega o id do usuário

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: user_id,
    };
    return next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
