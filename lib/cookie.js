var cookie = require("cookie");

const MAX_AGE = 1 * 24 * 60 * 60;

export const setTokenCookie = (token, res) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
    res.setHeader("set-cookie" , setCookie)
};


export const removeTokenCookie = (res) => {
  const val = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", val);
};