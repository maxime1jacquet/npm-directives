import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-simple-count-ngx-parallax',
  templateUrl: './ngx-parallax.component.html',
  styleUrls: ['./ngx-parallax.component.scss']
})
export class NgxParallaxComponent implements OnInit {
  active = true;
  constructor() {}

  ngOnInit() {}

  toogleParallax() {
    this.active = !this.active;
  }
}
