export type TFile = {
    id: string
    fileName: string
    fileType: string
    fileSize: number
    fileUrl: string
    file: File
}

export type TPagination = {
    page: number
    total: number
    limit: number
}

export type IQuery = {
    q: string
}