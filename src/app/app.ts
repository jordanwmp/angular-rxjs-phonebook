import { Component, OnInit } from '@angular/core';
import { Contact, IContact } from './services/contact';
import { SearchBar } from './components/search-bar/search-bar';
import { ContactList } from './components/contact-list/contact-list';
import { contactForm } from './components/contact-form/contact-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, contactForm, ContactList, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'Phonebook';

  contacts: IContact[] = []
  filteredContacts: IContact[] = []
  showForm: boolean = false
  contactToEdit: IContact | null = null

  constructor(private contactService: Contact){}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe((contacts)=>{
      this.contacts = contacts
      this.filteredContacts = contacts
    })
  }

  handleSearch(search:string){
    this.filteredContacts = this.contacts.filter(contact => contact.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  }

  toggleForm()
  {
    this.showForm = !this.showForm
    if(!this.showForm) this.contactToEdit = null
  }

  handleContactSubmitted(contact: IContact)
  {
    if(this.contactToEdit){
      this.contactService.updateContact(contact)
    }else{
      this.contactService.addContact(contact)
    }
    this.toggleForm()
  }

  handleEdit(contact:IContact)
  {
    this.contactToEdit = contact
    this.showForm = true
  }

  handleDelete(contactId: number){
    this.contactService.deleteContact(contactId)
  }
}
