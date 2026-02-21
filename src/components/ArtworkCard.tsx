import type { Artwork } from '../types';

type ArtworkCardProps = {
    details: Artwork;
};

const ArtworkCard = ({ details }: ArtworkCardProps) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                {details.image_id && (
                    <img
                        src={`https://www.artic.edu/iiif/2/${details.image_id}/full/843,/0/default.jpg`}
                        alt={details.title ?? 'Artwork'}
                    />
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title">{details.title ?? 'Untitled'}</h2>
                <h3>{details.artist_display}</h3>
                <p>{details.main_place_of_origin}</p>
                <p>{details.date_display}</p>
                <p>Description: {details.medium_display}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Show More...</button>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;
