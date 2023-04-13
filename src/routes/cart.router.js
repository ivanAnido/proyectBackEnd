import { Router } from "express";
import CartManager from "../controllers/cartManager.js";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const notFound = { error: "Cart not found" };
const productManager = new ProductManager("src/dataProducts.json");
const cartManager = new CartManager("src/dataCart.json");

router.post("/", async (req, res) => {
  await cartManager.createCart();
  res
    .status(201)
    .send({ status: "success", mensaje: "Cart created successfully" });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(parseInt(cid));
  !cart
    ? res.status(404).send(notFound)
    : res.status(200).send({ status: "success", cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const product = await productManager.getProductById(parseInt(pid));
  if (product) {
    const cart = await cartManager.addToCart(parseInt(cid), parseInt(pid));
    !cart ? res.status(404).send(notFound) : res.status(200).send(cart);
  } else {
    res.status(404).send({ error: "Product not found" });
  }
});
export default router;
