import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TinySliderSettings } from 'tiny-slider';

@Component({
    selector: 'wrapper-tiny-slider',
    templateUrl: './wrapper-tiny-slider.component.html',
    styleUrls: ['./wrapper-tiny-slider.component.scss'],
    standalone: false
})
export class WrapperTinySliderComponent implements OnInit, AfterViewInit {
  @ViewChild('tinySlider', { static: false }) tinySlider: any;
  @ViewChild('tinySlider2', { static: false }) tinySlider2: any;
  @ViewChild('tinySlider3', { static: false }) tinySlider3: any;
  public tinySliderConfig: TinySliderSettings = {
    gutter: 20,
    items: 5,
    mouseDrag: true
  };
  public tinySliderConfig2: TinySliderSettings = {
    gutter: 10,
    items: 2,
    mouseDrag: true,
    // autoplay: true,
    // autoplayTimeout: 6000,
    loop: false,
    responsive: {
      1024: {
        items: 1
      }
    }
  };
  public tinySliderConfig3: TinySliderSettings = {
    gutter: 20,
    items: 5,
    mouseDrag: true
  };

  public imageArr$ = new BehaviorSubject([
    'https://www.nasa.gov/sites/default/files/thumbnails/image/iss067e189024.jpeg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/certain_altax_pitch_093021.jpeg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/lc09_l1tp_013042_20220118_b432_bahamas1x1.jpeg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/pia25450.jpeg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/9460197354_907d525c54_o.jpeg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/52149057859_75dc5a8e6b_o.jpeg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/16188673307_e2f8cd50ed_o.jpeg'
  ]);
  public imageArr2 = [
    'https://picsum.photos/200/100',
    'https://picsum.photos/200/200',
    'https://picsum.photos/200/300',
    'https://picsum.photos/100/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/300/300',
    'https://picsum.photos/400/300'
  ];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.tinySlider3.initSlider();
  }

  discover() {
    this.tinySlider.initSlider().subscribe();
  }

  prev() {
    this.tinySlider.goTo('prev');
  }
  next() {
    this.tinySlider.goTo('next');
  }
  play() {
    this.tinySlider2.play();
  }
  pause() {
    this.tinySlider2.pause();
  }
  otherMethods() {
    this.tinySlider.updateSliderHeight();
    this.tinySlider.play();
    this.tinySlider.pause();
    this.tinySlider.refresh();
    // etc ...
  }
}
