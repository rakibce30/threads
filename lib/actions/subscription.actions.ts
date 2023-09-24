"use server";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

interface Params {
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripeStatus: boolean;
}

export async function updateUserSubscription({
    stripeCustomerId,
    stripeSubscriptionId,
    stripeStatus,
}: Params): Promise<void> {
    try {
        connectToDB();

        await User.findOneAndUpdate(
            {stripeCustomerId: stripeCustomerId},
            {
                stripeSubscriptionId: stripeSubscriptionId,
                stripeStatus: stripeStatus,
            },
            { upsert: true },
        )
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}