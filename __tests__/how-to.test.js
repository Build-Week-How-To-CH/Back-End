const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig")

describe("how-to router", () => {
    beforeEach(async () =>{
        await db("posts").truncate();
        await db("users").truncate();

        await request(server).post("/api/auth/register").send({
            username:"user1",
            password:"pass"
        });

        await request(server).post("/api/auth/register").send({
            username:"user2",
            password:"pass"
        })

        await request(server)
        .post("/api/auth/login").send({
            username:"user1",
            password:"pass"
        })
        .then(res => {
            token = res.body.token
        })

        await request(server)
        .post("/api/howto").send(
        {
            user_id: 1,
            title:"post1",
            contents:"dummy post1"
        })
        .set('Authorization', token)
        
        await request(server)
        .post("/api/howto").send(
        {
            user_id: 2,
            title:"post2",
            contents:"dummy post2"
        })
        .set('Authorization', token)
        
    })

    // describe("GET /howto", () => {
    //     it("should send a 401", async () => {
    //         await request(server).get("/api/howto")
    //         .then(res => {
    //             expect(res.status).toBe(401);
    //         })
    //     })
    // })
    // describe("GET /howto/:id", () => {
    //     it("should send a 401", async () => {
    //         await request(server).get("/api/howto/2")
    //         .then(res => {
    //             expect(res.status).toBe(401);
    //         })
    //     })
    // })
    // describe("GET /howto/user/:id", () => {
    //     it("should send a 401", async () => {
    //         await request(server).get("/api/howto/2")
    //         .then(res => {
    //             expect(res.status).toBe(401);
    //         })
    //     })
    // })
    describe("POST /howto", () => {
        it("should post a new how-to", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user1",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })
            
            await request(server)
            .post("/api/howto").send({
                user_id: 1,
                title:"how to test from the tesing environment",
                contents:"this is from how-to.test.js"
            })
            .set('Authorization', token)
            
            const posts = await db("posts");
    
            expect(posts).toHaveLength(3);
        })
        it("should send a 201", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user1",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })
            
            await request(server)
            .post("/api/howto").send({
                user_id: 1,
                title:"how to test from the tesing environment",
                contents:"this is from how-to.test.js"
            })
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(201);
            })
        })

        it("should send a 500 if missing required data", async () => {
            await request(server)
            .post("/api/auth/login").send({
                username:"user1",
                password:"pass"
            })
            .then(res => {
                token = res.body.token
            })
            
            await request(server)
            .post("/api/howto").send({
                user_id: 1,
                contents:"this is from how-to.test.js"
            })
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(500);
            })
        })

        it("should send a 401", async () => {
            await request(server).get("/api/howto")
            .then(res => {
                expect(res.status).toBe(401);
            })
        })
    })
    describe("PUT /howto/:id", () => {
        it("should update an existing how-to", async () => {
            await request(server)
            .put("/api/howto/1").send({
                title:"testing the update",
                contents:"PUT request"
            })
            .set('Authorization', token)

            .then(res => {
                const expected = { user_id: 1, title: "testing the update", contents: "PUT request" }
                expect(res.body).toMatchObject(expected)
            })
        })

        it("should send a 401", async () => {
            await request(server).put("/api/howto/1")
            .then(res => {
                expect(res.status).toBe(401);
            })
        })

    })
    describe("DELETE /howto/:id", () => {
        it("should delete and existing how-to", async () => {
            await request(server).delete("/api/howto/1")
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(204)
            })
        })

        it("should send a 401", async () => {
            await request(server).delete("/api/howto/1")
            .then(res => {
                expect(res.status).toBe(401);
            })
        })

        it("should send a 404 - (id doesn't exist) ", async () => {
            await request(server).delete("/api/howto/10")
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
    })
})