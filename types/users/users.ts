import {date} from "yup";

export type TUser = {
    id: string
    username: string
    password: string
    email: string
}

export type TPersonalInfo = {
    firstname: string
    lastname: string
    gender: string
    birthdate: Date
    phone: string
}

export type file = {
    name: string
    size: number
    type: string
    lastModified: number
}

export type TImage = {
    id: string
    fileName: string
    fileType: string
    fileSize: number
    fileUrl: string
    file: File
}

export interface TUsers {
    user: TUser;
    message: string;
}