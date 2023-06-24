import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import * as customValidators from "../../../shared/validators/custom-validator";
import {ValidatorsService} from "../../../shared/services/validators.service";
import {EmailValidatorService} from "../../../shared/validators/email-validator.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor( private formBuilder : FormBuilder ,
               private validatorService : ValidatorsService,
               private emailValidator : EmailValidatorService) {}

  public myForm : FormGroup = this.formBuilder.group( {
    name     : [ '', [Validators.required, Validators.pattern( this.validatorService.firstNameAndLastnamePattern )] ],
    userName : [ '', [Validators.required, customValidators.canDoNotBeStrider ] ],
    email    : [
      '',
      [
        Validators.required,
        Validators.pattern( this.validatorService.emailPattern )
      ],
      [this.emailValidator]
    ],
    password : [ '', [Validators.required, Validators.minLength(3 ) ] ],
    confirmationPassword : [ '', Validators.required ],
  }, {
    validators : [ this.validatorService.isFieldOneEqualToFieldTwo( 'password', 'confirmationPassword' ) ]


  }  );

  public onSubmit() : void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log( this.myForm.controls )
  }

  public isValidField( field : string ) : boolean {
    return this.validatorService.isValidField( this.myForm, field );
  }

  public getFieldError( field : string ) : string | null {
    return this.validatorService.getFieldError( this.myForm, field );

  }


}
