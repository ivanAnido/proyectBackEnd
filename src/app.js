import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.router.js";
import uploader from "./multer.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import http from "http";

//websocket
import { Server } from "socket.io";

const routers = router;
const app = express();
const PORT = 8080;

const httpServer = http.createServer(app);

//-----------------------Handlebars---------------------------------
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
//----------------------------------------------
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);

app.post("/api/products", uploader.single("thumbnail"), (req, res) => {
  res.status(200).send({
    status: "success",
    message: "se subió correctamente",
  });
});

app.use("/", routers);

//--------------------webSocket------------------------
const io = new Server(httpServer);
httpServer.listen(PORT, () => {
  console.log(`Listening app port ${PORT}`);
});

httpServer.on("error", (error) => {
  console.log("Error", error);
});
