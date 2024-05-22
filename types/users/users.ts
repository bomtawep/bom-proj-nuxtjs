import {date} from "yup";

export type TUser = {
    InsertedID: string
    Email: string
    Password: string
}

export type TPersonalInfo = {
    Firstname: string
    Lastname: string
    Gender: string
    Birthdate: Date
    Phone: string
}

export type file = {
    name: string
    size: number
    type: string
    lastModified: number
}

export type TImage = {
    Id: string
    FileName: string
    FileType: string
    FileSize: number
    FileUrl: string
    File: File
}

export interface TUsers {
    user: TUser;
    message: string;
}