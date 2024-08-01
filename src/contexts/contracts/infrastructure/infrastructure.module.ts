
import { Module } from "@nestjs/common";
import { ContractController } from "./http-api/controllers/contract.controller";
import { ApplicationModule } from '../application/application.module';

@Module({
    imports: [ApplicationModule],
    controllers: [ContractController],
    providers: [],
    exports: []
})
export class InfrastructureModule {

}