// shared student type for the backend
export interface Student {
    id: number
    name: string
    email: string
    age: number
    createdAt?: Date
}

export interface CreateStudentInput {
    name: string
    email: string
    age: number
}
