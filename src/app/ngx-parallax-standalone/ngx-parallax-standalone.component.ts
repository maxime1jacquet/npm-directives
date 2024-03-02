import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// import { ParallaxStandaloneDirective } from 'projects/ngx-parallax/src/public_api';
import { ParallaxStandaloneDirective } from '@yoozly/ngx-parallax';

@Component({
  selector: 'ngx-parallax-standalone',
  templateUrl: './ngx-parallax-standalone.component.html',
  styleUrls: ['./ngx-parallax-standalone.component.scss'],
  standalone: true,
  imports: [ParallaxStandaloneDirective, NgIf]
})
export class NgxParallaxStandaloneComponent implements OnInit {
  active = true;
  loaded = true;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

  toogleParallax() {
    this.active = !this.active;
  }
}
