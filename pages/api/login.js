import { magicAdmin } from "../../lib/magic-Server";

async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
        const didToken = auth ? auth.substring(7) : "";
        console.log({ didToken });
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({metadata})
      res.send({ message: "hello world 1" });
    } catch (err) {
      console.error("something went wrong", err);
      res.status(500);
      res.send({ message: "something went wrong", err });
    }
  } else {
    res.send({ message: "wrong method" });
  }
}

export default login;
