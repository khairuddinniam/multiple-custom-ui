import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, map, startWith, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor() { }

  private _subscription?: Subscription;

  formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fullName: new FormControl({
      value: '',
      disabled: true
    }, [Validators.required])
  });

  vm$?: ReturnType<HomePageService['createViewModel']>;

  init() {
    this._subscription = new Subscription();

    const firstNameValue$ = this.formGroup.controls.firstName.valueChanges.pipe(
      startWith(this.formGroup.controls.firstName.value)
    );
    const lastNameValue$ = this.formGroup.controls.lastName.valueChanges.pipe(
      startWith(this.formGroup.controls.lastName.value)
    );
    this._subscription.add(
      combineLatest([
        firstNameValue$,
        lastNameValue$
      ]).subscribe(([firstName, lastName]) => {
        const fullName = this.formGroup.controls.fullName;
        const value = `${firstName} ${lastName}`.trim();
        fullName.setValue(value);
      })
    );

    this.vm$ = this.createViewModel();
  }

  reset() {
    this._subscription?.unsubscribe();
    this._subscription = undefined;
  }

  private createViewModel() {
    const state$ = {
      saveButtonDisabled: this.formGroup.statusChanges.pipe(
        startWith(this.formGroup.status),
        map((status) => status === 'INVALID')
      )
    };

    const handler = {
      saveButton: {
        onClick: () => {
          console.log('Save button clicked')
        }
      }
    };

    const vm$ = combineLatest(state$).pipe(
      map((state) => ({
        saveButton: {
          disabled: state.saveButtonDisabled,
          onClick: handler.saveButton.onClick
        }
      }))
    );
    return vm$;
  }
}
