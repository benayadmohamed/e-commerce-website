import {AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';

@Component({
  selector: 'app-slick-nav',
  templateUrl: './slick-nav.component.html',
  styleUrls: ['./slick-nav.component.css']
})
export class SlickNavComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit {
  @Input() name: string;
  @Input() slidesToShow: any = 1;
  @Input() slidesToScroll: any = 1;
  @Input() adaptiveHeight: Boolean = false;
  @Input() speed: any;
  @Input() autoplaySpeed: any;
  @Input() infinite: Boolean = false;
  @Input() centerMode: Boolean = false;
  @Input() variableWidth: Boolean = false;
  @Input() autoplay: Boolean = false;
  @Input() fade: Boolean = false;
  @Input() arrows: Boolean = true;
  @Input() dots: Boolean = false;
  @Input() focusOnSelect: Boolean = false;
  @Input() cssEase: string;
  /*'linear';*/
  @Input() asNavFor: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.fade) {
      $('\.' + this.name).slick({
        fade: true,
        slidesToShow: this.slidesToShow,
        slidesToScroll: this.slidesToScroll,
        adaptiveHeight: this.adaptiveHeight,
        speed: this.speed,
        autoplaySpeed: this.autoplaySpeed,
        infinite: this.infinite,
        centerMode: this.centerMode,
        variableWidth: this.variableWidth,
        autoplay: this.autoplay,
        arrows: this.arrows,
        focusOnSelect: this.focusOnSelect,
        cssEase: this.cssEase,
        asNavFor: this.asNavFor,
      });
    } else {
      $('\.' + this.name).slick({
        slidesToShow: this.slidesToShow,
        slidesToScroll: this.slidesToScroll,
        adaptiveHeight: this.adaptiveHeight,
        speed: this.speed,
        autoplaySpeed: this.autoplaySpeed,
        infinite: this.infinite,
        centerMode: this.centerMode,
        variableWidth: this.variableWidth,
        autoplay: this.autoplay,
        arrows: this.arrows,
        focusOnSelect: this.focusOnSelect,
        cssEase: this.cssEase,
        asNavFor: this.asNavFor,
      });
    }
    /*'box-shadow': '0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)'*/
    $('.slick-prev').attr('data-content', '←');
    $('.slick-next').attr('data-content', '→');
    $('.slick-prev').html($('<mat-icon>edit</mat-icon>'));
    $('.slick-prev').css({left: '20px', 'z-index': 1});
    $('.slick-next').css({right: '20px', 'z-index': 1});
  }

}
