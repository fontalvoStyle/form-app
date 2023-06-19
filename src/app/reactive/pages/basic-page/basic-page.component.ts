import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent {
constructor( private fomBuilder : FormBuilder ) {}

  public myForm : FormGroup = this.fomBuilder.group( {
    name : [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    price : [ 0 , [ Validators.required, Validators.min( 0 ) ] ],
    inStorage : [ 0, [ Validators.required, Validators.min( 0 )] ]
  } )

  public isValidField( field : string ) : boolean {
    if( this.myForm.controls[ field ] ) {
      if( !this.myForm.controls[ field].touched ) return true
      return !this.myForm.controls[ field ].errors
    }
    return  false;

  }

  public getFieldError( field : string ) : string | null {
    if( !this.myForm.controls[ 'name' ] ) return null;

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

  public onSave( ) : void {
    if( this.myForm.invalid ) {
      return;
    }
    console.log( this.myForm.value );
    this.myForm.reset();
  }
}
