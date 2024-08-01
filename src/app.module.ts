import { ApplicationModule } from './contexts/contracts/application/application.module';
import { Module } from '@nestjs/common';
import { InfrastructureModule } from './contexts/contracts/infrastructure/infrastructure.module';
import { DomainModule } from './contexts/contracts/domain/domain.module';

@Module({
  imports: [DomainModule, ApplicationModule, InfrastructureModule],
})
export class AppModule {}
