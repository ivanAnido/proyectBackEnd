import { Router } from "express";

const router = Router();

let users = [
  { id: "1", nombre: "nombre 1", apellido: "apellido 1", genero: "F" },
  { id: "2", nombre: "nombre 2", apellido: "apellido 2", genero: "F" },
  { id: "3", nombre: "nombre 3", apellido: "apellido 3", genero: "M" },
  { id: "4", nombre: "nombre 4", apellido: "apellido 4", genero: "F" },
  { id: "5", nombre: "nombre 5", apellido: "apellido 5", genero: "M" },
  { id: "6", nombre: "nombre 6", apellido: "apellido 6", genero: "M" },
  { id: "7", nombre: "nombre 7", apellido: "apellido 7", genero: "F" },
  { id: "8", nombre: "nombre 8", apellido: "apellido 8", genero: "M" },
];

router.get("/", (req, res) => {
  const { genero } = req.query;

  if (!genero || (genero !== "M" && genero !== "F")) {
    return res.send({ users });
  }

  let userFilter = users.filter((user) => user.genero === genero);

  response.send({ users });
});

router.post("/", (req, res) => {
  let user = req.body;
  //!user significa que es distiton a undefined
  if (!user.nombre || !user.apellido)
    return res.status(404).send({ status: "error", message: "User not found" });
  //.push agrega user al objeto users
  users.push(user);

  res.status(200).send({ users });
});

router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const user = req.body;
  //validar id

  //valida campos
  if (!user.nombre || !user.apellido)
    return res
      .status(404)
      .send({ status: "error", message: "todos los campos son necesarios" });
  //validar pid y buscar por pid el user
  const index = users.findIndex((user) => user.id === pid);
  if (index === -1) res.send({ status: "erorr", message: "User not found" });

  users[index] = user;

  res.send({ users });
});

router.delete("/:uid", (req, res) => {
  let { uid } = req.params;
  const index = users.findIndex((user) => user.id === uid);
  if (index === -1) res.send({ status: "erorr", message: "User not found" });

  users = users.filter((user) => user.id !== uid);

  res.send({ users });
});

export default router;
