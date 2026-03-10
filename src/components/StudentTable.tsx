import type { Student } from '../types/student'

interface StudentTableProps {
    students: Student[]
    onEdit: (student: Student) => void
    onDelete: (student: Student) => void
}

// renders the students in a table
function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
    if (students.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No students found 😕</p>
                <p className="text-sm mt-1">Try adding a new student or adjusting your search.</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Age</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr
                            key={student.id}
                            className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                        >
                            <td className="px-6 py-3 text-sm text-gray-600">{index + 1}</td>
                            <td className="px-6 py-3 text-sm text-gray-800 font-medium">{student.name}</td>
                            <td className="px-6 py-3 text-sm text-gray-600">{student.email}</td>
                            <td className="px-6 py-3 text-sm text-gray-600">{student.age}</td>
                            <td className="px-6 py-3 text-center space-x-3">
                                <button
                                    onClick={() => onEdit(student)}
                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(student)}
                                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentTable
