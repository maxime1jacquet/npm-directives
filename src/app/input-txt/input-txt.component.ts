import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-txt',
    templateUrl: './input-txt.component.html',
    styleUrls: ['./input-txt.component.css'],
    standalone: false
})
export class InputTxtComponent implements OnInit {
  @Input() fg: FormGroup;
  @Input() label: string;
  @Input() id: string;
  @Input() type = 'text';

  constructor() {}

  ngOnInit() {}
}
