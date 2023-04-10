import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const productManager = new ProductManager();

//productManager es asincronica si async no va a funcionar porque no espera rta
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (!limit) {
      return res.send({
        status: "success",
        products,
      });
    }
    return res.send({
      status: "success",
      products: products.slice(0, limit),
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
