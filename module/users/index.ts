import {ref} from "vue";
import type { TPersonalInfo, TUser} from "~/types/users/users";
import useUsersApi from "~/api/users";
import { useUserSteps } from "~/module/users/steps";
import type { TImage } from "~/types";

interface PersonalI {
    account: TUser
    personalInfo: TPersonalInfo
    profileImage: TImage
    loading: boolean
    isEmail: boolean
}

const initialPersonalInfo = (): PersonalI => ({
    account: {
        id: '',
        username: '',
        password: '',
        email: '',
    },
    personalInfo: {
        firstname: '',
        lastname: '',
        nickname: '',
        gender: 'male',
        birthdate: new Date(),
        phoneNumber: ''
    },
    profileImage: {
        id: '',
        fileName: '',
        fileType: '',
        fileSize: 0,
        fileUrl: '',
        file: new File([], '')
    },
    loading: false,
    isEmail: true,
})



const image = ref<File | null>(null)

const state = ref<PersonalI>({ ...initialPersonalInfo() })

export const useRegister = () => {
    const { verifyUsernameEmail } = useUsersApi()
    const { currentStep } = useUserSteps()

    const resetUser = () => {
        state.value = { ...initialPersonalInfo() }
        currentStep.value = 0
    }

    const verify = async () => {
        if (!state.value.account.username) return
        state.value.loading = true
        const payload =
        state.value.isEmail ?
            { email: state.value.account.email }
        :
            {
                username: state.value.account.username,
                email: state.value.account.email
            }
        try {
            const response = await verifyUsernameEmail(payload)
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
        verify,
    }
}