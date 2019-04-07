import { Directive, Input, ElementRef } from "@angular/core";

interface CountdownResult {
  seconds: number;
  minutes: number;
  hours: number;
  day: number;
  years: number;
}

interface CountdownKeywords {
  seconds: string;
  minutes: string;
  hours: string;
  day: string;
  years: string;
}

@Directive({
  selector: "[simpleCountdown]"
})
export class NgxSimpleCountdownDirective {
  @Input() dateTo: number;
  @Input() language = "en";
  @Input() reactive = true;
  @Input() endMessage = "countdown finish";
  @Input() styles =
    "font-size:20px;color:#FFF;background-color:#000;padding:10px 5px;font-weight:bold";
  public keywords: CountdownKeywords;
  public dateNow: number;
  public countdownResult: CountdownResult;

  constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
    this.getDateNow();
    this.setLanguage(this.language);
    this.initSimpleCountdown();
  }

  private createHTML(secondes: number): void {
    let o = "";

    if (secondes > 0) {
      o = '<div style="display:flex;">';

      if (this.countdownResult.years > 0) {
        o += `<div style="${this.styles}">${this.countdownResult.years}${
          this.keywords.years
        }</div>`;
      }
      if (this.countdownResult.day > 0 || this.countdownResult.years > 0) {
        o += `<div style="${this.styles}">${this.countdownResult.day}${
          this.keywords.day
        }</div>`;
      }
      if (
        this.countdownResult.hours > 0 ||
        this.countdownResult.day > 0 ||
        this.countdownResult.years > 0
      ) {
        o += `<div style="${this.styles}">${this.countdownResult.hours}${
          this.keywords.hours
        }</div>`;
      }
      if (
        (this.countdownResult.minutes > 0 ||
          this.countdownResult.hours > 0 ||
          this.countdownResult.day > 0 ||
          this.countdownResult.years > 0) &&
        this.reactive
      ) {
        o += `<div style="${this.styles}">${this.countdownResult.minutes}${
          this.keywords.minutes
        }</div>`;
      }
      if (
        (this.countdownResult.seconds > 0 ||
          this.countdownResult.minutes > 0 ||
          this.countdownResult.hours > 0 ||
          this.countdownResult.day > 0 ||
          this.countdownResult.years > 0) &&
        this.reactive
      ) {
        o += `<div style="${this.styles}">${this.countdownResult.seconds}${
          this.keywords.seconds
        }</div>`;
      }
      o += "</div>";
    } else {
      if (this.endMessage !== "") {
        o += `<div style="${this.styles}">${this.endMessage}</div>`;
      }
    }

    this.elementRef.nativeElement.innerHTML = o;
  }

  private initSimpleCountdown(): void {
    let totalSecondes: number = this.dateTo - this.dateNow;
    this.countdownResult = this.updateSimpleCountdown(totalSecondes);
    this.createHTML(totalSecondes);

    if (this.reactive && totalSecondes > 0) {
      setInterval(_ => {
        totalSecondes--;
        this.countdownResult = this.updateSimpleCountdown(totalSecondes);
        this.createHTML(totalSecondes);
      }, 1000);
    }
  }

  private updateSimpleCountdown(secondes: number): CountdownResult {
    const Years = (secondes / 60 / 60 / 24 / 365) | 0;
    const resteYears = secondes / 60 / 60 / 24 / 365 - Years;
    const Day = (resteYears * 365) | 0;
    const resteDay = resteYears * 365 - Day;
    const Hours = (resteDay * 24) | 0;
    const restHours = resteDay * 24 - Hours;
    const Minutes = (restHours * 60) | 0;
    const restMinutes = restHours * 60 - Minutes;
    const Seconds = (restMinutes * 60) | 0;

    return {
      years: Years,
      day: Day,
      hours: Hours,
      minutes: Minutes,
      seconds: Seconds
    };
  }

  private getDateNow(): void {
    this.dateNow = Math.floor(Date.now() / 1000);
  }

  private setLanguage(language: string): void {
    if (language === "fr") {
      this.keywords = {
        seconds: "s",
        minutes: "m",
        hours: "h",
        day: "j",
        years: "a"
      };
    } else {
      this.keywords = {
        seconds: "s",
        minutes: "m",
        hours: "h",
        day: "d",
        years: "y"
      };
    }
  }
}
