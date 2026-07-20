export default async function handler(req, res) {
  // ✅ السماح بـ CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ فقط POST مسموح
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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

    // ✅ الرد الوهمي (أو استدعاء الذكاء الاصطناعي)
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
