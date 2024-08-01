import { CreateContractUseCase } from '../../../application/usecases/create-contract.usecase';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { GetByFilterUseCase } from '../../../application/usecases/get-by-filter.use-case';
import { CreateContractDTO } from '../../dto/create-contract.dto';
import { GetContractByFilterDto } from '../../dto/get-contracts-by-filters.dto';

@Controller()
export class ContractController {
  constructor(
    private createContractUseCase: CreateContractUseCase,
    private getByFilterUseCase: GetByFilterUseCase,
  ) {}

  @Post('/contract')
  async createAuthor(
    @Res() request,
    @Body() contract: CreateContractDTO,
  ): Promise<any> {
    if (
      !contract.accountNumber ||
      !contract.amount ||
      !contract.clientName ||
      !contract.currency ||
      !contract.email
    ) {
      throw new BadRequestException({
        message: 'debe incluir todos los campos necesarios',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const contractCreated = await this.createContractUseCase.execute(contract);
    return request.status(HttpStatus.CREATED).json(contractCreated);
  }

  @Get('/contractList')
  async findContracts(
    @Res() response,
    @Query()
    params: GetContractByFilterDto,
  ): Promise<any> {
    if (!params.accountNumber) {
      throw new BadRequestException({
        message: 'debe incluir el parametro accountNumber',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const res = await this.getByFilterUseCase.execute({
      accountNumber: params.accountNumber,
      startDate: params?.startDate,
      endDate: params?.endDate,
    });
    return response.status(HttpStatus.OK).json(res);
  }
}
