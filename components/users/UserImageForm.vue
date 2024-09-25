<template>
    <UForm
        :state="profileImg"
        class="m-2"
        @submit="onSubmit"
    >
        <ShareUploadImageForm @change="handleChangeImage" class="mb-2">
            <img src="~/assets/img/level-up.svg" alt="Profile image" class="w-56"/>
        </ShareUploadImageForm>
        <UsersAction :action-type="ActionType.SIGNUP" />
    </UForm>
</template>
<script setup lang="ts">
    import { ActionType } from "~/const";
    import { useRegister } from "~/module/users";
    import { useUserSteps } from "~/module/users/steps";

    const { state } = useRegister()
    const toast = useToast()
    const { nextStep } = useUserSteps()
    const profileImg = computed(() => state.value.profileImage)
    const handleChangeImage = (image: TImage) => {
        state.value.profileImage = image
    }
    
    const onSubmit = () => {
        console.log(state.profileImage)
        if (!state.profileImage) return toast.add({title: "Please upload profile image.", color:"orange"})
        nextStep()
    }
</script>