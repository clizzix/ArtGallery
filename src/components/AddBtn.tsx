import { type MouseEventHandler } from 'react';
import { MdAdd } from 'react-icons/md';
import type { Artwork } from '../types';
import { toast } from 'react-toastify';

type AddBtnProps = {
    artwork: Artwork;
    onAdd?: () => void;
};

const AddBtn = ({ artwork, onAdd }: AddBtnProps) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        const storedGallery = localStorage.getItem('gallery');
        const gallery: Artwork[] = storedGallery
            ? JSON.parse(storedGallery)
            : [];
        if (!gallery.some((item) => item.id === artwork.id)) {
            localStorage.setItem(
                'gallery',
                JSON.stringify([...gallery, artwork]),
            );
            if (onAdd) onAdd();
        }
        toast.success('Successfully added to your Gallery!');
    };
    return (
        <>
            <button
                onClick={handleClick}
                className="btn btn-ghost btn-circle text-success"
            >
                <MdAdd size={24} />
            </button>
        </>
    );
};

export default AddBtn;
