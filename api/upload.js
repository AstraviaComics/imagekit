const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Di Vercel, file dikirim sebagai base64 string dalam body
        const { file, fileName } = req.body;
        
        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const response = await imagekit.upload({
            file: file,
            fileName: fileName || `upload_${Date.now()}`,
            folder: '/vercel-uploads/'
        });

        return res.status(200).json({
            url: response.url,
            fileId: response.fileId
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ 
            error: error.message || 'Failed to upload',
            details: error 
        });
    }
};
