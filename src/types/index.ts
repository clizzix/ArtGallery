import { ArtworkSchema } from '../schemas';
import { z } from 'zod';

export type Artwork = z.infer<typeof ArtworkSchema>;
