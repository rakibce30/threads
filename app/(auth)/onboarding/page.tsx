import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Stripe from "stripe";



async function Page() {

  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
  });

  const getStripeCustomerId = await stripe.customers.create({ name: user?.firstName as string });
  const stripeCustomerId = getStripeCustomerId.id;


  const userInfo = await fetchUser(user.id);

  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };


  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use Threds.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' stripeCustomerId={stripeCustomerId} />

      </section>
    </main>
  );
}

export default Page;