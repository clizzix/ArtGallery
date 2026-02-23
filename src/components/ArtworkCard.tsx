import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import type { Artwork } from '../types';
import AddBtn from './AddBtn';
import DeleteBtn from './DeleteBtn';
import AddNoteBtn from './AddNoteBtn';

type ArtworkCardProps = {
    details: Artwork;
    onDelete?: () => void;
};

const ArtworkCard = ({ details, onDelete }: ArtworkCardProps) => {
    const [isStored, setIsStored] = useState(false);

    useEffect(() => {
        const storedGallery = localStorage.getItem('gallery');
        const gallery: Artwork[] = storedGallery
            ? JSON.parse(storedGallery)
            : [];
        setIsStored(gallery.some((item) => item.id === details.id));
    }, [details.id]);

    return (
        <div className="card w-96 h-auto glass-liquid">
            <figure className="h-72 w-full bg-base-300">
                {details.image_id ? (
                    <img
                        src={`https://www.artic.edu/iiif/2/${details.image_id}/full/843,/0/default.jpg`}
                        alt={details.title ?? 'Artwork'}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full w-full text-base-content/50">
                        No Image Available
                    </div>
                )}
            </figure>
            <div className="card-body">
                <h2
                    className="card-title line-clamp-1 text-error"
                    title={details.title ?? 'Untitled'}
                >
                    {details.title ?? 'Untitled'}
                </h2>
                <h3 className="truncate" title={details.artist_display ?? ''}>
                    {details.artist_display}
                </h3>
                <p
                    className="truncate"
                    title={details.main_place_of_origin ?? ''}
                >
                    {details.main_place_of_origin}
                </p>
                <div className="card-actions justify-end mt-auto">
                    {isStored ? (
                        <>
                            <DeleteBtn
                                artwork={details}
                                onDelete={() => {
                                    setIsStored(false);
                                    if (onDelete) onDelete();
                                }}
                            />
                            <AddNoteBtn
                                artwork={details}
                                onEdit={() => setIsStored(true)}
                            />
                        </>
                    ) : (
                        <AddBtn
                            artwork={details}
                            onAdd={() => setIsStored(true)}
                        />
                    )}

                    <Link
                        to={`/gallery/${details.id}`}
                        className="btn btn-base-300"
                    >
                        Show More...
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;
