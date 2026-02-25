import { useState, useEffect } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../types';
import { getArtworkSelection, searchArtwork } from '../api/services';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import SearchInterface from '../components/SearchInterface';

const Home = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [page, setPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDefaultArtworks = async () => {
        setIsLoading(true);
        try {
            const data = await getArtworkSelection(page);
            setArtworks(data);
            setIsSearching(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isSearching) {
            fetchDefaultArtworks();
        }
    }, [page, isSearching]);

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setIsSearching(false);
            setPage(1);
            return;
        }
        setIsLoading(true);
        try {
            const results = await searchArtwork(query);
            setArtworks(results);
            setIsSearching(true);
        } catch (err) {
            console.error('Search failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <div className="w-full max-w-md">
                <SearchInterface onSearch={handleSearch} />
            </div>
            {!isSearching && (
                <div className="flex gap-4">
                    <button
                        className="btn btn-warning btn-circle shadow-md"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        <MdArrowBack size={24} />
                    </button>
                    <span className="self-center font-bold">{page}</span>
                    <button
                        className="btn btn-warning btn-circle shadow-md"
                        onClick={() => setPage((p) => p + 1)}
                    >
                        <MdArrowForward size={24} />
                    </button>
                </div>
            )}

            {isLoading && (
                <span className="loading loading-dots loading-lg"></span>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
                {!isLoading && artworks.length > 0
                    ? artworks.map((artwork) => (
                          <ArtworkCard key={artwork.id} details={artwork} />
                      ))
                    : !isLoading && (
                          <p className="text-gray-500">No artworks found.</p>
                      )}
            </div>
            {isSearching && (
                <button
                    className="btn btn-ghost btn-circle"
                    onClick={() => {
                        setIsSearching(false);
                        setPage(1);
                    }}
                >
                    <MdArrowBack size={24} />
                </button>
            )}
        </div>
    );
};

export default Home;
