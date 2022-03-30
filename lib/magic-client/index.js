import { Magic } from "magic-sdk";


const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_magic_link)
  ); // ✨
};

export const magic = createMagic();
