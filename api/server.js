const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRoutes = require("../users/usersRoutes");
const authRoutes = require("../auth/authRoutes");
const howtosRoutes = require("../howtos/howtosRoutes");

const { requiresToken } = require("../restricted/restrictedMiddleware");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", requiresToken, usersRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/howtos", requiresToken, howtosRoutes);

module.exports = server;
