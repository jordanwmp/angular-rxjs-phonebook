import { Component, input, output } from '@angular/core';
import { IContact } from '../../services/contact';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, NgxMaskPipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss'
})
export class ContactList {

  contacts = input<IContact[]>([])
  editContact = output<IContact>()
  deleteContact = output<number>()

  handleEdit(contact: IContact){
    this.editContact.emit(contact)
  }

  handleDelete(id:number){
    this.deleteContact.emit(id)
  }

}
