import {type InferType, object, string} from "yup";
import {type TUser} from "~/types/users/users";
import {type FormError} from "#ui/types";

const schema = object({
    Username: string().min(6),
    Email: string(),
    Password: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
        .matches(/[A-Z]/, 'At least one uppercase letter')
        .matches(/[a-z]/, 'At least one lowercase letter')
        .matches(/[0-9]/, 'At least one number')
        .matches(/[^A-Za-z0-9]/, 'At least one special character')
})

export type Schema = InferType<typeof schema>

export const useSignin = () => {

    const checkIsEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const customValidate = (account: TUser): FormError[] => {
        const errors: FormError[] = [];

        if (!checkIsEmail(account.Username)) {
            account.Email = account.Username
        } else {
            account.Email = ''
        }

        return errors;
    };

    return {
        customValidate,
        schema,
    }
}