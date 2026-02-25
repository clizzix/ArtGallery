import {
    ArtworkNoteSchema,
    ArtworkSchema,
    ArtworkResponseSchema,
} from '../schemas';
import { z } from 'zod';

export type Artwork = z.infer<typeof ArtworkSchema>;

export type ArtworkResponse = z.infer<typeof ArtworkResponseSchema>;

export type ArtworkWithNote = z.infer<typeof ArtworkNoteSchema>;
