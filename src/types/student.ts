// student types used across the app

export interface Student {
    id: number
    name: string
    email: string
    age: number
    createdAt?: string
}

export interface StudentFormData {
    name: string
    email: string
    age: number
}
