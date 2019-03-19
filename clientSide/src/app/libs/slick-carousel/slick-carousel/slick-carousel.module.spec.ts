import { SlickCarouselModule } from './slick-carousel.module';

describe('SlickCarouselModule', () => {
  let slickCarouselModule: SlickCarouselModule;

  beforeEach(() => {
    slickCarouselModule = new SlickCarouselModule();
  });

  it('should create an instance', () => {
    expect(slickCarouselModule).toBeTruthy();
  });
});
