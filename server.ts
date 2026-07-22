import "dotenv/config";

import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";

// --------------------------------------------------
// Basic setup
// --------------------------------------------------

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");

// --------------------------------------------------
// Security and middleware
// --------------------------------------------------

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

const allowedOrigins = [
  "https://amari-stack.github.io",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allows requests without an Origin header,
      // such as health checks and direct browser visits.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("This website is not allowed to access the API."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const proposalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many form submissions were made. Please wait and try again.",
  },
});

// --------------------------------------------------
// MongoDB model
// --------------------------------------------------

interface ProposalDocument {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const proposalSchema = new mongoose.Schema<ProposalDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    service: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
  },
  {
    timestamps: true,
    collection: "proposals",
  }
);

const Proposal =
  mongoose.models.Proposal ||
  mongoose.model<ProposalDocument>("Proposal", proposalSchema);

// --------------------------------------------------
// Health-check routes
// --------------------------------------------------

app.get("/api/health", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "LA Contractors API is running.",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

app.get("/api", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "Welcome to the LA Contractors API.",
  });
});

// --------------------------------------------------
// Proposal form route
// --------------------------------------------------

app.post(
  "/api/proposal",
  proposalLimiter,
  async (request: Request, response: Response) => {
    try {
      const {
        name,
        email,
        phone,
        company,
        service,
        message,
      } = request.body as Partial<ProposalDocument>;

      if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !message.trim()
      ) {
        response.status(400).json({
          success: false,
          message: "Name, email, and message are required.",
        });
        return;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email.trim())) {
        response.status(400).json({
          success: false,
          message: "Please enter a valid email address.",
        });
        return;
      }

      const proposal = await Proposal.create({
        name: name.trim(),
        email: email.trim(),
        phone:
          typeof phone === "string"
            ? phone.trim()
            : undefined,
        company:
          typeof company === "string"
            ? company.trim()
            : undefined,
        service:
          typeof service === "string"
            ? service.trim()
            : undefined,
        message: message.trim(),
      });

      response.status(201).json({
        success: true,
        message:
          "Your proposal was submitted successfully. We will contact you shortly.",
        proposalId: proposal._id,
      });
    } catch (error) {
      console.error("Proposal submission failed:", error);

      response.status(500).json({
        success: false,
        message:
          "Your proposal could not be submitted. Please try again.",
      });
    }
  }
);

// --------------------------------------------------
// Serve the Vite website from the dist folder
// --------------------------------------------------

app.use(
  express.static(distPath, {
    index: false,
    fallthrough: true,
  })
);

// Do not send index.html or JSON for missing asset files.
app.get("/assets/{*assetPath}", (_req, res) => {
  res.status(404).type("text/plain").send("Asset not found");
});

// React/Vite page fallback
app.get("/{*splat}", (_req, res, next) => {
  res.sendFile(path.join(distPath, "index.html"), (error) => {
    if (error) {
      next(error);
    }
  });
});

// --------------------------------------------------
// Error handler
// --------------------------------------------------

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    console.error("Server error:", error);

    response.status(500).json({
      success: false,
      message: "An unexpected server error occurred.",
    });
  }
);

// --------------------------------------------------
// Connect to MongoDB and start Render server
// --------------------------------------------------

async function startServer(): Promise<void> {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL;

  if (!mongoUri) {
    throw new Error(
      "MongoDB is not configured. Add MONGODB_URI in Render Environment settings."
    );
  }

  await mongoose.connect(mongoUri);

  console.log("Connected to MongoDB.");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
