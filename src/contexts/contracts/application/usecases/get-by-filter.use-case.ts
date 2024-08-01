import { Inject, Injectable } from '@nestjs/common';
import { ContractModel } from '../../domain/contract.model';
import { ContractRepositoryPort } from '../../domain/contract.repository.port';

@Injectable()
export class GetByFilterUseCase {
  constructor(
    @Inject('ContractRepository')
    private readonly contractRopository: ContractRepositoryPort,
  ) {}

  async execute(filters: {
    accountNumber: string;
    startDate?: Date | string;
    endDate?: Date | string;
  }): Promise<{ contracts: ContractModel[] }> {
    const res = await this.contractRopository.getByFilter(filters);
    return {
      contracts: res,
    };
  }
}
