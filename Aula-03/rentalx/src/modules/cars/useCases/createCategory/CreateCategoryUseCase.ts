import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../erros/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [] - Definir o tipo de retorno
 * [x] - Alterar o retorno de erro
 * [] - Acessar o repositório
 * [] - Retornar algo
 */

// Classe com única responsabilidade de criar uma categoria.

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {
    // Constructor
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
