export interface ContractModel {
  id?: number;
  clientName: string;
  email: string;
  accountNumber: string;
  amount: number;
  currency: string;
  initialDate?: Date | string;
}
