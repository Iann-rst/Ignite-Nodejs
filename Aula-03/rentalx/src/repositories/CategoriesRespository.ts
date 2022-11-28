import { Category } from "../model/Category";

// DTO - Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category); // representa um insert dentro da tabela categories
  }

  list(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
