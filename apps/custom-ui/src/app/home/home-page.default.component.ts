import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageService } from './home-page.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page.default',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  template: `
    <ng-container *ngIf="service.vm$ | async as vm">
      <h1>Default UI</h1>
      <div>
        <label for="name">First name: </label>
        <input id="name" type="text" [formControl]="service.formGroup.controls.firstName">
      </div>
      <div>
        <label for="name">Last name: </label>
        <input id="name" type="text" [formControl]="service.formGroup.controls.lastName">
      </div>
      <div>
        <label for="name">Full name: </label>
        <input id="name" type="text" [formControl]="service.formGroup.controls.fullName">
      </div>
      <button [disabled]="vm.saveButton.disabled" (click)="vm.saveButton.onClick()">Save button</button>
    </ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageDefaultComponent implements OnInit {

  constructor(public service: HomePageService) { }

  ngOnInit(): void {
  }

}
