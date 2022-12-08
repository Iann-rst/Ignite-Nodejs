interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  brand: string;
  fine_amount: number;
  category_id: string;
}

export { ICreateCarDTO };
