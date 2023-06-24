import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isValidField( form : FormGroup,  field : string ) : boolean {
    if( form.controls[ field ] ) {
      if( !form.controls[ field].touched ) return true
      return !form.controls[ field ].errors
    }
    return  false;

  }

  public getFieldError(  form : FormGroup ,field : string ) : string | null {

    if( !form.controls[ field ] ) return null;

    const errors : ValidationErrors | null = form.controls[ field ].errors;

    if( errors ) {

      for( const key of Object.keys( errors ) ) {
        switch ( key ) {
          case 'required'  : return 'This field is required'
          case 'minlength' : return `The min length is ${errors[key].requiredLength} and the actual length is ${errors[key].actualLength}`
          case 'min'       : return `The min value is ${errors[key].min}`
        }
      }
    }
    return null

  }

  public isFieldOneEqualToFieldTwo( fieldOne : string , fieldTwo : string ) {

    return (form : AbstractControl ) : ValidationErrors | null  => {
      const firstField : string = form.get( fieldOne )?.value;
      const secondField : string = form.get( fieldTwo )?.value;

      if( firstField !== secondField ) {
        form.get( fieldTwo )?.setErrors( {
          noEqual : true
        } )
        return {
          noEqual : true
        }
      }

      return null;
    }
  }
}
