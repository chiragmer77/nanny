import { FormGroup } from "@angular/forms";

export class PasswordValidator {
    public static validateTwoPassword(fromControlName: string, toControlName: string) {
        return (formGroup: FormGroup) => {
            const password = formGroup.controls[fromControlName];
            const repeatPassword = formGroup.controls[toControlName];
            const passwordValue = password?.value;
            const repeatPasswordValue = repeatPassword?.value;

            if (repeatPasswordValue <= 0) {
                return null;
            }
            if (passwordValue.length === 0) {
                return null;
            }
            if (repeatPasswordValue !== passwordValue) {
                repeatPassword.setErrors({ 'incorrect': true });
                return {
                    doesMatchPassword: true
                };
            }
            return null;
        };
    }

}
