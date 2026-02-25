import { useState, useEffect } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../types';
import { getArtworkSelection } from '../api/services';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const Home = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getArtworkSelection(page);
                setArtworks(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [page]);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
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
            <div className="flex flex-wrap gap-4 justify-center">
                {artworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} details={artwork} />
                ))}
            </div>
        </div>
    );
};

export default Home;
