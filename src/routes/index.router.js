import { Router } from "express";
import cartsRouter from "./cart.router.js";
import productsRouter from "./products.router.js";
import multerRouter from "./multer.router.js";
import realTimeProductsRouter from "./view.router.js";
const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/", multerRouter);
router.use("/realTimeProducts", realTimeProductsRouter);

export default router;
