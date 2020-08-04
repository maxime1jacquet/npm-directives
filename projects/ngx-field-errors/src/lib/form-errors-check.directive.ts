import {
  Directive,
  OnInit,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  DoCheck
} from '@angular/core';
import { NgControl, FormGroup } from '@angular/forms';

import { errorsMessages } from './messages/messages';
@Directive({
  selector: '[formError]'
})
export class NgxFieldErrorDirective implements OnInit, DoCheck {
  @Input() formError: FormGroup;
  public errorContainer = this.renderer.createElement('div');
  public nativeElement: HTMLElement;
  public parentElement;

  constructor(
    private elementRef: ElementRef,
    private control: NgControl,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.nativeElement = this.elementRef.nativeElement;
    this.parentElement = this.nativeElement.parentNode;
    this.createErrorContainer();
  }

  ngDoCheck(): void {
    if (this.control.touched) {
      this.inputEvent();
    }
  }

  @HostListener('focusout')
  onFocusout() {
    this.inputEvent();
  }

  @HostListener('keyup')
  keyup() {
    this.inputEvent();
  }

  private inputEvent() {
    const errors = this.control.control.errors;
    if (errors) {
      const errorsArr = Object.keys(errors);
      [...errorsArr]?.map((key) => {
        this.addClass();
        this.updateErrorsMessage(key);
      });
    } else {
      this.removeClass();
      this.removeErrorsMessage();
    }
  }

  private updateErrorsMessage(key: string): void {
    let message = errorsMessages[key];
    if (!message) {
      message = errorsMessages.default;
    }
    this.renderer.setProperty(this.errorContainer, 'textContent', message);
  }

  private removeErrorsMessage(): void {
    this.renderer.setProperty(this.errorContainer, 'textContent', '');
  }

  private createErrorContainer(): void {
    this.renderer.addClass(this.errorContainer, 'error-container');
    this.renderer.setStyle(this.errorContainer, 'font-size', '12px');
    this.renderer.setStyle(this.errorContainer, 'font-weight', '500');
    this.renderer.setStyle(this.errorContainer, 'color', '#f44336');
    this.renderer.setStyle(this.errorContainer, 'margin', '3px 0 0 0');
    this.parentElement.appendChild(this.errorContainer);
  }

  private addClass(): void {
    this.renderer.addClass(this.nativeElement, 'field-error');
    this.renderer.addClass(this.parentElement, 'parent-field-error');
  }

  private removeClass(): void {
    this.renderer.removeClass(this.nativeElement, 'field-error');
    this.renderer.removeClass(this.parentElement, 'parent-field-error');
  }
}
