import { Category } from "../entities/Category";

// DTO - Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

// Contrato de categorias.
interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
