const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig")

describe("auth router", () => {
    beforeEach(async () =>{
        await db("users").truncate();
    })

    describe("HTTPmethodhere routehere", () => {
        
    })
})