import { type MouseEventHandler } from 'react';
import { MdDelete } from 'react-icons/md';
import type { Artwork } from '../types';
import { toast } from 'react-toastify';

type DeleteBtnProps = {
    artwork: Artwork;
    onDelete?: () => void;
};

const DeleteBtn = ({ artwork, onDelete }: DeleteBtnProps) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        const storedGallery = localStorage.getItem('gallery');
        const gallery: Artwork[] = storedGallery
            ? JSON.parse(storedGallery)
            : [];
        const updatedGallery = gallery.filter((item) => item.id !== artwork.id);
        localStorage.setItem('gallery', JSON.stringify(updatedGallery));
        toast.error('Artwork deleted successfully');
        if (onDelete) onDelete();
    };
    return (
        <button onClick={handleClick} className="btn btn-error text-white">
            <MdDelete size={24} />
        </button>
    );
};

export default DeleteBtn;
