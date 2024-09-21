export type TUser = {
    id: string
    username: string
    password: string
    email: string
}

export type TPersonalInfo = {
    firstname: string
    lastname: string
    nickname: string
    gender: string
    birthdate: Date
    phoneNumber: string
}

export type file = {
    name: string
    size: number
    type: string
    lastModified: number
}

export interface TUsers {
    user: TUser;
    message: string;
}