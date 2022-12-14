import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

// Use Case vai ser injetável
@injectable()
class ListCarsUseCase {
  constructor(
    // Injetar o repositório
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {
    // constructor
  }
  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const listCars = await this.carsRepository.findAvailable(
      category_id,
      brand,
      name
    );
    return listCars;
  }
}

export { ListCarsUseCase };
