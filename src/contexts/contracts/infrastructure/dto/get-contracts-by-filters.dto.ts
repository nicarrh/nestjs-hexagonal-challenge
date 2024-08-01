import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class GetContractByFilterDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsDate()
  @IsOptional()
  startDate: string | Date;

  @IsString()
  @IsDate()
  @IsOptional()
  endDate: string | Date;
}
