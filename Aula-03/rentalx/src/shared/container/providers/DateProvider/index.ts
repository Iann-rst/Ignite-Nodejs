import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
