import type { TPersonalInfo } from "~/types/users/users";
import type { FormError } from "#ui/types";
import { phoneValidator } from "~/utils/phoneValidator";

export const usePersonal = () => {

    const customValidate = (personalInfo: TPersonalInfo): FormError[] => {
        const errors: FormError[] = [];
        console.log('personalInfo.phoneNumber.length', personalInfo.phoneNumber.length)
        console.log('phoneValidator(personalInfo.phoneNumber)', phoneValidator(personalInfo.phoneNumber))
        if (personalInfo.phoneNumber.length > 0) {
            if (!phoneValidator(personalInfo.phoneNumber)) {
                console.log('ERROR')
                errors.push({
                    field: 'phoneNumber',
                    message: 'Invalid phone number'
                })
            }
        }

        return errors;
    }

    return {
        customValidate,
    }
}