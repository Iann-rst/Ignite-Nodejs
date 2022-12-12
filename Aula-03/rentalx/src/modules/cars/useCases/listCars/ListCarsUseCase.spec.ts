import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Carro1",
      brand: "Car Brand",
      category_id: "category_id",
      daily_rate: 90,
      description: "Car description",
      fine_amount: 40,
      license_plate: "IIA-0011",
    });
    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car Description",
      daily_rate: 110.0,
      license_plate: "DEF-0022",
      fine_amount: 40,
      brand: "Car brand test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car Description",
      daily_rate: 110.0,
      license_plate: "DEF-0022",
      fine_amount: 40,
      brand: "Car brand test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car brand test",
    });

    expect(cars).toEqual([car]);
  });
});
