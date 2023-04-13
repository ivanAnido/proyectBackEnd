import fs from "fs";
import { promises } from "fs";
const fsP = promises;

const products = [];
const path = "dataProducts.json";

class ProductManager {
  constructor(path) {
    this.products = products;
    this.path = path;
  }

  // Agrega productos al JSON
  async addProduct(product) {
    try {
      const productsFile = await fsP.readFile(this.path, "utf-8");
      let products = JSON.parse(productsFile);

      //valida que esten los campos
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.status ||
        !product.stock
      )
        return console.log("Every fields are request");

      //asigna un id autoincremental
      products.push({ id: products.length + 1, ...product });
      //escribe los datos en el archivo
      return fsP.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  // Método que elimina un producto con el ID desde el JSON
  async deleteProduct(pid) {
    try {
      const data = await fsP.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const index = products.findIndex((product) => product.id === pid);
      if (index !== -1) {
        products.splice(index, 1);
      } else {
        console.log(`Product with id ${pid} not found`);
        return;
      }
      return fsP.writeFile(
        this.path,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
    } catch (err) {
      console.log(err);
    }
  }

  // Traer productos desde el JSON
  getProducts = async (limit) => {
    try {
      let data = await fsP.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      return parseData;
    } catch (err) {
      return [];
    }
  };
  // Actualizar/modificar productos
  async updateProduct(pid, newProduct) {
    try {
      const data = await fsP.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const index = products.findIndex((product) => product.id === pid);
      if (index !== -1) {
        newProduct.id = pid;
        products[index] = newProduct;
      } else {
        console.log(`Product with id ${pid} not found`);
      }
      return fsP.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  // Trae producto con ID desde JSON
  async getProductById(pid) {
    try {
      const contenido = await fsP.readFile(this.path, "utf-8");

      let product = JSON.parse(contenido);
      let productId = product.find((prod) => prod.id === pid);

      if (!product) return "Product not found";

      return productId;
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductManager;
