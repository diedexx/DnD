import { Module } from '@nestjs/common';
import { ModifierOrchestratorService } from './ModifierOrchestrator.service';

@Module({
  providers: [ModifierOrchestratorService]
})
export class ModifierModule {}
