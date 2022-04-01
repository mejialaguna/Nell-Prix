import { Magic } from "magic-sdk";

function magic() {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_Publishable_Api_Key)
  );
}

export const magicLink = magic();