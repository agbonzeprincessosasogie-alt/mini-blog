 require("dotenv").config();

 const mongoose = require("mongoose");
 const request = require("supertest");
 const app = require("../app");

 let token;

 beforeAll(async() => {
     await mongoose.connect(process.env.MONGO_URI, {
         serverSelectionTimeoutMS: 10000
     });
 }, 15000);
 beforeAll(async() => {
     const response = await request(app)
         .post("/api/auth/login")
         .send({
             email: "testuser@gmail.com",
             password: "12345678"
         });

     token = response.body.token;
 });

 afterAll(async() => {
     await mongoose.connection.close();
 });
 describe("Posts API", () => {

     test("GET /api/posts returns 200", async() => {

         const response = await request(app)
             .get("/api/posts");
         expect(response.status).toBe(200);
     });
     test("POST /api/posts returns 401 without token", async() => {

         const response = await request(app)
             .post("/api/posts")
             .send({
                 title: "Test Post",
                 body: "This is a test post"
             });

         expect(response.status).toBe(401);

     });
     test("POST /api/posts creates a new post with valid token", async() => {

         const response = await request(app)
             .post("/api/posts")
             .set("Authorization", `Bearer ${token}`)
             .send({
                 title: "Test Post",
                 body: "This is a test post"
             });

         expect(response.status).toBe(201);
         expect(response.body).toHaveProperty("_id");
         expect(response.body.title).toBe("Test Post");
         expect(response.body.body).toBe("This is a test post");

     });
     test("POST /api/posts returns 400 when title is missing", async() => {

         const response = await request(app)
             .post("/api/posts")
             .set("Authorization", `Bearer ${token}`)
             .send({
                 body: "This post has no title"
             });

         expect(response.status).toBe(400);

     });

 });