import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Create a form group form
    this.form = this.fb.group({
      name: [''],
      email: [''],
      message: [''],
    });
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }
}
