import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getArtworkById } from '../api/services';
import type { Artwork } from '../types';
import { MdArrowBack } from 'react-icons/md';
import AddNoteBtn from '../components/AddNoteBtn';
import DeleteBtn from '../components/DeleteBtn';

interface ArtworkWithNote extends Artwork {
    note?: string;
}

const ArtworkDetails = () => {
    const { detail } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState<ArtworkWithNote | null>(null);

    const loadArtwork = async () => {
        if (detail) {
            try {
                const apiData = await getArtworkById(detail);
                const storedGallery = localStorage.getItem('gallery');
                let finalArtwork: ArtworkWithNote = apiData;

                if (storedGallery) {
                    const gallery: ArtworkWithNote[] =
                        JSON.parse(storedGallery);
                    const storedArtwork = gallery.find(
                        (item) => item.id === apiData.id,
                    );
                    if (storedArtwork) {
                        finalArtwork = { ...apiData, ...storedArtwork };
                    }
                }
                setArtwork(finalArtwork);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        loadArtwork();
    }, [detail]);

    if (!artwork) return <div className="p-10 text-center">Loading...</div>;

    return (
        <>
            <div className="hero glass-liquid min-h-screen items-start max-w-7xl mx-auto rounded-md shadow-md m-8 relative">
                <div className="hero-content flex-col gap-8">
                    <button
                        className="btn btn-circle btn-ghost place-self-start"
                        onClick={() => navigate(-1)}
                    >
                        <MdArrowBack size={24} />
                    </button>
                    {artwork.image_id && (
                        <img
                            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                            className="max-w-full rounded-lg shadow-2xl"
                            alt={artwork.title ?? 'Artwork'}
                        />
                    )}
                    <div className="flex flex-col gap-4 w-full bg-base-300 p-8 rounded-md shadow-sm border border-black">
                        <h1 className="text-[clamp(1.5rem,5vw,3rem)] leading-tight font-bold text-error">
                            {artwork.title}
                        </h1>
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
                                <h3 className="font-bold text-xl">Origin:</h3>
                                <p>{artwork.main_place_of_origin}</p>
                            </div>
                        ) : (
                            ''
                        )}{' '}
                        {artwork.note ? <div>{artwork.note}</div> : ''}
                    </div>
                    <div className="flex gap-2 self-end justify-self-end mb-4">
                        <AddNoteBtn artwork={artwork} onEdit={loadArtwork} />
                        <DeleteBtn
                            artwork={artwork}
                            onDelete={() => navigate(-1)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArtworkDetails;
