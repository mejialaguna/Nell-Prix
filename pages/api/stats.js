var jwt = require("jsonwebtoken");

function stats(req, res) {
  if (req.method === "POST") {
    try {
        const token = req.cookies.token;
        if (token) {
          const decoded = jwt.verify( token , process.env.JWT_SECRET);
          console.log({ decoded });
          res.send({ message: "working" , decoded });
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
