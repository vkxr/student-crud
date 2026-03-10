import type { Student } from '../types/student'

const API_URL = 'http://localhost:5000/api/students'
const STORAGE_KEY = 'student_crud_data'

// helper to save to localStorage as backup
function saveToLocalStorage(students: Student[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
}

// load from localStorage (fallback if API is down)
function loadFromLocalStorage(): Student[] {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

// fetch all students
export async function fetchStudents(): Promise<Student[]> {
    try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        saveToLocalStorage(data) // cache locally
        return data
    } catch (err) {
        console.warn('API unavailable, loading from localStorage', err)
        return loadFromLocalStorage()
    }
}

// add a new student
export async function addStudent(student: Omit<Student, 'id'>): Promise<Student> {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
        })
        if (!res.ok) throw new Error('API error')
        return await res.json()
    } catch (err) {
        console.warn('API unavailable, saving locally', err)
        // fallback: create locally with fake id
        const local = loadFromLocalStorage()
        const newStudent: Student = { ...student, id: Date.now() }
        local.push(newStudent)
        saveToLocalStorage(local)
        return newStudent
    }
}

// update an existing student
export async function updateStudent(id: number, student: Omit<Student, 'id'>): Promise<Student> {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
        })
        if (!res.ok) throw new Error('API error')
        return await res.json()
    } catch (err) {
        console.warn('API unavailable, updating locally', err)
        const local = loadFromLocalStorage()
        const updated = local.map((s) => (s.id === id ? { ...s, ...student } : s))
        saveToLocalStorage(updated)
        return { id, ...student }
    }
}

// delete a student
export async function deleteStudent(id: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('API error')
    } catch (err) {
        console.warn('API unavailable, deleting locally', err)
        const local = loadFromLocalStorage()
        saveToLocalStorage(local.filter((s) => s.id !== id))
    }
}
