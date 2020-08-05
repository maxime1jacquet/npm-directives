import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';

import {
  ngxFieldZipcodeFR,
  ngxFieldMinCheckbox
} from './../../../projects/ngx-field-errors/src/public-api';

@Component({
  selector: 'ngx-simple-count-ngx-field-errors',
  templateUrl: './ngx-field-errors.component.html',
  styleUrls: ['./ngx-field-errors.component.scss']
})
export class NgxFieldErrorsComponent implements OnInit {
  public form: FormGroup;

  public checkboxData = [
    { id: 1, name: 'order 1' },
    { id: 2, name: 'order 2' },
    { id: 3, name: 'order 3' },
    { id: 4, name: 'order 4' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      field1: [''],
      field2: ['', Validators.required],
      field3: ['', [Validators.required, Validators.minLength(5)]],
      field4: ['', [Validators.required, Validators.email]],
      field5: ['', [Validators.required, ngxFieldZipcodeFR]],
      field6: ['', [Validators.required, Validators.pattern('[a-z]*')]],
      field7: ['', [Validators.required, Validators.max(12)]],
      field8: ['', [Validators.required, Validators.min(12)]],
      field9: ['', [Validators.required]],
      field10: [false, [Validators.requiredTrue]],
      field11: new FormArray([], ngxFieldMinCheckbox(3)),
      field12: ['', [Validators.required]],
      field13: ['', [Validators.required]],
      field14: ['', [Validators.required]],
      field15: ['', [Validators.required]]
    });

    // this.form.valueChanges.subscribe((item) => console.log(this.form));
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.checkboxData.forEach(() => {
      const tt = this.form.get('field11') as FormArray;
      tt.push(new FormControl(false));
    });
  }

  get checboxFormArray() {
    return this.form.controls.field11 as FormArray;
  }
}
