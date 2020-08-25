const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig")

describe("how-to router", () => {
    beforeEach(async () =>{
        await db("posts").truncate();
        await db("users").truncate();
    })

    describe("HTTPmethodhere /howto", () => {
        it("should send a 401", async () => {
            await request(server).get("/api/howto")
            .then(res => {
                expect(res.status).toBe(401);
            })
        })
    })
})