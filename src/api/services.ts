import { ArtworkResponseSchema, SingleArtworkResponseSchema } from '../schemas';
import type { Artwork } from '../types';

const url = import.meta.env.VITE_API_BASE_URL;

export const getArtworkSelection = async (
    page = 1,
    limit = 12,
): Promise<Artwork[]> => {
    try {
        if (!url) throw new Error('API URL is missing');
        const params = `?page=${page}&limit=${limit}&fields=id,title,alt_titles,artist_display,date_display,main_place_of_origin,medium_display,image_id`;
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

export const getArtworkById = async (id: string | number): Promise<Artwork> => {
    try {
        if (!url) throw new Error('API URL is missing');
        const params = `/${id}?fields=id,title,alt_titles,artist_display,date_display,main_place_of_origin,medium_display,image_id`;
        const res = await fetch(`${url}${params}`);
        if (!res.ok) {
            throw new Error(`Something went wrong! ${res.statusText}`);
        }
        const resData = await res.json();
        const { data, error, success } =
            SingleArtworkResponseSchema.safeParse(resData);
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
