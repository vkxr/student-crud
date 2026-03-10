import { Router } from 'express'
import {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
} from '../controllers/studentController'

const router = Router()

// GET    /api/students       -> get all students
// POST   /api/students       -> create a student
// PUT    /api/students/:id   -> update a student
// DELETE /api/students/:id   -> delete a student

router.get('/', getAllStudents)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router
