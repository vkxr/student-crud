import { useState, useEffect } from 'react'
import type { Student, StudentFormData } from '../types/student'

interface StudentFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: StudentFormData) => void
    editingStudent: Student | null
}

// modal form for adding/editing students
function StudentForm({ isOpen, onClose, onSubmit, editingStudent }: StudentFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})

    // pre-fill when editing
    useEffect(() => {
        if (editingStudent) {
            setName(editingStudent.name)
            setEmail(editingStudent.email)
            setAge(editingStudent.age.toString())
        } else {
            setName('')
            setEmail('')
            setAge('')
        }
        setErrors({})
    }, [editingStudent, isOpen])

    if (!isOpen) return null

    // validate before submit
    const validate = (): Record<string, string> => {
        const errs: Record<string, string> = {}
        if (!name.trim()) errs.name = 'Name is required'
        if (!email.trim()) {
            errs.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errs.email = 'Please enter a valid email'
        }
        if (!age) {
            errs.age = 'Age is required'
        } else if (isNaN(Number(age)) || Number(age) <= 0) {
            errs.age = 'Age must be a positive number'
        }
        return errs
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        onSubmit({ name: name.trim(), email: email.trim(), age: Number(age) })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {editingStudent ? '✏️ Edit Student' : '➕ Add Student'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter student name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter age"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {editingStudent ? 'Update' : 'Add Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StudentForm
