import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./car.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoute } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);

router.use("/password", passwordRoute);

export { router };
