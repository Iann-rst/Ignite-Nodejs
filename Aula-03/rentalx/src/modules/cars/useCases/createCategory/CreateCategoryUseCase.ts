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
class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    // Constructor
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
