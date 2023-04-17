import ProductManager from "../../controllers/productManager.js";

const productManager = new ProductManager("dataProducts.json");

const socketProducts = async (io) => {
  const products = await productManager.getProducts();
  io.on("connection", (socket) => {
    console.log("cliente conectado");
    socket.emit("productos", products);
  });
};

export default { socketProducts };
