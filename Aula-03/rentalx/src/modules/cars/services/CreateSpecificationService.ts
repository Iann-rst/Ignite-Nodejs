import { ISpecificationRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {
    //
  }

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error(`Specification with name: ${name} already exists`);
    }
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };
