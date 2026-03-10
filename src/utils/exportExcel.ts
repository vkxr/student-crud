import * as XLSX from 'xlsx'
import type { Student } from '../types/student'

// exports students to a proper .xlsx file
export function exportToExcel(students: Student[], filename: string = 'students'): void {
    const data = students.map((s) => ({
        Name: s.name,
        Email: s.email,
        Age: s.age,
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students')

    // write as array buffer and create a blob with correct MIME type
    // this ensures Excel can actually open the file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    // trigger download via hidden link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
