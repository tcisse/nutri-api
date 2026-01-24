import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : ["http://localhost:3000", "http://localhost:3001", "https://nutrition.goshop.africa"];

console.log("🔒 CORS - Origines autorisées:", allowedOrigins);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) {
      console.log("✅ CORS - Requête sans origin (Postman/mobile) - autorisée");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`✅ CORS - Origin autorisée: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS - Origin refusée: ${origin}`);
      console.log(`   Origines autorisées:`, allowedOrigins);
      callback(null, false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares globaux
app.use(cors(corsOptions));
app.use(express.json());

// Route de santé
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Routes API
app.use("/api", routes);

// Middleware pour les routes non trouvées
app.use(notFoundHandler);

// Middleware de gestion des erreurs (doit être le dernier)
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🥗 NUTRI API - Serveur démarré                      ║
║                                                       ║
║   URL: http://localhost:${PORT}                          ║
║   Env: ${process.env.NODE_ENV || "development"}                                    ║
║                                                       ║
║   Endpoints disponibles:                              ║
║   • GET  /health           - Santé du serveur         ║
║   • GET  /api/info         - Info sur l'API           ║
║   • POST /api/calculate    - Calcul calorique         ║
║   • POST /api/generate-menu - Génération menu         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
