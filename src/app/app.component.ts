import { Component, Input, OnChanges } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { from } from 'rxjs';
import { Account, Student } from './models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() account: Account;
  accountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.accountForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      studentsArray: this.fb.array([]),
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.accountForm.reset({
      firstName: this.account.firstName,
      lastName: this.account.lastName,
      email: this.account.email,
      phone: this.account.phone,
    });
    this.setStudents(this.account.students);
  }

  get studentsArray(): FormArray {
    return this.accountForm.get('studentsArray') as FormArray;
  }

  setStudents(students: Student[]) {
    const studentFGs = students.map((student) => this.fb.group(student));
    const studentFormArray = this.fb.array(studentFGs);
    this.accountForm.setControl('studentsArray', studentFormArray);
  }

  addStudent() {
    this.studentsArray.push(this.fb.group(new Student()));
  }
}
