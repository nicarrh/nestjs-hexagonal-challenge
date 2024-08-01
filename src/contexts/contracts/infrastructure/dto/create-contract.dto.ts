import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ContractModel } from '../../domain/contract.model';

export class CreateContractDTO implements ContractModel {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
