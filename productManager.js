const fs = require("fs")

class ProductManager {
    constructor(path){
        this.products = []
        this.productId = 1
        this.path = path
    }
  
    async addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock)
            throw new error("Todos los campos son obligatorios"); 
        

            //metodo "some" devuelve true o false de cada elemento del array segun la condicion  
        const codeRepeat = this.products.some(product => product.code === code)
        if(codeRepeat) {
            throw new Error(`ya existe el producto con el codigo: ${code}`)
        }
        
        const newProduct = new Product(title, description, price, thumbnail, code, stock)
        newProduct.id = this.productId
        this.productId++

        this.products.push(newProduct)

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.error(error);
        }

        return newProduct
    }

    async getProducts(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getProductById(id){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const obj = products.find(product => product.id === id)
            if (!obj) throw new error("Not found")
            return obj ? obj : null 
        } catch (error) {
            console.error(error);
        }
    }

    async updateProduct(id, fieldsToUpdate) {
        try {
          const data = await fs.promises.readFile(this.path, "utf-8");
          const products = JSON.parse(data);
          const indexToUpdate = products.findIndex(
            (product) => product.id === id
          );
          if (indexToUpdate !== -1) {
            //actualizar el producto
            products[indexToUpdate] = { ...products[indexToUpdate], ...fieldsToUpdate };
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return products[indexToUpdate];
          } else {
            throw new Error(`Producto con id ${id} no encontrado`);
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      }

      async deleteProduct(id){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            let products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex === -1) throw new Error(`Producto con id ${id} no encontrado`);
            products.splice(productIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }

}
//se crea instancia "productManager" y se llama a "getProducts"
const product = new ProductManager("./data.json")
// product.getProducts()
// console.log(product);

// se llama al metodo "addProduct"
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123",25)
// console.log(product);

// //se vuelve a llamar al metodo "addProduct" lanzando un error por code repetido
// product.addProduct("producto prueba", "este es un producto prueba",2 , "sin imagen", "abc123" )
// console.log(product);

// se evalua "getProductById" 

console.log(product.getProductById(1));