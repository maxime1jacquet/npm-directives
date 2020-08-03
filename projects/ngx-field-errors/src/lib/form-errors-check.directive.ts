import {
  Directive,
  OnInit,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  DoCheck
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[formError]'
})
export class ControlErrorsDirective implements OnInit, DoCheck {
  @Input() formError: FormGroup;
  public errorContainer = this.renderer.createElement('div');
  public nativeElement: HTMLElement;
  public parentElement;

  private messages = {
    required: 'Champ obligatoire',
    email: 'Veuillez saisir un email valide',
    siret: 'Veuillez saisir un siret valide',
    minlength: "Ce champ n'est pas assez long",
    maxlength: 'Ce champ est trop long',
    min: 'Trop petit',
    // max: 'Trop grand',
    pattern: 'Le format ne correspond pas',
    requiredTrue: 'Ce champ est requis',
    samePasswords: 'Les mots de passe ne sont pas identiques',
    zipcodeFr: 'Ce champs ne ressemble pas a un code postal',
    default: 'Ce champ comporte un erreur'
  };

  constructor(
    private elementRef: ElementRef,
    private control: NgControl,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.nativeElement = this.elementRef.nativeElement;
    this.parentElement = this.nativeElement.parentNode;

    this.renderer.addClass(this.errorContainer, 'error-container');
    this.renderer.setStyle(this.errorContainer, 'font-size', '12px');
    this.renderer.setStyle(this.errorContainer, 'font-weight', '500');
    this.renderer.setStyle(this.errorContainer, 'color', '#f44336');
    this.renderer.setStyle(this.errorContainer, 'margin', '3px 0 0 0');

    this.parentElement.appendChild(this.errorContainer);
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
    let message = this.messages[key];
    if (!message) {
      message = this.messages.default;
    }
    this.renderer.setProperty(this.errorContainer, 'textContent', message);
  }

  private removeErrorsMessage(): void {
    this.renderer.setProperty(this.errorContainer, 'textContent', '');
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
