import { MdEdit } from 'react-icons/md';
import { useRef, useState, useEffect } from 'react';
import type { Artwork } from '../types';
import { toast } from 'react-toastify';

type AddNoteBtnProps = {
    artwork: Artwork;
    onEdit?: () => void;
};

interface ArtworkWithNote extends Artwork {
    note?: string;
}

const AddNoteBtn = ({ artwork, onEdit }: AddNoteBtnProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [note, setNote] = useState('');

    useEffect(() => {
        const storedGallery = localStorage.getItem('gallery');
        if (storedGallery) {
            const gallery: ArtworkWithNote[] = JSON.parse(storedGallery);
            const found = gallery.find((item) => item.id === artwork.id);
            if (found?.note) {
                setNote(found.note);
                return;
            }
        }
        setNote((artwork as ArtworkWithNote).note || '');
    }, [artwork]);

    const openModal = () => {
        const storedGallery = localStorage.getItem('gallery');
        if (storedGallery) {
            const gallery: ArtworkWithNote[] = JSON.parse(storedGallery);
            const found = gallery.find((item) => item.id === artwork.id);
            if (found) {
                setNote(found.note || '');
            }
        }
        modalRef.current?.showModal();
    };

    const handleSave = () => {
        const storedGallery = localStorage.getItem('gallery');
        const gallery: ArtworkWithNote[] = storedGallery
            ? JSON.parse(storedGallery)
            : [];
        const index = gallery.findIndex((item) => item.id === artwork.id);

        if (index !== -1) {
            gallery[index] = { ...gallery[index], note };
        } else {
            gallery.push({ ...artwork, note });
        }

        localStorage.setItem('gallery', JSON.stringify(gallery));
        toast.success('Note saved successfully');
        if (onEdit) onEdit();
    };
    return (
        <>
            <button
                className="btn btn-ghost btn-circle text-warning"
                onClick={openModal}
            >
                <MdEdit size={24} />
            </button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box glass">
                    <h3 className="font-bold text-lg mb-4">
                        Add your Note here
                    </h3>
                    <textarea
                        placeholder="What are your thoughts on this piece of Art?..."
                        className="w-full textarea bg-base-200"
                        rows={10}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <div className="modal-action">
                        <form method="dialog" onSubmit={handleSave}>
                            <button className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default AddNoteBtn;
