import { Module } from '@nestjs/common';
import { CreateContractUseCase } from './usecases/create-contract.usecase';

import { PrismaClient } from '@prisma/client';
import { PrismaContractRepositoryAdapter } from '../infrastructure/repositories/contract.repository.adapter';
import { GetByFilterUseCase } from './usecases/get-by-filter.use-case';

@Module({
  imports: [],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    CreateContractUseCase,
    GetByFilterUseCase,
    {
      provide: 'ContractRepository',
      useClass: PrismaContractRepositoryAdapter,
    },
    
  ],
  exports: [
    CreateContractUseCase,
    GetByFilterUseCase
  ],
})
export class ApplicationModule {}
