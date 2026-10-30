import prisma from "../database";
import { Luminosidade, Prisma } from "@prisma/client";

interface FilterPlantasParams {
  luminosidade?: Luminosidade;
  petFriendly?: boolean;
}

export class PlantaRepository {
  async create(data: Prisma.PlantaCreateInput) {
    return await prisma.planta.create({
      data,
    });
  }

  async findAll(filters: FilterPlantasParams) {
    const where: Prisma.PlantaWhereInput = {};

    if (filters.luminosidade !== undefined) {
      where.luminosidade = filters.luminosidade;
    }

    if (filters.petFriendly !== undefined) {
      where.petFriendly = filters.petFriendly;
    }

    return await prisma.planta.findMany({
      where,
    });
  }

  async findById(id: number) {
    return await prisma.planta.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.PlantaUpdateInput) {
    return await prisma.planta.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.planta.delete({
      where: { id },
    });
  }

  async updateEstoque(id: number, quantidade: number) {
    return await prisma.planta.update({
      where: { id },
      data: {
        estoque: {
          decrement: quantidade,
        },
      },
    });
  }

  async findAllForValorTotal() {
    return await prisma.planta.findMany({
      select: {
        preco: true,
        estoque: true,
      },
    });
  }
}

export default new PlantaRepository();