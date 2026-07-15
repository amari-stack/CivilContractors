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
  
  // Try to parse database name from URI, otherwise default to "la_contractors"
  let dbName = 'la_contractors';
  try {
    const url = new URL(uri);
    const pathName = url.pathname.replace(/^\//, '');
    if (pathName) {
      dbName = pathName;
    }
  } catch (e) {
    // Use fallback if connection URI isn't standard
  }
  return mongoClient.db(dbName);
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
      res.status(500).json({
        error: 'Failed to save proposal to MongoDB Atlas.',
        details: error?.message || String(error)
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
