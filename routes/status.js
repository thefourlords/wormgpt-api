import express from 'express';

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    version: '1.0.0',
    author: '⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒'
  });
});

export default router;