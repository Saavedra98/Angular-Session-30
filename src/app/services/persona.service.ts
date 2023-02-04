import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';

import { collectionData, deleteDoc, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc } from 'firebase/firestore';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private firestore: Firestore) { }

  addPersona(per: Usuario) {
    const personaRef = collection(this.firestore, 'usuario');
    return addDoc(personaRef, per)
  }

  getPersona(): Observable<Usuario[]> {
    const personaRef = collection(this.firestore, 'usuario');
    return collectionData(personaRef, { idField: 'id' }) as Observable<Usuario[]>
  }

  deletedPersona(per: Usuario) {
    const personaRef = doc(this.firestore, `usuario/${per.id}`)
    return deleteDoc(personaRef);
  }

}
