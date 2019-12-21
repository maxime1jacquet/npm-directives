import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cursor1Component } from './cursor1.component';

describe('Cursor1Component', () => {
  let component: Cursor1Component;
  let fixture: ComponentFixture<Cursor1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cursor1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cursor1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
