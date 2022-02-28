import { Magic, RPCError, RPCErrorCode } from "magic-sdk";

export const magicLink = async function (email) {
  const m =
    typeof window !== undefined &&
    new Magic(process.env.NEXT_PUBLIC_magic_link);
  try {
    const dIdToken = await m.auth.loginWithMagicLink({ email: email });

    return dIdToken;
  } catch (err) {
    if (err instanceof RPCError) {
      switch (err.code) {
        case RPCErrorCode.AccessDeniedToUser:
        case RPCErrorCode.MagicLinkRateLimited:
        case RPCErrorCode.UserAlreadyLoggedIn:
          // Handle errors accordingly :)
          break;
      }
    }
  }
};

// export async function magicLinkMetaData() {
//   const m =
//     typeof window !== undefined &&
//     new Magic(process.env.NEXT_PUBLIC_magic_link);
//   try {
//     const { email, publicAddress } = await m.user.getMetadata();
//     // console.log({ email: email, publicAddress: publicAddress });
//     return { email: email, publicAddress: publicAddress };
//   } catch (error) {
//     console.error("something went wrong", error);
//   }
// }
