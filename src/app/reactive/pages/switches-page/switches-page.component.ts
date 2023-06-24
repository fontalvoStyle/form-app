import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent {

  constructor( private formBuilder : FormBuilder ) {}

  public myForm : FormGroup = this.formBuilder.group({
    gender : [ 'M', Validators.required ],
    wantNotifications : [ true , Validators.required ],
    termsAndConditions : [ false , Validators.requiredTrue ]
  } );

  public onSubmit() : void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log( this.myForm.controls )
  }

  public isValidField( field : string ) : boolean {
    if( this.myForm.controls[ field ] ) {
      if( !this.myForm.controls[ field].touched ) return true
      return !this.myForm.controls[ field ].errors
    }
    return  false;

  }

  public getFieldError( field : string ) : string | null {

    if( !this.myForm.controls[ field ] ) return null;

    const errors : ValidationErrors | null = this.myForm.controls[ field ].errors;

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
}
