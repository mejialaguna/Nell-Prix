import { magicAdmin } from "../../lib/magic-Server";
import { removeTokenCookie } from "../../lib/cookie";
import { verifyUser } from "../../lib/utils/verifyUser";

export default async function logout(req, res) {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: "User is not logged in" });
    const token = req.cookies.token;

    const userId = await verifyUser(token);
    removeTokenCookie(res);
    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.error("Error occurred while logging out magic user", error);
    }
    //redirects user to login page
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
