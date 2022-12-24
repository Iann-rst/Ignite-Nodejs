import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {
    //
  }

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimun_daily = 1;

    if (!rental) {
      throw new AppError("Rental not found");
    }

    // Verificar o tempo de aluguel

    const dateNow = this.dateProvider.dateNow();

    // diárias de quantos dias o carro ficou alugado
    let daily = this.dateProvider.compareInDays(
      this.dateProvider.dateNow(),
      rental.start_date
    );

    console.log(daily);

    // caso o carro foi alugado e entregue em menos de 24H, compra o valor de 1 diária
    if (daily <= 0) {
      daily = minimun_daily;
    }

    // dias em atraso de entrega
    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );

    console.log(delay);

    let total = 0;
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
