import { Router } from "express";
import productManager from "../controllers/productManager.js";
import cartManager from "../controllers/cartManager.js";

const router = Router();
let productManagerInstance = new productManager("./data.json");

router.post("/", async (req, res) => {
  await cartManager.createCart();
  res
    .status(200)
    .send({ status: "success", message: "Cart created successfully" });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(parseInt(cid));
  !cart
    ? res.status(404).send({ status: "error", message: "Cart not found" })
    : res.status(200).send({ status: "success", cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const product = await productManagerInstance.getProductById(parseInt(pid));
  if (product) {
    const cart = await cartManager.addToCart(parseInt(cid), parseInt(pid));
    !cart
      ? res.status(404).send({ status: "error", message: "Not found" })
      : res.status(200).send(cart);
  } else {
    res.status(404).send({ error: "Product not found" });
  }
});

export default router;
