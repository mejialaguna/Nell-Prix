var jwt = require("jsonwebtoken");
import { findVideoIdByUser, updateStats, insertStats } from "../../lib/db";

async function stats(req, res) {
  try {
    if (req.method === "POST") {
      const token = req.cookies.token;
      console.log("line 7 ---------", { token });
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.issuer;
        const videoId = req.query.videoId;
          const findVideo = await findVideoIdByUser(token, userId, videoId);
          const videoExist = findVideo?.length > 0;
        console.log({ findVideo });
        if (videoExist) {
          const response = await updateStats(token, {
            favorite: 1,
            userId,
            watched: false,
            videoId: "mYfJxlgR2jw",
          });
          //   console.log({ response });
          res.send({ message: "working update stats", response });
        } else {
          const response = await insertStats(token, {
            watched: false,
            userId,
            videoId,
            favorite: 10,
          });
          console.log({ response });
          res.send({ message: "working insert stats", response });
        }
      } else {
        res.status(403);
        res.send({ message: "not working" });
      }
    }
  } catch (error) {
    console.error({ message: "error has ocurred /stats", error });
    res.status(500).send({ done: false, error: error.message });
    console.log({ error });
  }
}

export default stats;
