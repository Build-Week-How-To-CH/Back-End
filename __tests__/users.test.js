const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig")

describe("users router", () => {
    
    beforeEach(async () =>{
        await db("users").truncate();

        await request(server).post("/api/auth/register").send({
            username:"user1",
            password:"pass"
        });
        await request(server).post("/api/auth/register").send({
            username:"user2",
            password:"pass"
        });
    });


    describe("GET /users", () => {
        it("should return a list of users", async () => {
            await request(server)
            .post("/api/auth/register").send({
            username:"jest25",
            password:"hashedpass"
            })

            await request(server)
            .post("/api/auth/login").send({
                username:"jest25",
                password:"hashedpass"
            })
            .then(res => {
                token = res.body.token
            })

            await request(server)
            .get("/api/users")
            .set('Authorization', token)
            .then(res => {
                expect(res.body).toHaveLength(3);
            })
        })
        it("should send a 401", async () => {
            await request(server).get("/api/users")
            .then(res => {
                expect(res.status).toBe(401);
            })
        })
        it("should send a 200", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user2",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })

            await request(server)
            .get("/api/users")
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it("should be defined", async () => {
            await request(server).get("/api/users")
            .then(res => {
                expect(res.body).toBeDefined();
            })
        })
    })
    describe("GET /users/:id", () => {
        it("should return a single user", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user2",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })

            await request(server)
            .get("/api/users/2")
            .set('Authorization', token)
            .then(res => {
                expect([res.body]).toHaveLength(1);
            })
        })
        it("should return the correct id", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user2",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })

            await request(server)
            .get("/api/users/2")
            .set('Authorization', token)
            .then(res => {
                const expected = {id: 2}
                expect(res.body).toMatchObject(expected)
            })
        })
        it("should send a 401", async () => {
            await request(server).get("/api/users/2")
            .then(res => {
                expect(res.status).toBe(401);
            })
        })
        it("should send a 200", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user2",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })

            await request(server)
            .get("/api/users/2")
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it("should send json", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user2",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })

            await request(server)
            .get("/api/users/2")
            .set('Authorization', token)
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
})