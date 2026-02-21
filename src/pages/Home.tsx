import { useState, useEffect } from 'react';
import { getArtworkSelection } from '../api/services';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../types';

const Home = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getArtworkSelection();
                setArtworks(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-wrap gap-4 justify-center p-4">
            {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} details={artwork} />
            ))}
        </div>
    );
};

export default Home;
