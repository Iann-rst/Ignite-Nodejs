import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
interface IRequest {
  email: string;
  password: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    // constructor
  }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verificar se o usuário existe
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    // verificar se a senha existe
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    // Gerar jsonwebtoken
    const token = sign({}, "b59785b7da2085fdc46442df3728f5ad", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
