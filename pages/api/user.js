// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.siteJwt;
  console.log({ jwt }, !jwt);
  if (jwt) {
    return res.status(200).json({ message: "Got a user" });
  }
  res.status(401).json({ message: "No login token." });
}
