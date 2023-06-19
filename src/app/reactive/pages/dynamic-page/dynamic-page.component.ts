import { Component } from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {

  constructor( private formBuilder : FormBuilder) {}

  public myForm : FormGroup = this.formBuilder.group( {
    name : [ '', [ Validators.required ] ],
    favoriteGames : this.formBuilder.array( [
      [ 'metal Gear', [ Validators.required, Validators.minLength( 2 ) ] ],
      [ 'Death Stranding', [ Validators.required, Validators.minLength( 2 ) ] ]
    ] )
  } );

  public newFavoriteGame : FormControl = new FormControl( '', [Validators.required])

  public onSubmit() : void {
    ( this.myForm.controls['favoriteGames'] as FormArray ) = this.formBuilder.array([] );
  }

  public get favoritesGames( ) : FormArray {
    return this.myForm.controls[ 'favoriteGames' ] as FormArray
  }

  public deleteFavoriteGame( index : number ) : void {
    this.favoritesGames.removeAt( index );
  }

  public addFavoriteGame( ) : void {
    if( this.newFavoriteGame.invalid ) return;
    const value : string = this.newFavoriteGame.value;
    ( this.myForm.controls['favoriteGames']  as FormArray ).push(
      this.formBuilder.control( value , [ Validators.required ] )
    );

    this.newFavoriteGame.reset();
  }

  public isValidField( field : string ) : boolean {
    if( this.myForm.controls[ field ] ) {
      if( !this.myForm.controls[ field].touched ) return true
      return !this.myForm.controls[ field ].errors
    }
    return  false;

  }

  public isValidFieldInArray( formArray : FormArray, index : number ) : boolean {
    return ( formArray.controls[ index] && (!formArray.controls[ index ].errors || !formArray.touched) )
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
