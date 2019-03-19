import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlickCarouselComponent} from './slick-carousel.component';
import {SlickNavComponent} from './slick-nav/slick-nav.component';
import {SlickForComponent} from './slick-for/slick-for.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [SlickCarouselComponent,
    SlickNavComponent,
    SlickForComponent],
  declarations: [SlickCarouselComponent, SlickNavComponent, SlickForComponent]
})
export class SlickCarouselModule {
}
