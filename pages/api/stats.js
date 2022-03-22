var jwt = require("jsonwebtoken");
import { findVideoIdByUser, updateStats, insertStats } from "../../lib/db";

async function stats(req, res) {
  try {
    if (req.method === "POST") {
      const token = req.cookies.token;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.issuer;
        const { favorite, watched = true, videoId } = req.body;

        if (videoId) {
          const findVideo = await findVideoIdByUser(token, userId, videoId);
          const videoExist = findVideo?.length > 0; // check if video exist to run update stats if not it will create one

          if (videoExist) {
            const response = await updateStats(token, {
              favorite,
              userId,
              watched,
              videoId,
            });
            res.send({ response });
          } else {
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favorite,
            });
            res.send({ data: response });
          }
        } else {
          res.status(500).send({message: "videoId is needed"})
        }
      } else {
        res.status(403);
        res.send({ message: "not working token is needed or broken" });
      }
    }
  } catch (error) {
    console.error({ message: "error has ocurred /stats", error });
    res.status(500).send({ done: false, error: error.message });
    console.log({ error });
  }
}

export default stats;
