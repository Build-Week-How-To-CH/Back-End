const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("auth routes", () => {
  beforeEach(async () => {
    await db("howtos").truncate();
    await db("users").truncate();
  });

  describe("POST /register", () => {
    it("should add a new user", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);

      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      users = await db("users");
      expect(users).toHaveLength(1);
      expect(res.status).toBe(201);
    });

    it("should give a token with the response", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      expect(res.body.token).toBeDefined();
      expect(res.status).toBe(201);
    });

    it("should not create user if req does not include all fields", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);

      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian" });

      expect(res.body.error).toMatch(/required username, password, isAdmin/i);
      expect(res.status).toBe(400);

      users = await db("users");
      expect(users).toHaveLength(0);
    });

    it("should not create user if username is already taken", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);

      await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      users = await db("users");
      expect(users).toHaveLength(1);

      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      expect(res.body.error).toMatch(/taken/i);
      expect(res.status).toBe(409);

      users = await db("users");
      expect(users).toHaveLength(1);
    });
  });

  describe("POST /login", () => {
    beforeEach(async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });
    });

    it("should send a token on successful login", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "christian", password: "testing" });

      expect(res.body.token).toBeDefined();
      expect(res.status).toBe(200);
    });

    it("should return the correct user on login", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "christian", password: "testing" });

      expect(res.body.user.username).toBe("christian");
      expect(res.body.user.isAdmin).toBeTruthy();
      expect(res.status).toBe(200);
    });

    it("should not log in user with incorrect password", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "christian", password: "password" });

      expect(res.body.error).toBeDefined();
      expect(res.body.user).not.toBeDefined();
      expect(res.body.token).not.toBeDefined();
      expect(res.status).toBe(401);
    });

    it("should not log in user that doesn't exist", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "dave", password: "testing" });

      expect(res.body.error).toBeDefined();
      expect(res.body.user).not.toBeDefined();
      expect(res.body.token).not.toBeDefined();
      expect(res.status).toBe(401);
    });
  });
});
