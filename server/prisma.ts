import { PrismaClient } from '../generated/prisma/client';

/**
 * Prisma Client Extension for Custom Logic
 * This file extends the base Prisma client with custom query logic,
 * specifically for generating unique rank numbers for animal rescues based on date.
 */

export const prisma = new PrismaClient();
