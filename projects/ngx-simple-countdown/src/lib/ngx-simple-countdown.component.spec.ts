import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSimpleCountdownComponent } from './ngx-simple-countdown.component';

describe('NgxSimpleCountdownComponent', () => {
  let component: NgxSimpleCountdownComponent;
  let fixture: ComponentFixture<NgxSimpleCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSimpleCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSimpleCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
