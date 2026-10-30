import { Request, Response } from "express";
import plantaRepository from "../repositories/PlantaRepository";
import { Luminosidade } from "@prisma/client";

export class PlantaController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, especie, preco, estoque, luminosidade, petFriendly, regaACadaDias } = req.body;

      if (
        nome === undefined ||
        especie === undefined ||
        preco === undefined ||
        estoque === undefined ||
        luminosidade === undefined ||
        petFriendly === undefined ||
        regaACadaDias === undefined
      ) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ message: "Nome inválido." });
      }

      if (typeof especie !== "string" || especie.trim() === "") {
        return res.status(400).json({ message: "Espécie inválida." });
      }

      if (!Number.isInteger(preco) || preco <= 0) {
        return res.status(400).json({ message: "O preço deve ser um número inteiro maior que zero." });
      }

      if (!Number.isInteger(estoque) || estoque < 0) {
        return res.status(400).json({ message: "O estoque não pode ser negativo." });
      }

      if (!Object.values(Luminosidade).includes(luminosidade)) {
        return res.status(400).json({ message: "Luminosidade inválida." });
      }

      if (typeof petFriendly !== "boolean") {
        return res.status(400).json({ message: "O campo petFriendly deve ser booleano." });
      }

      if (!Number.isInteger(regaACadaDias) || regaACadaDias < 1) {
        return res.status(400).json({ message: "regaACadaDias deve ser um inteiro de pelo menos 1." });
      }

      const novaPlanta = await plantaRepository.create({
        nome,
        especie,
        preco,
        estoque,
        luminosidade,
        petFriendly,
        regaACadaDias,
      });

      return res.status(201).json(novaPlanta);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno ao cadastrar planta." });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const { luminosidade, petFriendly } = req.query;
      const filters: any = {};

      if (luminosidade !== undefined) {
        if (!Object.values(Luminosidade).includes(luminosidade as Luminosidade)) {
          return res.status(400).json({ message: "Filtro de luminosidade inválido." });
        }
        filters.luminosidade = luminosidade as Luminosidade;
      }

      if (petFriendly !== undefined) {
        if (petFriendly !== "true" && petFriendly !== "false") {
          return res.status(400).json({ message: "Filtro petFriendly inválido." });
        }
        filters.petFriendly = petFriendly === "true";
      }

      const plantas = await plantaRepository.findAll(filters);
      return res.status(200).json(plantas);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno ao listar plantas." });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const planta = await plantaRepository.findById(id);

      if (!planta) {
        return res.status(404).json({ message: "Planta não encontrada." });
      }

      return res.status(200).json(planta);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno ao buscar planta." });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const plantaExiste = await plantaRepository.findById(id);
      if (!plantaExiste) {
        return res.status(404).json({ message: "Planta não encontrada." });
      }

      const { nome, especie, preco, estoque, luminosidade, petFriendly, regaACadaDias } = req.body;
      const dataToUpdate: any = {};

      if (nome !== undefined) {
        if (typeof nome !== "string" || nome.trim() === "") {
          return res.status(400).json({ message: "Nome inválido." });
        }
        dataToUpdate.nome = nome;
      }

      if (especie !== undefined) {
        if (typeof especie !== "string" || especie.trim() === "") {
          return res.status(400).json({ message: "Espécie inválida." });
        }
        dataToUpdate.especie = especie;
      }

      if (preco !== undefined) {
        if (!Number.isInteger(preco) || preco <= 0) {
          return res.status(400).json({ message: "O preço deve ser um número inteiro maior que zero." });
        }
        dataToUpdate.preco = preco;
      }

      if (estoque !== undefined) {
        if (!Number.isInteger(estoque) || estoque < 0) {
          return res.status(400).json({ message: "O estoque não pode ser negativo." });
        }
        dataToUpdate.estoque = estoque;
      }

      if (luminosidade !== undefined) {
        if (!Object.values(Luminosidade).includes(luminosidade)) {
          return res.status(400).json({ message: "Luminosidade inválida." });
        }
        dataToUpdate.luminosidade = luminosidade;
      }

      if (petFriendly !== undefined) {
        if (typeof petFriendly !== "boolean") {
          return res.status(400).json({ message: "O campo petFriendly deve ser booleano." });
        }
        dataToUpdate.petFriendly = petFriendly;
      }

      if (regaACadaDias !== undefined) {
        if (!Number.isInteger(regaACadaDias) || regaACadaDias < 1) {
          return res.status(400).json({ message: "regaACadaDias deve ser um inteiro de pelo menos 1." });
        }
        dataToUpdate.regaACadaDias = regaACadaDias;
      }

      const plantaAtualizada = await plantaRepository.update(id, dataToUpdate);
      return res.status(200).json(plantaAtualizada);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno ao atualizar planta." });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const plantaExiste = await plantaRepository.findById(id);
      if (!plantaExiste) {
        return res.status(404).json({ message: "Planta não encontrada." });
      }

      await plantaRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno ao remover planta." });
    }
  }

  async venda(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const { quantidade } = req.body;

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido." });
      }

      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return res.status(400).json({ message: "A quantidade da venda deve ser um inteiro maior que zero." });
      }

      const planta = await plantaRepository.findById(id);
      if (!planta) {
        return res.status(404).json({ message: "Planta não encontrada." });
      }

      if (planta.estoque < quantidade) {
        return res.status(400).json({ message: "Estoque insuficiente para realizar a venda." });
      }

      const plantaAtualizada = await plantaRepository.updateEstoque(id, quantidade);
      return res.status(200).json(plantaAtualizada);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno ao realizar venda." });
    }
  }

  async getValorTotalEstoque(req: Request, res: Response): Promise<Response> {
    try {
      const plantas = await plantaRepository.findAllForValorTotal();

      let valorTotalEmCentavos = 0;
      let totalDeVasos = 0;

      for (const planta of plantas) {
        valorTotalEmCentavos += planta.preco * planta.estoque;
        totalDeVasos += planta.estoque;
      }

      return res.status(200).json({
        valorTotalEmCentavos,
        totalDeVasos,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno ao calcular valor total do estoque." });
    }
  }
}

export default new PlantaController();