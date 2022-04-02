import { Magic } from "magic-sdk";

function magic() {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)
  );
}

export const magicLink = magic();