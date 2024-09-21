import { useRegister } from "~/module/users/index";
import { useUserSteps } from "~/module/users/steps";

export const useUploadImage = () => {

    const { state } = useRegister()
    const { nextStep } = useUserSteps()
    const personalInfo = computed(() => state.value.personalInfo)
    const profileImage = computed(() => state.value.profileImage)
    const toast = useToast()

    async function onSubmit () {
        if (!state.value.profileImage.fileName) return toast.add({ title: 'Please select a image profile', color: 'orange' })
        nextStep()
    }

    return {
        personalInfo,
        profileImage,
        onSubmit,
    }
}
