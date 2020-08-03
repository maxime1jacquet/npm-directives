import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ngxFieldZipcodeFR } from './../../../projects/ngx-field-errors/src/public-api';

@Component({
  selector: 'ngx-simple-count-ngx-field-errors',
  templateUrl: './ngx-field-errors.component.html',
  styleUrls: ['./ngx-field-errors.component.scss']
})
export class NgxFieldErrorsComponent implements OnInit {
  public form: FormGroup;

  constructor(private fg: FormBuilder) {}

  ngOnInit() {
    this.form = this.fg.group({
      field1: [''],
      field2: ['', Validators.required],
      field3: ['', [Validators.required, Validators.minLength(5)]],
      field4: ['', [Validators.required, Validators.email]],
      field5: ['', [Validators.required, ngxFieldZipcodeFR]],
      field6: ['', [Validators.required, Validators.pattern('[a-z]*')]],
      field7: ['', [Validators.required, Validators.max(12)]],
      field8: ['', [Validators.required, Validators.min(12)]],
      field9: ['', [Validators.required]],
      field10: [false, [Validators.required, Validators.requiredTrue]],
      field11: ['', [Validators.required]],
      field12: ['', [Validators.required]],
      field13: ['', [Validators.required]],
      field14: ['', [Validators.required]],
      field15: ['', [Validators.required]]
    });

    this.form.valueChanges.subscribe((item) => {
      console.log(this.form.valid);
    });
  }
}
