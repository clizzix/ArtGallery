import { ArtworkSchema, ArtworkResponseSchema } from '../schemas';
import { z } from 'zod';

export type Artwork = z.infer<typeof ArtworkSchema>;

export type ArtworkResponse = z.infer<typeof ArtworkResponseSchema>;
