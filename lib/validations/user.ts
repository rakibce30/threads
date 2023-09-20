import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, {message: "Minimum 3 characters."}).max(20, {message: "Maximum 20 characters."}),
    username: z.string().min(3, {message: "Minimum 3 characters."}).max(20, {message: "Maximum 20 characters."}),
    bio: z.string().min(3, {message: "Minimum 3 characters."}).max(1000, {message: "Maximum 1000 characters."}),
})