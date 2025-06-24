import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from './store';

export interface IContact {
  id?: number,
  name: string,
  phone: string
}

@Injectable({
  providedIn: 'root'
})
export class Contact {

  private contactsSubject = new BehaviorSubject<IContact[]>([])
  contacts$ = this.contactsSubject.asObservable()

  private contacts: IContact[] = []
  
  constructor(private store: Store)
  {
    const stored = this.store.get()
    this.contacts = stored || []
    this.contactsSubject.next(this.contacts)
  }

  private updateStore()
  {
    this.store.set(this.contacts)
  }


  addContact(contact: IContact) {
    const newContact:IContact = {...contact, id: Date.now() }
    this.contacts.push(newContact)
    this.contactsSubject.next(this.contacts)
    this.updateStore()
  }

  updateContact(updatedContact:IContact){
      this.contacts = this.contacts.map(contact => contact.id === updatedContact?.id ? updatedContact : contact);
      this.contactsSubject.next(this.contacts)
      this.updateStore()
  }

  deleteContact(contactId:number){
    this.contacts = this.contacts.filter(contact => contact.id !== contactId)
    this.contactsSubject.next(this.contacts)
    this.updateStore()
  } 

}
