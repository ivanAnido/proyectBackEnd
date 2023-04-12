import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.router.js";
import uploader from "./multer.js";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const routers = router;
const app = express();
const PORT = 8080;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/api", routers);

app.post("/api/products", uploader.single("thumbnail"), (req, res) => {
  res.status(200).send({
    status: "success",
    message: "se subió correctamente",
  });
});

const server = app.listen(PORT, () => {
  console.log(`Listening app port ${server.address().port}`);
});

server.on("error", (error) => {
  console.log("Error", error);
});
