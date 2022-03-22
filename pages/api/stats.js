var jwt = require("jsonwebtoken");
import { findVideoIdByUser } from "../../lib/db/index";

async function stats(req, res) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      console.log("line 7 ---------", { token });
        if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.issuer;
        const videoId = req.query.videoId;
        const findVideo = await findVideoIdByUser(token, userId, videoId);
        
        if(findVideo){
            
        } else {
            
        }
        res.send({ message: "working", findVideo, decoded });
      } else {
        res.status(403);
        res.send({ message: "not working" });
      }
    } catch (error) {
      console.error({ message: "error has ocurred /stats", error });
      res.status(500).send({ done: false, error: error.message });
      console.log({ error });
    }
  }
}

export default stats;
