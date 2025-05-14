// /api/hello.js
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = imagekit.getAuthenticationParameters();
      res.status(200).json(result); // Mengirimkan signature untuk upload
    } catch (error) {
      res.status(500).json({ error: 'Failed to get ImageKit auth parameters' });
    }
  } else {
    res.status(200).send("Hello from Serverless Function");
  }
};
