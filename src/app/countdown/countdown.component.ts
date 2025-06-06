import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-simple-count-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  standalone: false
})
export class CountdownComponent implements OnInit {
  constructor() {}

  public code0 = `<div simpleCountdown [dateTo]="1747451420"></div>`;

  public code1 = `
    <div
      simpleCountdown
      [dateTo]="1747451420"
      [language]="'fr'"
      [styles]="
        '
        font-size: 26px;
        text-align:center;
        color: #FFF;
        background-color: #3F51B5;
        padding: 18px 13px;
        font-weight: bold;
        min-width:40px;
        margin:0 1px;
      '
      "
    ></div>`;
  public code2 = `
    <div
      simpleCountdown
      (finish)="onfinish()"
      [dateTo]="1747451420"
      [endMessage]="'my custom end message'"
      [styles]="
        '
        font-size: 26px;
        text-align:center;
        color: #FFF;
        background-color: #3F51B5;
        padding: 18px 13px;
        font-weight: bold;
        min-width:40px;
        margin:0 1px;
      '
      "
    ></div>`;
  public code3 = `
  <div
    simpleCountdown
    [dateTo]="1747451420"
    [reactive]="false"
    [styles]="
      '
      font-size: 26px;
      text-align:center;
      color: #FFF;
      background-color: #3F51B5;
      padding: 18px 13px;
      font-weight: bold;
      min-width:40px;
      margin:0 1px;
    '
    "
  ></div>`;

  public code4 = `<div simpleTimeago [date]="1650893120"></div>`;
  public code5 = `<div simpleTimeago [date]="1650893120" language="fr"></div>`;

  ngOnInit() {}

  public onfinish() {}
}
