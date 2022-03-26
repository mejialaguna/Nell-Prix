import jwt from "jsonwebtoken";

export default async function decodeTokenFunction(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return {issuer: decoded.issuer};
}
