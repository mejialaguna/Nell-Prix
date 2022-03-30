import { Magic } from "@magic-sdk/admin";

export const magicAdmin = new Magic(process.env.magic_Link_Secret_Key); 

