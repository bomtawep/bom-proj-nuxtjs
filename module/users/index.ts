import {ref} from "vue";
import type {TImage, TPersonalInfo, TUser} from "~/types/users/users";

interface PersonalI {
    account: TUser
    personalInfo: TPersonalInfo
    profileImage: TImage
}
const initialPersonalInfo = (): PersonalI => ({
    account: {
        Id: '',
        Email: '',
        Password: ''
    },
    personalInfo: {
        Firstname: '',
        Lastname: '',
        Gender: 'male',
        Birthdate: '',
        Phone: ''
    },
    profileImage: {
        Id: '',
        FileName: '',
        FileType: '',
        FileSize: 0,
        FileUrl: '',
        File: new File([], '')
    }
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

    return {
        currentStep,
        nextStep,
        decreaseStep,
        state,
        steps,
        increaseStep,
        resetUser,
        image,
    }
}