// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const secret = process.env.SECRET || "changeme";

export const expire = 60 * 60 * 24 * 30; // 30 days

export default async function handler(req, res) {
  const { username, password } = req.body;
  // todo: verify in db username and password
  if (username === "admin" && password === "admin") {
    const user = { id: 1, username: "admin", type: "admin" };
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + expire,
        _id: user.id,
        username: user.username,
        type: user.type,
      },
      secret
    );
    const cookie = serialize("siteJwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: expire,
      path: "/",
    });
    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ message: "Valid use" });
  }
  const cookie = serialize("siteJwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  return res.status(401).json({ message: "Invalid Credentials" });
}
