import decodeTokenFunction from "./decodeToken";

export async function verifyUser(context) {
  const token = context.req ? context.req.cookies.token : null;
  console.log({token})
  const userId = await decodeTokenFunction(token);
  
  return { token, userId };
}
