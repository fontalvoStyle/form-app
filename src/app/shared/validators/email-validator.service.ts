import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor() {}

  validate(control: AbstractControl<string>):Observable<ValidationErrors | null> {
    const value = control.value;

    return  new Observable<ValidationErrors | null>( subscriber => {
                  if( value === 'fontalvo@gmail.com' ) {
                    subscriber.next({
                      emailTaken : true
                    });
                    subscriber.complete();
                  }
                  subscriber.next( null );
                  subscriber.complete();
                } ).pipe( delay( 3000 ) );


  }

  /*private emailPatter : RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  validate( control: AbstractControl<string>): Observable<ValidationErrors | null >  {

    const value : string = control.value

    if( !this.emailPatter.test( value ) ) {
      return of( {
        emailError : true
      } ).pipe(
        delay( 2000 )
      )
    }
    return of( null )
  }*/
}
