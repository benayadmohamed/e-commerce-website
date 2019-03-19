import { MesRoutesModule } from './mes-routes.module';

describe('MesRoutesModule', () => {
  let mesRoutesModule: MesRoutesModule;

  beforeEach(() => {
    mesRoutesModule = new MesRoutesModule();
  });

  it('should create an instance', () => {
    expect(mesRoutesModule).toBeTruthy();
  });
});
