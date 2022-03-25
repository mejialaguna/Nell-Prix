const { Magic } = require("@magic-sdk/admin");

export const magicAdmin = new Magic(`${process.env.magic_Link_Secret_Key}`); 
