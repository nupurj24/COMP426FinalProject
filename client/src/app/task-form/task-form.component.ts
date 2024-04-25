import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .task-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="task-form"
      autocomplete="off"
      [formGroup]="taskForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        @if (name.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Priority</mat-label>
        <input
          matInput
          placeholder="Priority"
          formControlName="priority"
          required
        />
        @if (priority.invalid) {
        <mat-error>Priority must be at least 1 character long.</mat-error>
        }
      </mat-form-field>

      <mat-radio-group formControlName="level" aria-label="Select an option">
        <mat-radio-button name="level" value="low" required
          >Low</mat-radio-button
        >
        <mat-radio-button name="level" value="medium"
          >Medium</mat-radio-button
        >
        <mat-radio-button name="level" value="high"
          >High</mat-radio-button
        >
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="taskForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class TaskFormComponent {
  initialState = input<Task>();

  @Output()
  formValuesChanged = new EventEmitter<Task>();

  @Output()
  formSubmitted = new EventEmitter<Task>();

  taskForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    priority: ['', [Validators.required, Validators.minLength(1)]],
    level: ['low', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.taskForm.setValue({
        name: this.initialState()?.name || '',
        priority: this.initialState()?.priority || '',
        level: this.initialState()?.level || 'low',
      });
    });
  }

  get name() {
    return this.taskForm.get('name')!;
  }
  get priority() {
    return this.taskForm.get('priority')!;
  }
  get level() {
    return this.taskForm.get('level')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.value as Task);
  }
}