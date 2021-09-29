import { Test, TestingModule } from '@nestjs/testing';
import { ModifierOrchestratorService } from './ModifierOrchestrator.service';

describe('ModifierOrchestratorService', () => {
  let service: ModifierOrchestratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifierOrchestratorService],
    }).compile();

    service = module.get<ModifierOrchestratorService>(ModifierOrchestratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
