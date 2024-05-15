export type TUser = {
    Id: string
    Email: string
    Password: string
}

export type TPersonalInfo = {
    Firstname: string
    Lastname: string
    Gender: string
    Birthdate: string
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
    user: TUser[];
}