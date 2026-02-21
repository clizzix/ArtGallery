import { useState, useEffect } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import type { Artwork } from '../types';
import { ArtworkResponseSchema } from '../schemas';

const url = import.meta.env.VITE_API_BASE_URL;
const params =
    '?page=2&limit=12&fields=id,title,alt_titles,artist_display,date_display,main_place_of_origin,medium_display,image_id';

const getArtworkSelection = async (): Promise<Artwork[]> => {
    try {
        if (!url) throw new Error('API URL is missing');
        const res = await fetch(`${url}${params}`);
        if (!res.ok) {
            throw new Error(`Something went wrong! ${res.statusText}`);
        }
        const resData = await res.json();
        const { data, error, success } =
            ArtworkResponseSchema.safeParse(resData);
        if (!success) {
            console.error(error.format());
            throw new Error('Failed to parse artwork data');
        }
        return data.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

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
