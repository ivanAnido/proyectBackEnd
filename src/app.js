import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const port = 8080;
const product = new ProductManager("data.json");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Bienvenidos</h1>");
});

app.get("/api/productos", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await product.getProducts();
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

app.get("/api/productos/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    // validar si es número
    const productDb = await product.getProductById(parseInt(pid));
    // validar que exista el producto
    if (!productDb) {
      return res.send({ status: "error", error: "producto no encontrado" });
    }
    res.send({ productDb });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port);
