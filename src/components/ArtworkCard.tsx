import type { Artwork } from '../types';

type ArtworkCardProps = {
    details: Artwork;
};

const ArtworkCard = ({ details }: ArtworkCardProps) => {
    return (
        <div className="card w-96 shadow-sm glass">
            <figure>
                {details.image_id && (
                    <img
                        src={`https://www.artic.edu/iiif/2/${details.image_id}/full/843,/0/default.jpg`}
                        alt={details.title ?? 'Artwork'}
                        className="w-full h-72 object-cover"
                    />
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title">{details.title ?? 'Untitled'}</h2>
                <h3>{details.artist_display}</h3>
                <p>{details.main_place_of_origin}</p>
                <p>Created: {details.date_display}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Show More...</button>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;
