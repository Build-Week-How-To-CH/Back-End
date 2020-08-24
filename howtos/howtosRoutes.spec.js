const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("user routes", () => {
  beforeEach(async () => {
    await db("howtos").truncate();
    await db("users").truncate();

    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "christian", password: "testing", isAdmin: true });

    const token = res.body.token;

    await request(server)
      .post("/api/howtos")
      .set({ authorization: token })
      .send({ title: "test", user_id: 1, category: "test", content: "test" });
  });

  describe("GET /howtos", () => {
    it("gets a list of howtos", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "christian", password: "testing" });

      const token = res.body.token;

      res = await request(server)
        .get("/api/howtos")
        .set({ authorization: token });

      expect(res.status).toBe(200);
      expect(res.body.howtos).toHaveLength(1);
    });
  });

  describe("POST /howtos", () => {
    it("creates a new howto", async () => {
      let howtos = await db("howtos");
      expect(howtos).toHaveLength(1);

      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "christian", password: "testing" });

      const token = res.body.token;

      res = await request(server)
        .post("/api/howtos")
        .set({ authorization: token })
        .send({ title: "test", user_id: 1, category: "test", content: "test" });

      expect(res.status).toBe(201);

      howtos = await db("howtos");
      expect(howtos).toHaveLength(2);
    });
  });

  describe("PUT /howtos/1", () => {
    it("edits a howto", async () => {
      let howtos = await db("howtos");
      expect(howtos).toHaveLength(1);

      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "christian", password: "testing" });

      const token = res.body.token;

      res = await request(server)
        .put("/api/howtos/1")
        .set({ authorization: token })
        .send({
          title: "testing",
          user_id: 1,
          category: "test",
          content: "test",
        });

      expect(res.status).toBe(200);
      expect(res.body.howto.title).toBe("testing");

      howtos = await db("howtos");
      expect(howtos).toHaveLength(1);
    });
  });

  describe("DELETE /howtos/1", () => {
    it("deletes a howto", async () => {
      let howtos = await db("howtos");
      expect(howtos).toHaveLength(1);

      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "christian", password: "testing" });

      const token = res.body.token;

      res = await request(server)
        .delete("/api/howtos/1")
        .set({ authorization: token });

      expect(res.status).toBe(200);

      howtos = await db("howtos");
      expect(howtos).toHaveLength(0);
    });
  });
});
