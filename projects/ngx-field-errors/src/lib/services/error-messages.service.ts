import { Injectable, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorMessageService {
  private defaultsMessages = {
    fr: {
      required: 'Champ obligatoire',
      email: 'Veuillez saisir un email valide',
      minlength: "Ce champ n'est pas assez long",
      maxlength: 'Ce champ est trop long',
      min: 'Trop petit',
      max: 'Trop grand',
      pattern: 'Le format ne correspond pas',
      requiredTrue: 'Ce champ est requis',
      default: 'Ce champ comporte un erreur',
      // my custom validators
      samePasswords: 'Les mots de passe ne sont pas identiques',
      zipcodeFr: 'Ce champs ne ressemble pas a un code postal',
      minCheckbox: 'minCheckbox',
      siret: 'Veuillez saisir un siret valide'
    },
    en: {
      required: 'Field required',
      email: 'not valid email'
    }
  };

  constructor(
    @Inject('CustomErrorMessage') private customErrorMessage,
    @Inject('CustomLanguage') private customLanguage
  ) {}

  public getMessages() {
    return {
      ...this.defaultsMessages[this.customLanguage],
      ...this.customErrorMessage
    };
  }
}
