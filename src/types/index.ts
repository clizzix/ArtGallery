import { ArtworkNoteSchema, ArtworkSchema } from '../schemas';
import { z } from 'zod';

export type Artwork = z.infer<typeof ArtworkSchema>;

export type Note = z.infer<typeof ArtworkNoteSchema>;
