import { Magic } from "magic-sdk";

function magic() {
  const m =
    typeof window !== undefined &&
    new Magic(process.env.NEXT_PUBLIC_magic_link);
  return m;
}

export const magicLink = async function (email) {
  const m = magic();
  try {
    const dIdToken = await m.auth.loginWithMagicLink({ email: email });

    return dIdToken;
  } catch (error) {
    console.error("something went wrong", error);
  }
};

export async function magicLinkMetaData() {
  const m = magic();
  try {
    const { email, publicAddress } = await m.user.getMetadata();
    return { email: email, publicAddress: publicAddress };
  } catch (error) {
    console.error("something went wrong", error);
  }
}

export async function signOut() {
  const m = magic();
  try {
    await m.user.logout();
    console.log(await m.user.isLoggedIn()); // => `false`
  } catch (error) {
    console.error(
      "error signing out , 'the user might be already signed out'",
      error
    );
  }
}

export async function isLoggedIn() {
  const m = magic();
  try {
    const isLoggedIn = await m.user.isLoggedIn();
    console.log(isLoggedIn); // => `true` or `false`
  } catch (error) {
    console.error(
      "error signing out , 'the user might be already signed out'",
      error
    );
  }
}
