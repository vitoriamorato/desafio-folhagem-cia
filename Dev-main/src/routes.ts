import { Router } from "express";
import userController from "./controllers/UserController";
import plantaController from "./controllers/PlantaController";

const routes = Router();

// Rotas de Usuários (já existentes no repositório)
routes.post("/users", (req, res) => userController.createUser(req, res));
routes.get("/users", (req, res) => userController.findAllUsers(req, res));
routes.get("/users/:id", (req, res) => userController.findUserById(req, res));

// Rotas de Plantas (Folhagem & Cia)
routes.post("/plantas", (req, res) => plantaController.create(req, res));
routes.get("/plantas/estoque/valor-total", (req, res) => plantaController.getValorTotalEstoque(req, res));
routes.get("/plantas", (req, res) => plantaController.findAll(req, res));
routes.get("/plantas/:id", (req, res) => plantaController.findById(req, res));
routes.patch("/plantas/:id", (req, res) => plantaController.update(req, res));
routes.delete("/plantas/:id", (req, res) => plantaController.delete(req, res));
routes.post("/plantas/:id/venda", (req, res) => plantaController.venda(req, res));

export default routes;