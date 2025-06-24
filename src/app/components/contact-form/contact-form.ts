import { Component, input, OnInit, output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { IContact } from '../../services/contact';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class contactForm implements OnInit {

  contactSubmitted = output<IContact>()
  contactToEdit = input<IContact | null>(null)
  contactForm!: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.contactToEdit()) {
      this.contactForm.patchValue(this.contactToEdit()!)
    }
  }

  handleSubmit() {
    if (this.contactForm.valid) {
      const contact: IContact = {
        id: this.contactToEdit() ? this.contactToEdit()?.id : 0,
        ...this.contactForm.value
      }
      this.contactSubmitted.emit(contact)
      this.contactForm.reset()
    }
  }

}
