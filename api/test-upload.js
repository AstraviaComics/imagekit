// Simpan sebagai api/test-upload.js
const ImageKit = require('imagekit');

// Konfigurasi sementara (untuk testing saja)
// Dalam produksi, gunakan environment variables
const imagekit = new ImageKit({
  publicKey: 'public_ey2NfiBHvtWP2W/pN3XpzIAYjxU=', // Ganti dengan public key Anda
  privateKey: 'private_xIjlhuwY0i6gCg8xOUV44ekACjk=', // Ganti dengan private key Anda
  urlEndpoint: 'https://ik.imagekit.io/waf0lxw6e' // Ganti dengan endpoint Anda
});

module.exports = async (req, res) => {
  // Endpoint test sederhana
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'API ready',
      instructions: 'Send a POST request with file data'
    });
  }

  // Endpoint upload test
  if (req.method === 'POST') {
    try {
      // Untuk testing, kita terima data sederhana
      const { testData } = req.body;
      
      if (!testData) {
        return res.status(400).json({ error: 'No test data provided' });
      }

      // Simulasikan upload dengan mengembalikan data dummy
      return res.status(200).json({
        success: true,
        message: 'Test upload successful',
        receivedData: testData,
        dummyImageUrl: 'https://ik.imagekit.io/demo/tr:w-300,h-300/test-image.jpg'
      });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Test failed',
        details: error.message 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
