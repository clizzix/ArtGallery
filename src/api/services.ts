import { ArtworkResponseSchema } from '../schemas';
import type { Artwork } from '../types';

const url = import.meta.env.VITE_API_BASE_URL;
const params =
    '?page=2&limit=12&fields=id,title,alt_titles,artist_display,date_display,main_place_of_origin,medium_display,image_id';

export const getArtworkSelection = async (): Promise<Artwork[]> => {
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
