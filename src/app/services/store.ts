import { Injectable } from '@angular/core';
import { IContact } from './contact';

export enum STORE_KEY{
  store = 'contacts'
} 

@Injectable({
  providedIn: 'root'
})
export class Store {

  get():IContact[]| null
  {
    const data = localStorage.getItem(STORE_KEY.store)
    return data ? JSON.parse(data) : null
  }

  set(contacts:IContact[]){
    localStorage.setItem(STORE_KEY.store, JSON.stringify(contacts))
  }
 

}
