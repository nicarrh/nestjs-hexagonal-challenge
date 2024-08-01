import { Inject, Injectable } from '@nestjs/common';
import { ContractRepositoryPort } from '../../domain/contract.repository.port';
import { ContractModel } from '../../domain/contract.model';

@Injectable()
export class CreateContractUseCase {
  constructor(
    @Inject('ContractRepository') private contractRepository: ContractRepositoryPort,
  ) {}

  async execute(contract: ContractModel): Promise<ContractModel> {
    const createdContract = await this.contractRepository.createContract(contract);
    return createdContract;
  }
}
