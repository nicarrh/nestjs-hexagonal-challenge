import { Injectable } from '@nestjs/common';
import { ContractModel } from '../../domain/contract.model';
import { PrismaClient } from '@prisma/client';
import { ContractRepositoryPort } from '../../domain/contract.repository.port';

@Injectable()
export class PrismaContractRepositoryAdapter implements ContractRepositoryPort {
  constructor(private prisma: PrismaClient) {}

  async createContract(contract: ContractModel): Promise<ContractModel> {
    return await this.prisma.contract.create({
      data: {
        clientName: contract.clientName,
        currency: contract.currency,
        email: contract.email,
        accountNumber: contract.accountNumber,
        amount: contract.amount,
      },
    });
  }

  async getByFilter(filters: {
    accountNumber: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ContractModel[] | null> {
    return await this.prisma.contract.findMany({
      where: {
        accountNumber: filters.accountNumber,
        ...(filters.startDate && filters.endDate
          ? {
              initialDate: {
                lte: new Date(filters.endDate),
                gte: new Date(filters.startDate),
              },
            }
          : {}),
      },
    });
  }
}
