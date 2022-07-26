import { serialize } from "cookie";

export default async function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.siteJwt;
  console.log({ jwt });
  if (!jwt) {
    return res.status(401).json({ message: "Not logged in." });
  }
  const cookie = serialize("siteJwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Logged Out" });
}
