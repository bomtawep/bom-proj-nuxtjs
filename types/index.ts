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
    pageSize: number
    limit: number
}