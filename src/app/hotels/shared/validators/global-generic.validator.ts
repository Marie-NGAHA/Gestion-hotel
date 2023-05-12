import { FormGroup } from "@angular/forms";



export class GlobalGenericValidator {
    constructor(

        private validatorMessage: { [key: string]: {[key: string]: string} }
    ){}


    public createErrorMessage (container: FormGroup, isFormSubmitted?: boolean): {[key: string]: string} {
        const errorMessage: any = {};

        for(const controlName in container.controls) {
            if (container.controls.hasOwnProperty(controlName)){

                const selectedControl = container .controls[controlName];
                if(this.validatorMessage[controlName]) {


                    errorMessage [controlName] =  '';

                    if((selectedControl.dirty || selectedControl.touched || isFormSubmitted) && selectedControl.errors){
                        Object.keys(selectedControl.errors).map((errorMessagekey: string) =>{
                            if(this.validatorMessage[controlName][errorMessagekey]){
                                errorMessage[controlName] += this.validatorMessage[controlName][errorMessagekey] + '';
                            }
                        })
                    }

                }

            }

        }
        
        return errorMessage;
    }
}