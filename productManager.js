class ProductManager {
    constructor(){
        this.products = []
        this.productId = 0
    }
  
    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock)
            console.log("Todos los campos son obligatorios"); 
        

            //metodo "some" devuelve true o false de cada elemento del array segun la condicion  
        const codeRepeat = this.products.some(product => product.code === code)
        if(codeRepeat) {
            throw new Error(`ya existe el producto con el codigo: ${code}`)
        }
        
        const newProduct = new Product(title, description, price, thumbnail, code, stock)
        newProduct.id = this.productId
        this.productId++

        this.products.push(newProduct)

        return newProduct
    }

    getProduct(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id)
        return product ?  product : console.error("Product not found")
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
const product = new ProductManager()
product.getProduct()
// console.log(product);

//se llama al metodo "addProduct"
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123",25)
// console.log(product);

// //se vuelve a llamar al metodo "addProduct" lanzando un error por code repetido
// product.addProduct("producto prueba", "este es un producto prueba",2 , "sin imagen", "abc123" )
// console.log(product);

// se evalua "getProductById" 

console.log(product.getProductById(0));