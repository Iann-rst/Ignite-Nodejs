import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  brand: string;
  fine_amount: number;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO };
