import { useEffect, useState } from "react"

export default function SearchBar({ placeholderText, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        setSearchTerm('');

        if (searchTerm !== '') onSearch(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id={`${placeholderText.split(' ').join('')}-search`}
                placeholder={placeholderText}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                size={placeholderText.length}
            />
            <button>&#128269;</button>
        </form>
    )
}