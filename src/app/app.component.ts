import { SpinnerOverlayService } from './services/spinner-overlay.service';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  loading: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private spinner: SpinnerOverlayService
  ) {}

  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.spinner.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
