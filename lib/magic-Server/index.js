import { Magic } from "@magic-sdk/admin";

export const mAdmin = new Magic(process.env.magic_Link_Secret_Key);
