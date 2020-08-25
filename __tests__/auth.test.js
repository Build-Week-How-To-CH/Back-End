const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("auth router", () => {
    beforeEach(async () =>{
        await db("users").truncate();
    })

    describe("POST /register", () => {
        it("should add users", async () => {

            const res = await request(server).post("/api/auth/register").send({
                username:"jest",
                password:"hashedpass"
            });
    
            const users = await db("users");
    
            expect(users).toHaveLength(1);
        })
        it("should send a 201", async () => {

            const res = await request(server).post("/api/auth/register").send({
                username:"jest",
                password:"hashedpass"
            });
    
            expect(res.status).toBe(201);
        })
        it("should return json", async () => {
            await request(server)
                .post("/api/auth/register").send({
                    username:"jest2",
                    password:"password"
                })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
    })
})