import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarRepository implements ICarsRepository {
  async create(data: ICreateCarDTO): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  findByLicensePlate(license_plate: string): Promise<Car> {
    throw new Error("Method not implemented.");
  }
}

export { CarRepository };
