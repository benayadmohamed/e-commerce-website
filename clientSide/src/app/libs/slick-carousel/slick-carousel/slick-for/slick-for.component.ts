import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-slick-for',
  templateUrl: './slick-for.component.html',
  styleUrls: ['./slick-for.component.css']
})
export class SlickForComponent implements OnInit, AfterViewInit {
  @Input() name: string;
  @Input() slidesToShow: any = 1;
  @Input() slidesToScroll: any = 1;
  @Input() adaptiveHeight: any = false;
  @Input() speed: any;
  @Input() autoplaySpeed: any;
  @Input() infinite: any = false;
  @Input() centerMode: any = false;
  @Input() variableWidth: any = false;
  @Input() autoplay: any = false;
  @Input() fade: any = false;
  @Input() arrows: any = false;
  @Input() focusOnSelect: any = false;
  @Input() cssEase: any = 'linear';
  @Input() asNavFor: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

}
