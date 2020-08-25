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
        it("should send a 400 if no username or password are sent", async () => {

            const res = await request(server)
            .post("/api/auth/register").send({
                username:"",
                password:""
            })
    
            expect(res.status).toBe(400);
        })
        it("should not contain an unhashed password", async () => {
            await request(server).post("/api/auth/register").send({
                username:"jest25",
                password:"hashedpass"
                })
                .then(res => {
                    const expected = {password: 'hashedpass'}
                    expect(res.body.data).not.toMatchObject(expected)
                })
            })
    })

    describe("POST /login", () => {
        it("should contain a message", async () => {
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
                    const expected = {message: "welcome to the API"}
                    expect(res.body).toMatchObject(expected)
                })
        })
        it("should send a 200", async () => {

            await request(server).post("/api/auth/register").send({
                username:"jest25",
                password:"hashedpass"
            });

            const res = await request(server)
            .post("/api/auth/login").send({
                username:"jest25",
                password:"hashedpass"
            })
    
            expect(res.status).toBe(200);
        })
        it("should send a 401 if password doesn't match", async () => {

            await request(server).post("/api/auth/register").send({
                username:"jest25",
                password:"hashedpass"
            });

            const res = await request(server)
            .post("/api/auth/login").send({
                username:"jest25",
                password:"pssword"
            })
    
            expect(res.status).toBe(401);
        })
        it("should send a 400 if no username or password are sent", async () => {

            const res = await request(server)
            .post("/api/auth/login").send({
                username:"",
                password:""
            })
    
            expect(res.status).toBe(400);
        })
    })
})