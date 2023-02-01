import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ValidatorService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  password!: string;
  passwordStatus!: string;

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private validationService: ValidatorService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.form
      .get('password')?.valueChanges
      .pipe(debounceTime(250), takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        this.password = val;
        this.passwordStatus = this.validationService.changePasswordStatus(
          this.password
        );
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value.password);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
