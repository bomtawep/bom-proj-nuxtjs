import {ref} from "vue";
import type {TImage, TPersonalInfo, TUser} from "~/types/users/users";
import useUsersApi from "~/api/users";

interface PersonalI {
    account: TUser
    personalInfo: TPersonalInfo
    profileImage: TImage
    loading: boolean
}
const initialPersonalInfo = (): PersonalI => ({
    account: {
        InsertedID: '',
        Email: '',
        Password: ''
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
    loading: false
})

const image = ref<File | null>(null)

const steps = ref([
    '1 Create user',
    '2 Personal info',
    '3 Upload image',
    'Finish'
])

const currentStep = ref(0)
const state = ref<PersonalI>({ ...initialPersonalInfo() })
const { getUserByEmail } = useUsersApi()

export const useRegister = () => {
    const increaseStep = () => currentStep.value++
    const decreaseStep = () => currentStep.value--

    const nextStep = () => {
        currentStep.value !== steps.value.length - 1 ? increaseStep() : currentStep.value = steps.value.length - 1
    }

    const resetUser = () => {
        state.value = { ...initialPersonalInfo() }
        currentStep.value = 0
    }

    const verifyEmail = async () => {
        if (!state.value.account.Email) return
        state.value.loading = true
        try {
            const response = await getUserByEmail({
                Email: state.value.account.Email
            })
            if (!response) return
            return response
        } catch (error) {
            console.error(error)
        } finally {
            state.value.loading = false
        }
    }

    return {
        currentStep,
        nextStep,
        decreaseStep,
        state,
        steps,
        increaseStep,
        resetUser,
        image,
        verifyEmail,
    }
}