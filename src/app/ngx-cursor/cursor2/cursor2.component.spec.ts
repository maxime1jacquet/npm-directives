import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cursor2Component } from './cursor2.component';

describe('Cursor2Component', () => {
  let component: Cursor2Component;
  let fixture: ComponentFixture<Cursor2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cursor2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cursor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
