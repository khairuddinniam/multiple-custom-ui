import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  providers: [HomePageService],
  template: `
    <ng-container *ngComponentOutlet="contentType"></ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private service: HomePageService) { }

  contentType = environment.uiComponents.homePage;

  ngOnInit(): void {
    this.service.init();
  }

  ngOnDestroy(): void {
    this.service.reset();
  }
}
