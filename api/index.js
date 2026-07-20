import axios from 'axios';

export default async function handler(req, res) {
  // ✅ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ المسار الرئيسي
  if (req.method === 'GET' && req.url === '/') {
    return res.status(200).json({
      name: 'WormGPT API',
      version: '1.0.0',
      author: '⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒',
      status: 'online'
    });
  }

  // ✅ حالة البوت
  if (req.method === 'GET' && req.url === '/api/status') {
    return res.status(200).json({
      status: 'online',
      uptime: process.uptime(),
      author: '⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒'
    });
  }

  // ✅ محرك الدردشة
  if (req.method === 'POST' && req.url === '/api/chat') {
    try {
      const apiKey = req.headers['x-api-key'];
      const { message } = req.body;

      // ✅ التحقق من المفتاح
      if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Invalid API key' });
      }

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // ✅ رد وهمي (لأن OpenAI key قد لا يكون متاحاً)
      const response = `[WormGPT] ${message} - This is a response from the API.`;
      
      return res.status(200).json({
        success: true,
        response: response,
        model: 'wormgpt-v1',
        author: '⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒'
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ✅ أي مسار غير معروف
  return res.status(404).json({ error: 'Not found' });
}
