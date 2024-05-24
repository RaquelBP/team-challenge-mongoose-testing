const express = require('express');
//const app = express();
const routes = require('./routes/posts');
const request = require("supertest");
const app = require("./index");
//const Post = require("../models/Post.js"); 


describe("Test POST /create", ()=>{
    it("should create a post", ()=>{
        const post ={
            title:"demo1",
            body:"esto es una prueba1"
        }
    })
    expect(()=>res.status(201))
})

/*
test("Create a post", async ()=>{
    let usersCount = await Post.countDocuments({})

    expect(usersCount).toBe(0)

    resUser = (await request(app).post("/create")).send(user).expect(201)

    usersCount=await Post.countDocuments({})
    expect(usersCount).toBe(1)
})
*/
