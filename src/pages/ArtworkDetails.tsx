import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getArtworkById } from '../api/services';
import type { Artwork } from '../types';
import { MdArrowBack } from 'react-icons/md';

const ArtworkDetails = () => {
    const { detail } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState<Artwork | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (detail) {
                try {
                    const data = await getArtworkById(detail);
                    setArtwork(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchDetail();
    }, [detail]);

    if (!artwork) return <div className="p-10 text-center">Loading...</div>;

    return (
        <>
            <button
                className="btn btn-primary mx-8 mt-4"
                onClick={() => navigate(-1)}
            >
                <MdArrowBack size={24} />
            </button>
            <div className="hero glass min-h-screen max-w-7xl mx-auto rounded-md shadow-md m-8">
                <div className="hero-content flex-col lg:flex-row gap-8">
                    {artwork.image_id && (
                        <img
                            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                            className="max-w-md rounded-lg shadow-2xl"
                            alt={artwork.title ?? 'Artwork'}
                        />
                    )}
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="text-5xl font-bold">{artwork.title}</h1>
                        <div>
                            <h3 className="font-bold text-xl">Artist(s)</h3>
                            <p>{artwork.artist_display}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">Timeline</h3>
                            <p>{artwork.date_display}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">Media</h3>
                            <p className="italic">{artwork.medium_display}</p>
                        </div>
                        {artwork.main_place_of_origin ? (
                            <div>
                                <h3>Origin:</h3>
                                <p>{artwork.main_place_of_origin}</p>
                            </div>
                        ) : (
                            ''
                        )}{' '}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArtworkDetails;
