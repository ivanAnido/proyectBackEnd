// //esto es sincronico bloqueante

// const fs = require("fs")

// // // fs.writeFileSync("./data.txt","Hola mundirigillo \n", "utf-8")

// // console.log(fs.existsSync("./data.txt"))

// // fs.appendFileSync("./data.txt", "esto se agrego con appendFile \n", "utf-8")

// // if(fs.existsSync) {
// //     const contenidoArchivo = fs.readFileSync("./data.txt","utf-8")
// //     console.log(contenidoArchivo);
// // }

// // fs.unlinkSync("./data.txt")

// // fs con  callbacks asicronico

// // // fs.writeFile("./data.txt","este es el contenido de fs con CB","utf-8",(err)=>{
// // //     if(err) console.log("ocurrio un error")
// // // })

// // fs.appendFile("./data.txt","agregado con append","utf-8",(err)=>{
// //     if(err)console.log("ocurrio un error")
// // })

// // fs.readFile("./data.txt","utf-8",(err,contenido)=>{
// //     if(err)console.log("ocurrio un error")
// //     console.log(contenido)
// // })

// //Async y await

// const operacionesAsync = async ()=> {
//     try {
//         let contenido = await fs.promises.readFile("./package.json","utf-8")
//         //.parse (de JSON a objeto JS)
//         const respParse = JSON.parse(contenido)
//         console.log(respParse)
//     } catch (error) {
//         console.log(error)
//     }
// }

// operacionesAsync()
