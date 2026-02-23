import { z } from 'zod';

export const ArtworkSchema = z.object({
    id: z.number().int(),
    title: z.string().nullish(),
    alt_titles: z.array(z.string()).nullish(),
    artist_display: z.string().nullish(),
    date_display: z.string().nullish(),
    main_place_of_origin: z.string().nullish(),
    medium_display: z.string().nullish(),
    image_id: z.string().nullish(),
});

export const ArtworkResponseSchema = z.object({
    data: z.array(ArtworkSchema),
});

export const SingleArtworkResponseSchema = z.object({
    data: ArtworkSchema,
});

export const ArtworkNoteSchema = z.object({
    data: ArtworkSchema,
    note: z.string().nullish(),
});
