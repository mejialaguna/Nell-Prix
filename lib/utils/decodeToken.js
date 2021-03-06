import jwt from "jsonwebtoken";

export default async function decodeToken(token) {
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.issuer
    return userId    
  }
  return null;
}

