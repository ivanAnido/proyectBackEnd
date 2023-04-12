import fs from "fs";
import { promises } from "fs";
const fsP = promises;

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct(product) {
    //valida que todos los campos estén completos
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    )
      return console.log("se requiere todos los campos");

    // valida el código del producto, si ya existe lo reporta por consola
    let codeRepeat = this.products.find((prod) => prod.code === product.code);
    if (codeRepeat)
      return console.log(
        `este producto ya se encuentra con este codigo, code:"${product.code}"`
      );

    //le asigna un id al producto agregado
    return this.products.push({ id: this.products.length + 1, ...product });
  }

  // Método que elimina un producto con el ID desde el JSON
  deleteProduct(id) {
    fsP.readFile(this.path, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const product = JSON.parse(data);
      const index = product.findIndex((product) => product.id === id);
      if (index !== -1) {
        product.splice(index, 1);
      } else {
        console.log(`Producto con id: ${id} no encontrado`);
        return;
      }
      fs.writeFile(path, JSON.stringify(product, null, 2), "utf-8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Producto con id: ${id} borrado exitosamente`);
        }
      });
    });
  }

  // Método que crea el archivo "DB.json"
  createJsonFile = (path) => {
    fsP.writeFile(
      path,
      JSON.stringify([...product.products], null, 2),
      "utf-8",
      (err) => {
        if (err) return console.log(err);
      }
    );
  };

  getProducts = async () => {
    try {
      let data = await fsP.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      return parseData;
    } catch (err) {
      return [];
    }
  };
  // Actualizar/modificar productos
  updateProduct(pid, newProduct) {
    fsP.readFile(this.path, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const products = JSON.parse(data);
      const index = products.findIndex((product) => product.id === pid);
      if (index !== -1) {
        products[index] = { ...newProduct, pid };
      } else {
        console.log(`Producto con id: ${id} no encontrado`);
        return;
      }
      fsP.writeFile(
        this.path,
        JSON.stringify(products, null, 2),
        "utf-8",
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Producto con id: ${id} modificado exitosamente`);
          }
        }
      );
    });
  }

  // Trae producto con ID desde JSON
  async getProductById(pid) {
    const contenido = await fsP.readFile(this.path, "utf-8");

    let product = JSON.parse(contenido);
    let productId = product.find((prod) => prod.id === pid);

    if (!product) return "Producto no encontrado";

    return productId;
  }
}

const product = new ProductManager("./data.json");

product.addProduct({
  title: "Samsung Galaxy S21 5G",
  description: "Potente, Rápido, 5G",
  price: 799,
  thumbnail: "imagen del Samsung Galaxy S21",
  code: "SG21-5G",
  stock: 5,
});

product.addProduct({
  title: " Auriculares inalámbricos Bose QuietComfort",
  description: "Cancelación de ruido, Confort, Batería",
  price: 249,
  thumbnail: "imagen de los auriculares Bose QuietComfort",
  code: "QC35",
  stock: 50,
});

product.addProduct({
  title: "Televisor LG OLED",
  description: "Delgado, Brillante, Tecnológico",
  price: 1499,
  thumbnail: "imagen del televisor LG OLED",
  code: "OLED65",
  stock: 30,
});

product.addProduct({
  title: "MacBook Pro 16 pulgadas",
  description: "Potente, Portátil, Innovado",
  price: 2399,
  thumbnail: " imagen del MacBook Pro",
  code: "MBP16",
  stock: 20,
});

export default ProductManager;
