import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getUsers(){
    return this.db.collection('Users').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('Users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  loginUser(email, password){
    return this.db.collection('Users',ref => ref.where('email', '==', email)
      .where('password', '==', password))
      .valueChanges();
  }

  registerUser(value){
    return this.db.collection('Users').add({
      firstName: value.name,
      nameToSearch: value.name.toLowerCase() + ' ' + value.surname.toLowerCase(),
      lastName: value.surname,
      idNumber: value.idNum,
      email: value.email,
      password: value.password
    });
  }
}
