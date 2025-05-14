import imagekit from 'imagekit';

// Konfigurasi ImageKit
const imagekitConfig = new imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Ambil file dari FormData
        const file = req.body.file;
        
        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // Upload ke ImageKit
        const response = await imagekitConfig.upload({
            file: file,
            fileName: `upload_${Date.now()}`,
            folder: '/vercel-uploads/'
        });

        return res.status(200).json({
            url: response.url,
            fileId: response.fileId
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message || 'Failed to upload' });
    }
}
