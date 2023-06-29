import {
    Component,
    inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ElementRef,
  } from '@angular/core';
  
  import { ScoreServer } from './data-access/server.service';
  import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
  import { SubscriptionHandler } from './helpers/subcription-handler';
  
  type serverData = [string, number];
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
  })
  export class AppComponent implements OnDestroy, OnInit {
    scoreService = inject(ScoreServer);
    countriesScore!: serverData[];
    sub = new SubscriptionHandler();
    @ViewChild('country1', { static: true })
    country!: ElementRef<HTMLInputElement>;
    countryAverage?: number;
  
    ngAfterViewInit(): void {}
  
    ngOnInit(): void {
      this.sub.add = this.scoreService.getScores().subscribe((res: any) => {
        this.countriesScore = res;
        console.log(res);
      });
  
      this.sub.add = fromEvent(this.country.nativeElement, 'keyup')
        .pipe(
          map((event: any) => event.target.value),
          debounceTime(2000),
          distinctUntilChanged()
        )
        .subscribe((e) => this.getCountryAverage(e));
    }
  
    ngOnDestroy(): void {
      this.sub.removeAll();
    }
  
    getCountryAverage(countryName: string) {
      let country = this.countriesScore.filter(
        (score: serverData) =>
          score[0].toLowerCase() === countryName.toLowerCase()
      );
      const scoreNumbers = country.map((data) => data[1]);
      const average = this.calculateAverage(scoreNumbers);
      this.countryAverage = average;
    }
  
    calculateAverage(numbers: number[]) {
      let sum = 0;
      numbers.forEach((number) => (sum += number));
      let average = sum / numbers.length;
      return average;
    }
  
    countryAveregePercent = () => `${this.countryAverage}%`;

  }
  