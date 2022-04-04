import decodeToken from "./decodeToken";

export async function verifyUser(context) {
   const token = context.req ? context.req.cookies.token : null;
  const userId = await decodeToken(token);
  
  return { token, userId };
}
