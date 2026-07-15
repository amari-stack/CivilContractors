import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

let mongoClient: MongoClient | null = null;

async function getMongoDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }
  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }
  
  // Parse database name from URI if present, otherwise call db() with no argument
  // to let MongoDB driver fall back to the default database configured in the URI
  try {
    const url = new URL(uri);
    const pathName = url.pathname.replace(/^\//, '');
    if (pathName && !pathName.startsWith('?')) {
      return mongoClient.db(pathName);
    }
  } catch (e) {
    // Fall back to default
  }
  return mongoClient.db();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for proposals
  app.post('/api/proposal', async (req, res) => {
    try {
      const { name, email, phone, company, service, scale, notes } = req.body;

      // Validate required fields
      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required.' });
      }

      // Check if MONGODB_URI is provided
      if (!process.env.MONGODB_URI) {
        console.warn('⚠️ MONGODB_URI is not set. Falling back to simulated successful local dispatch.');
        return res.json({
          success: true,
          fallback: true,
          ticketId: `LA-${Math.floor(10000 + Math.random() * 90000)}`,
          message: 'Proposal details verified locally! However, to persist this entry securely, configure your MONGODB_URI in the Settings menu.'
        });
      }

      const db = await getMongoDb();
      const collection = db.collection('proposals');

      const ticketId = `LA-${Math.floor(10000 + Math.random() * 90000)}`;
      const proposalDocument = {
        ticketId,
        name,
        email,
        phone,
        company: company || '',
        service: service || '',
        scale: scale || '',
        notes: notes || '',
        createdAt: new Date()
      };

      await collection.insertOne(proposalDocument);

      res.status(201).json({
        success: true,
        ticketId,
        message: 'Proposal successfully logged and persisted in MongoDB Atlas!'
      });
    } catch (error: any) {
      console.error('MongoDB operation failed:', error);
      
      let friendlyError = 'Failed to save proposal to MongoDB Atlas.';
      let instruction = '';
      
      const errMsg = error?.message || '';
      if (errMsg.includes('not allowed to do action') || errMsg.includes('unauthorized') || error?.code === 13) {
        friendlyError = 'Database Write Permission Denied';
        instruction = 'The MongoDB Atlas database user in your connection string lacks insert/write permissions. Please go to MongoDB Atlas -> Database Access, edit your user, and change their role to "Read and write to any database" or "Atlas admin".';
      } else if (errMsg.includes('Authentication failed') || errMsg.includes('bad auth')) {
        friendlyError = 'Database Authentication Failed';
        instruction = 'The username or password in your MONGODB_URI is incorrect. Please verify your credentials in your MongoDB Atlas connection string.';
      }
      
      res.status(500).json({
        error: friendlyError,
        details: error?.message || String(error),
        instruction: instruction
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fullstack Server running on http://localhost:${PORT}`);
  });
}

startServer();
