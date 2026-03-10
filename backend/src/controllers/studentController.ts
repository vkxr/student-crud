import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { createStudentSchema } from '../schemas/studentSchema'

const prisma = new PrismaClient()

// GET /api/students
export const getAllStudents = async (_req: Request, res: Response) => {
    try {
        const students = await prisma.student.findMany({
            orderBy: { createdAt: 'desc' },
        })
        res.json(students)
    } catch (error) {
        console.error('Error fetching students:', error)
        res.status(500).json({ error: 'Failed to fetch students' })
    }
}

// POST /api/students
export const createStudent = async (req: Request, res: Response) => {
    try {
        // validate with zod
        const parsed = createStudentSchema.safeParse(req.body)
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message })
            return
        }

        const { name, email, age } = parsed.data
        const student = await prisma.student.create({
            data: { name, email, age },
        })
        res.status(201).json(student)
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Email already exists' })
            return
        }
        console.error('Error creating student:', error)
        res.status(500).json({ error: 'Failed to create student' })
    }
}

// PUT /api/students/:id
export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // validate with zod
        const parsed = createStudentSchema.safeParse(req.body)
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message })
            return
        }

        const { name, email, age } = parsed.data
        const student = await prisma.student.update({
            where: { id: Number(id) },
            data: { name, email, age },
        })
        res.json(student)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Student not found' })
            return
        }
        console.error('Error updating student:', error)
        res.status(500).json({ error: 'Failed to update student' })
    }
}

// DELETE /api/students/:id
export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.student.delete({
            where: { id: Number(id) },
        })
        res.json({ message: 'Student deleted successfully' })
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Student not found' })
            return
        }
        console.error('Error deleting student:', error)
        res.status(500).json({ error: 'Failed to delete student' })
    }
}
