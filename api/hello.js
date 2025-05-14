// /api/hello.js
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    // Mengambil authentication parameters dari ImageKit
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result); // Mengirimkan hasil signature
  } else {
    // Response default
    res.status(200).send("Hello from Serverless Function");
  }
};
