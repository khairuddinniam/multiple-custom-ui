import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageService } from './home-page.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page.bmw',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  template: `
    <ng-container *ngIf="service.vm$ | async as vm">
      <h1>BMW UI</h1>
      <button [disabled]="vm.saveButton.disabled" (click)="vm.saveButton.onClick()">Save button</button>
      <div>
        <label for="name">Full name: </label>
        <input id="name" type="text" [formControl]="service.formGroup.controls.fullName">
      </div>
      <p>Please fill form below</p>
      <div class="row">
        <div class="column">
          <label for="name">First name: </label>
          <input id="name" type="text" [formControl]="service.formGroup.controls.firstName">
        </div>
        <div class="column">
          <label for="name">Last name: </label>
          <input id="name" type="text" [formControl]="service.formGroup.controls.lastName">
        </div>
      </div>
    </ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageBmwComponent implements OnInit {

  constructor(public service: HomePageService) { }

  ngOnInit(): void {
  }

}
