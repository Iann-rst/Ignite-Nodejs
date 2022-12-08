import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  // Procurar se existe uma especificação com o nome passado
  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });

    return specification;
  }

  // Criar uma especificação
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }
}

export { SpecificationRepository };
