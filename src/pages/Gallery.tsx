import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MdArrowBack } from 'react-icons/md';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../types';

const Gallery = () => {
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

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-primary mb-4"
            >
                <MdArrowBack size={24} />
            </button>
            {artworks.length === 0 ? (
                <div className="min-h-[50vh] flex items-center justify-center text-3xl text-center opacity-50">
                    There's nothing to see here at the moment...
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                    {artworks.map((artwork) => (
                        <div key={artwork.id} className="flex flex-col gap-2">
                            <ArtworkCard details={artwork} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
