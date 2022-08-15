import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private tokenService: TokenStorageService) {}
}
