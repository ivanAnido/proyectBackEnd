import { Router } from "express";
import uploader from "../multer.js";
const router = Router();

router.post("/api/products", uploader.single("thumbnail"), (req, res) => {
  res.status(200).send({
    status: "success",
    message: "se subió correctamente",
  });
});

export default router;
