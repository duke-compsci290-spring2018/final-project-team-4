import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }


  private key: String = "";

  setKey(k: String){
    this.key = k;
  }

  getKey(){
    return this.key;
  }
}
