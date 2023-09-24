"use server";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";


export async function fetchUser(userId: string) {
    try {
        connectToDB();

        return await User.findOne({ id: userId })
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripeStatus: boolean;
}


export async function updateUser({
    userId,
    bio,
    name,
    path,
    username,
    image,
    stripeCustomerId,
    stripeSubscriptionId,
    stripeStatus,
}: Params): Promise<void> {
    try {
        connectToDB();
        

        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
                stripeCustomerId: stripeCustomerId,
                stripeSubscriptionId: stripeSubscriptionId,
                stripeStatus: stripeStatus,

            },
            { upsert: true }
        );

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}