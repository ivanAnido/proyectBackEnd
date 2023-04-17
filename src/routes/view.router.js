import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();

const producto = new ProductManager("dataProducts.json");

router.get("/", async (req, res) => {
  const prodList = await producto.getProducts();

  let datosProd = {
    listaProductos: prodList,
  };
  res.render("index", datosProd);
});

router.get("/", async (req, res) => {
  const prodList = await producto.getProducts();

  let datosProd = {
    listaProductosLive: prodList,
  };
  res.render("realTimeProducts", datosProd);
});
export default router;
