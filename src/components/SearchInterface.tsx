import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { MdSearch } from 'react-icons/md';

type SearchProps = {
    onSearch: (term: string) => void;
    placeholder?: string;
};

const SearchInterface = ({
    onSearch,
    placeholder = 'Search artworks...',
}: SearchProps) => {
    const [term, setTerm] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };

    const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="flex justify-center items-center"
            >
                <input
                    type="search"
                    className="input glass-liquid"
                    placeholder={placeholder}
                    value={term}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-ghost btn-circle"
                    aria-label="Search"
                >
                    <MdSearch size={24} />
                </button>
            </form>
        </>
    );
};

export default SearchInterface;
