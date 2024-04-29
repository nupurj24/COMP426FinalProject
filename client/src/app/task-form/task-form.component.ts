import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
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
    RouterLink
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
        <mat-label>Title</mat-label>
        <input matInput placeholder="Title" formControlName="title" required />
        @if (title.invalid) {
        <mat-error>Title must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Description</mat-label>
        <input
          matInput
          placeholder="Description"
          formControlName="description"
          required
        />
        @if (description.invalid) {
        <mat-error>Desc. must be at least 1 character long.</mat-error>
        }
      </mat-form-field>
      <div> </div>
      <p>Select Priority:</p>
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
      <br/>
      <button id="gohome" class="nav-item nav-link-edit" [routerLink]="['']" mat-raised-button
      color="gray" >Back to Task List</button >
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
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(1)]],
    level: ['low', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.taskForm.setValue({
        title: this.initialState()?.title || '',
        description: this.initialState()?.description || '',
        level: this.initialState()?.level || 'low',
      });
    });
  }

  get title() {
    return this.taskForm.get('title')!;
  }
  get description() {
    return this.taskForm.get('description')!;
  }
  get level() {
    return this.taskForm.get('level')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.value as Task);
  }
}