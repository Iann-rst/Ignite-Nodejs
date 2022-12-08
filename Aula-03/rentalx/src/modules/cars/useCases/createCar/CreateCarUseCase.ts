import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  brand: string;
  fine_amount: number;
  category_id: string;
}
@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {
    //
  }
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    fine_amount,
    category_id,
  }: IRequest): Promise<void> {
    this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
    });
  }
}

export { CreateCarUseCase };
