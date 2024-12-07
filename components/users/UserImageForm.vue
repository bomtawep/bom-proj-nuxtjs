<template>
    <UForm
        :state="profileImg"
        class="m-2"
        @submit="onSubmit"
    >
        <ShareUploadFile :modal-value="profileImg" @change="handleChangeImage" class="mb-2">
            <img src="~/assets/img/level-up.svg" alt="Profile image" class="w-56"/>
        </ShareUploadFile>
        <UsersAction :action-type="ActionType.SIGNUP" />
    </UForm>
</template>
<script setup lang="ts">
    import { ActionType } from "~/const";
    import { useRegister } from "~/module/users";
    import { useUserSteps } from "~/module/users/steps";
    import type { TFile } from "~/types";

    const { state } = useRegister()
    const toast = useToast()
    const { nextStep } = useUserSteps()
    const profileImg = computed(() => state.value.profileImage)
    const handleChangeImage = (image: TFile) => {
      state.value.profileImage = image
    }
    
    const onSubmit = () => {
        if (!state.value.profileImage) return toast.add({title: "Please upload profile image.", color:"orange"})
        nextStep()
    }
</script>