import { Router } from "express";

const carts = require("./cart.router");
const products = require("./products.router");

const router = Router();

router.use("/products", products);
router.use("/carts", carts);

export default router;
