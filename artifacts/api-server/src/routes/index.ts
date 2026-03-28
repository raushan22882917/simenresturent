import { Router, type IRouter } from "express";
import healthRouter from "./health";
import tablesRouter from "./tables";
import ordersRouter from "./orders";
import bookingsRouter from "./bookings";
import contactsRouter from "./contacts";
import menuRouter from "./menu";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(tablesRouter);
router.use(ordersRouter);
router.use(bookingsRouter);
router.use(contactsRouter);
router.use(menuRouter);
router.use(statsRouter);

export default router;
