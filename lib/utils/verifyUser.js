import decodeTokenFunction from "./decodeToken";

export async function verifyUser(context) {
  const token = context.req.cookies.token;
  const userId = await decodeTokenFunction(token);
  console.log("--------", { userId });
  
  return { token, userId };
}
