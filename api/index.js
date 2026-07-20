import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from '../routes/chat.js';
import statusRoutes from '../routes/status.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', '⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒');
  next();
});

app.use('/api/chat', chatRoutes);
app.use('/api', statusRoutes);

app.get('/', (req, res) => {
  res.json({
    name: 'WormGPT API',
    version: '1.0.0',
    author: '⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒',
    status: 'online'
  });
});

export default app;});

app.listen(PORT, () => {
  console.log(`🔥 WormGPT API running on port ${PORT}`);
  console.log(`⚔️ 𝐓𝐇𝐄 𝐅𝐎𝐔𝐑 𝐋𝐎𝐑𝐃𝐒 - All Rights Reserved`);
});
