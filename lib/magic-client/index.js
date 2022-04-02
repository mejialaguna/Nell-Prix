import { Magic } from "magic-sdk";

function magic() {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_Magic_Link)
  );
}

export const magicLink = magic();