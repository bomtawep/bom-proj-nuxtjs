import {ref} from "vue";
import type {TImage, TPersonalInfo, TUser} from "~/types/users/users";
import useUsersApi from "~/api/users";
import { useUserSteps } from "~/module/users/steps";

interface PersonalI {
    account: TUser
    personalInfo: TPersonalInfo
    profileImage: TImage
    loading: boolean
    isEmail: boolean
}

const initialPersonalInfo = (): PersonalI => ({
    account: {
        InsertedID: '',
        Username: '',
        Password: '',
        Email: '',
    },
    personalInfo: {
        Firstname: '',
        Lastname: '',
        Gender: 'male',
        Birthdate: new Date(),
        Phone: ''
    },
    profileImage: {
        Id: '',
        FileName: '',
        FileType: '',
        FileSize: 0,
        FileUrl: '',
        File: new File([], '')
    },
    loading: false,
    isEmail: false
})



const image = ref<File | null>(null)

const state = ref<PersonalI>({ ...initialPersonalInfo() })

export const useRegister = () => {
    const { getUserByEmail } = useUsersApi()
    const { currentStep } = useUserSteps()

    const resetUser = () => {
        state.value = { ...initialPersonalInfo() }
        currentStep.value = 0
    }

    const verifyEmail = async () => {
        if (!state.value.account.Username) return
        state.value.loading = true
        try {
            const response = await getUserByEmail({
                username: state.value.account.Username
            })
            if (!response) return
            return response
        } catch (error) {
            return error
        } finally {
            state.value.loading = false
        }
    }

    return {
        state,
        resetUser,
        image,
        verifyEmail,
    }
}