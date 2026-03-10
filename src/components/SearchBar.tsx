interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

// search bar for filtering students
function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    )
}

export default SearchBar
