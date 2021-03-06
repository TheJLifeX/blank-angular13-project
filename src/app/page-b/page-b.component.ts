import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DemoApiService } from '../demo-api.service';

@Component({
  selector: 'app-page-b',
  templateUrl: './page-b.component.html',
  styleUrls: ['./page-b.component.scss']
})
export class PageBComponent implements OnInit {

  loading!: boolean;
  items!: string[];

  private componentDestroyed$ = new Subject<void>();

  constructor(private demoApiService: DemoApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.demoApiService.getData('Page B').pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(items => {
      this.items = items;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
