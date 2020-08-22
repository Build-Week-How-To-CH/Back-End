const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRoutes = require("../users/usersRoutes");
const authRoutes = require("../auth/authRoutes");

const {
  requiresToken,
  requiresAdmin,
} = require("../restricted/restrictedMiddleware");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", requiresToken, requiresAdmin, usersRoutes);
server.use("/api/auth", authRoutes);

module.exports = server;
