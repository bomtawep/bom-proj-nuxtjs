import type {Profile} from "~/types/users/profile";
import {useConfig} from "~/api/config";

const initialProfileState = (): Profile => ({
    profileImage: '',
    fullName: ''
})

const profile = ref<Profile>({ ...initialProfileState() })

export const useProfile = () => {
    const { host } = useConfig();

    const resetProfile = () => {
        profile.value = { ...initialProfileState() }
    }

    const setProfileImage = (path: string) => {
        profile.value.profileImage = `${host}/${path}`
    }

    const setFullName = (fullName: string) => {
        profile.value.fullName = fullName
    }

    return {
        profile,
        resetProfile,
        setProfileImage,
        setFullName
    }
}