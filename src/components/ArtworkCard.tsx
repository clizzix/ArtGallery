import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import type { Artwork } from '../types';
import AddBtn from './AddBtn';
import DeleteBtn from './DeleteBtn';

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
        <div className="card w-96 h-[550px] shadow-sm glass">
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
                    className="card-title line-clamp-1"
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
                <p className="truncate">Created: {details.date_display}</p>
                <div className="card-actions justify-end mt-auto">
                    {isStored ? (
                        <DeleteBtn
                            artwork={details}
                            onDelete={() => {
                                setIsStored(false);
                                if (onDelete) onDelete();
                            }}
                        />
                    ) : (
                        <AddBtn
                            artwork={details}
                            onAdd={() => setIsStored(true)}
                        />
                    )}
                    <Link
                        to={`/gallery/${details.id}`}
                        className="btn btn-primary"
                    >
                        Show More...
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;
