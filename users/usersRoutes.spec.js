const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("user routes", () => {
  beforeEach(async () => {
    await db("howtos").truncate();
    await db("users").truncate();
  });

  describe("GET /users", () => {
    it("should get a list of users", async () => {
      let res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      const token = res.body.token;

      res = await request(server)
        .get("/api/users")
        .set({ authorization: token });

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.users).toHaveLength(1);
    });
  });

  describe("GET /users/1", () => {
    it("should get a single user", async () => {
      let res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      const token = res.body.token;

      res = await request(server)
        .get("/api/users/1")
        .set({ authorization: token });

      const user = res.body.user;

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(user.username).toBe("christian");
      expect(user.id).toBe(1);
    });
  });

  describe("PUT and DELETE /users", () => {
    it("should edit user", async () => {
      let res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      const token = res.body.token;

      res = await request(server)
        .put("/api/users/1")
        .set({ authorization: token })
        .send({ username: "billy", password: "testing", isAdmin: false });

      expect(res.status).toBe(200);
      expect(res.body.user.username).toBe("billy");
      expect(res.body.user.isAdmin).toBeFalsy();
    });

    it("should delete user", async () => {
      let res = await request(server)
        .post("/api/auth/register")
        .send({ username: "christian", password: "testing", isAdmin: true });

      const token = res.body.token;
      let users = await db("users");
      expect(users).toHaveLength(1);

      res = await request(server)
        .delete("/api/users/1")
        .set({ authorization: token });

      users = await db("users");

      expect(res.status).toBe(200);
      expect(users).toHaveLength(0);
    });
  });
});
