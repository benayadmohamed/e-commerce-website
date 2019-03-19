import { MatarialModuleModule } from './matarial-module.module';

describe('MatarialModuleModule', () => {
  let matarialModuleModule: MatarialModuleModule;

  beforeEach(() => {
    matarialModuleModule = new MatarialModuleModule();
  });

  it('should create an instance', () => {
    expect(matarialModuleModule).toBeTruthy();
  });
});
