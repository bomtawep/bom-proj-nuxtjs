import {ref} from "vue";

const currentStep = ref(0)
const steps = ref([
    '1 Create user',
    '2 Personal info',
    '3 Upload image',
    'Finish'
])

export const useUserSteps = () => {
    const increaseStep = () => currentStep.value++
    const decreaseStep = () => currentStep.value--
    const nextStep = () => {
        currentStep.value !== steps.value.length - 1 ? increaseStep() : currentStep.value = steps.value.length - 1
    }
    const resetStep = () => currentStep.value = 0

    return {
        currentStep,
        nextStep,
        increaseStep,
        decreaseStep,
        steps,
        resetStep,
    }
}