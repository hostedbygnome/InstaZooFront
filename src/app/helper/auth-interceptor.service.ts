import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  public num: number = 0;
}
