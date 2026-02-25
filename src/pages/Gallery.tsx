import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { MdArrowBack } from 'react-icons/md';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../types';
import SearchInterface from '../components/SearchInterface';

const Gallery = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [artworks, setArtworks] = useState<Artwork[]>(() => {
        try {
            const stored = localStorage.getItem('gallery');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load gallery', error);
            return [];
        }
    });

    const navigate = useNavigate();

    const handleDelete = (artworkId: number) => {
        setArtworks((currentArtworks) =>
            currentArtworks.filter((art) => art.id !== artworkId),
        );
    };

    const filteredArtworks = useMemo(() => {
        if (!searchTerm.trim()) return artworks;

        const lowerTerm = searchTerm.toLowerCase();
        return artworks.filter(
            (art) =>
                art.title?.toLowerCase().includes(lowerTerm) ||
                art.artist_display?.toLowerCase().includes(lowerTerm),
        );
    }, [searchTerm, artworks]);

    return (
        <div className="p-4 flex flex-col gap-6">
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost btn-circle"
                >
                    <MdArrowBack size={24} />
                </button>

                <div className="flex-1 max-w-md">
                    <SearchInterface
                        onSearch={(term) => setSearchTerm(term)}
                        placeholder="Search your personal collection..."
                    />
                </div>
            </div>
            {artworks.length > 0 && filteredArtworks.length === 0 && (
                <div className="text-center opacity-70 italic">
                    No matches found for "{searchTerm}"
                </div>
            )}
            {artworks.length === 0 ? (
                <div className="min-h-[50vh] flex items-center justify-center text-3xl text-center opacity-50">
                    There's nothing to see here at the moment...
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                    {filteredArtworks.map((artwork) => (
                        <div key={artwork.id} className="flex flex-col gap-2">
                            <ArtworkCard
                                details={artwork}
                                onDelete={() => handleDelete(artwork.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
