import { useState } from "react"

export default function SearchBar({ placeholderText, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        setSearchTerm('');

        onSearch(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={placeholderText}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button>&#128269;</button>
        </form>
    )
}