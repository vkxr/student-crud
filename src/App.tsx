import { useState, useEffect } from 'react'
import StudentTable from './components/StudentTable'
import StudentForm from './components/StudentForm'
import ConfirmDialog from './components/ConfirmDialog'
import SearchBar from './components/SearchBar'
import { exportToExcel } from './utils/exportExcel'
import initialData from './data/students.json'
import type { Student, StudentFormData } from './types/student'

const STORAGE_KEY = 'students_data'

// load students from localStorage, or use initial JSON data
function loadStudents(): Student[] {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
        return JSON.parse(saved)
    }
    return initialData as Student[]
}

// save students to localStorage
function saveStudents(students: Student[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
}

function App() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    // modal state
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingStudent, setEditingStudent] = useState<Student | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Student | null>(null)

    // load students on mount with simulated delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setStudents(loadStudents())
            setLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    // persist to localStorage whenever students change
    useEffect(() => {
        if (!loading) {
            saveStudents(students)
        }
    }, [students, loading])

    // filter by name or email
    const filteredStudents = students.filter((s) => {
        const q = searchQuery.toLowerCase()
        return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    })

    // -- CRUD handlers --

    const handleAdd = (data: StudentFormData) => {
        const newStudent: Student = {
            ...data,
            id: Date.now(),
            createdAt: new Date().toISOString(),
        }
        setStudents((prev) => [...prev, newStudent])
        setIsFormOpen(false)
    }

    const handleUpdate = (data: StudentFormData) => {
        if (!editingStudent) return
        setStudents((prev) =>
            prev.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s))
        )
        setEditingStudent(null)
        setIsFormOpen(false)
    }

    const handleDelete = () => {
        if (!deleteTarget) return
        setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id))
        setDeleteTarget(null)
    }

    const openAddForm = () => {
        setEditingStudent(null)
        setIsFormOpen(true)
    }

    const openEditForm = (student: Student) => {
        setEditingStudent(student)
        setIsFormOpen(true)
    }

    // loading screen
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading students...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">🎓 Student Manager</h1>
                    <p className="text-gray-500 mt-1">Manage your students easily</p>
                </div>

                {/* Top bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <div className="flex gap-2 flex-shrink-0">
                        <button
                            onClick={openAddForm}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                            + Add Student
                        </button>
                        <button
                            onClick={() => exportToExcel(students, 'students')}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                            📥 Export All
                        </button>
                        {searchQuery && (
                            <button
                                onClick={() => exportToExcel(filteredStudents, 'filtered_students')}
                                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors whitespace-nowrap"
                            >
                                📥 Export Filtered
                            </button>
                        )}
                    </div>
                </div>

                {/* Count */}
                <p className="text-sm text-gray-500 mb-3">
                    Showing {filteredStudents.length} of {students.length} students
                </p>

                {/* Table */}
                <StudentTable
                    students={filteredStudents}
                    onEdit={openEditForm}
                    onDelete={(student) => setDeleteTarget(student)}
                />

                {/* Add/Edit Modal */}
                <StudentForm
                    isOpen={isFormOpen}
                    onClose={() => {
                        setIsFormOpen(false)
                        setEditingStudent(null)
                    }}
                    onSubmit={editingStudent ? handleUpdate : handleAdd}
                    editingStudent={editingStudent}
                />

                {/* Delete Confirmation */}
                {deleteTarget && (
                    <ConfirmDialog
                        message={`Are you sure you want to delete ${deleteTarget.name}?`}
                        onConfirm={handleDelete}
                        onCancel={() => setDeleteTarget(null)}
                    />
                )}
            </div>
        </div>
    )
}

export default App
