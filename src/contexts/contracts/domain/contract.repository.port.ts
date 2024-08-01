import { ContractModel } from './contract.model';

export interface ContractRepositoryPort {
  createContract(contract: ContractModel): Promise<ContractModel>;
  getByFilter(filters: {
    accountNumber: string;
    startDate?: Date | string;
    endDate?: Date | string;
  }): Promise<ContractModel[] | null>;
}
