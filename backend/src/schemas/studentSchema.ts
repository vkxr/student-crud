import { z } from 'zod'

// zod schema for validating student input
export const createStudentSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name must be under 100 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    age: z
        .number({ invalid_type_error: 'Age must be a number' })
        .int('Age must be a whole number')
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must be under 120'),
})

export const updateStudentSchema = createStudentSchema.partial()

export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
