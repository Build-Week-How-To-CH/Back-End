const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("auth routes", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /register", () => {
    it("should add a new user", async () => {
      let users = await db("users");
      expect(users).toHaveLength(0);
    });
  });
});
