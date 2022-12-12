import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory
    );
  });

  it("should not be able to add a new spec on a non-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Car de teste",
      description: "Carro de teste",
      brand: "Brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "IRS-2020",
    });
    const car_id = car.id;
    const specifications_id = ["54321"];
    await createCarSpecificationUseCase.execute({ car_id, specifications_id });
  });
});
