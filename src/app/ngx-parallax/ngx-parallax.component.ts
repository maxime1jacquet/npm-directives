import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'ngx-simple-count-ngx-parallax',
    templateUrl: './ngx-parallax.component.html',
    styleUrls: ['./ngx-parallax.component.scss'],
    standalone: false
})
export class NgxParallaxComponent implements OnInit {
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
