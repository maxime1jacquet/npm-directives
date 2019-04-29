import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-simple-count-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor() {}

  public html = `
  <div class="slider">
    <div
      simpleSlider
      currentSlide="customIdForCurrentSlide"
      prev="customIdPrevBtn"
      next="customIdNextBtn"
      [time]="300"
    >
      <div class="slider__item">
        <img src="/assets/1.jpg" alt="" />
      </div>
      <div class="slider__item">
        <img src="/assets/2.jpg" alt="" />
      </div>
      <div class="slider__item">
        <img src="/assets/3.jpg" alt="" />
      </div>
    </div>

    <button class="slider__prev" id="customIdPrevBtn">previous</button>
    <button class="slider__next" id="customIdNextBtn">next</button>
    <div class="slider__current" id="customIdForCurrentSlide"></div>
  </div>
  `;
  public scss = `
  .slider {
    position: relative;
  
    &__item {
      height: 600px;
      position: relative;
  
      img {
        height: 100%;
        left: 0;
        object-fit: cover;
        position: absolute;
        top: 0;
        width: 100%;
      }
    }
    &__prev,
    &__next,
    &__current {
      appearance: none;
      background-color: #303f9f;
      border: 0;
      bottom: 0;
      color: #fff;
      font-size: 15px;
      line-height: 1;
      padding: 15px;
      position: absolute;
      z-index: 2;
    }
  
    &__prev,
    &__next {
      &:hover {
        background-color: #ffc107;
        color: #212121;
      }
    }
  
    &__prev {
      left: 0;
    }
    &__next {
      right: 0;
    }
    &__current {
      left: 0;
      margin: 0 auto;
      right: 0;
      text-align: center;
      z-index: 1;
    }
  }
  `;
  ngOnInit() {}
}
