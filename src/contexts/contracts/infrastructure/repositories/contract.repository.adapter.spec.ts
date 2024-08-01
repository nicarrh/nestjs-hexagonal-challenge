import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaContractRepositoryAdapter } from './contract.repository.adapter';
import { ContractModel } from '../../domain/contract.model';

describe('ContractRepositoryAdapter', () => {
  let repository: PrismaContractRepositoryAdapter;
  let prismaClient: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaContractRepositoryAdapter,
        {
          provide: PrismaClient,
          useValue: {
            contract: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaContractRepositoryAdapter>(
      PrismaContractRepositoryAdapter,
    );
    prismaClient = module.get<PrismaClient>(PrismaClient);
  });

  describe('createContract', () => {
    it('should create a new contract', async () => {
      const contract: ContractModel = {
        clientName: 'Test User 2',
        email: 'userTest2@gmail.com',
        accountNumber: '200-221-212',
        amount: 5000,
        currency: 'USD',
      };

      const createdContract: ContractModel = {
        id: 1,
        clientName: 'Test User 2',
        email: 'userTest2@gmail.com',
        accountNumber: '200-221-212',
        amount: 5000,
        currency: 'USD',
        initialDate: '2024-08-01T15:09:01.681Z',
      };

      (prismaClient.contract.create as jest.Mock).mockResolvedValue(
        createdContract,
      );

      const result = await repository.createContract(contract);

      expect(prismaClient.contract.create).toHaveBeenCalledWith({
        data: {
          clientName: contract.clientName,
          email: contract.email,
          accountNumber: contract.accountNumber,
          amount: contract.amount,
          currency: contract.currency,
        },
      });
      expect(result).toEqual(createdContract);
    });
  });

  describe('get Filtered contracts by accountNumber', () => {
    it('should get contract by filter', async () => {
      const accountNumber = '200-221-212';

      const contract: ContractModel = {
        id: 1,
        clientName: 'Test User 2',
        email: 'userTest2@gmail.com',
        accountNumber: '200-221-212',
        amount: 5000,
        currency: 'USD',
        initialDate: '2024-08-01T15:09:01.681Z',
      };

      (prismaClient.contract.findMany as jest.Mock).mockResolvedValueOnce([
        contract,
      ]);

      const result = await repository.getByFilter({ accountNumber });

      expect(prismaClient.contract.findMany).toHaveBeenCalledWith({
        where: { accountNumber },
      });
      expect(result).toEqual([contract]);
    });
  });
});
