import { magicAdmin } from "../../lib/magic-Server";
import jwt from "jsonwebtoken";

async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substring(7) : "";

      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({ metadata });
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        `${process.env.jwt_secret_key}`
      );
console.log({token})
      res.send({
        message: { metadata },
        didToken: didToken,
        token,
      });
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
