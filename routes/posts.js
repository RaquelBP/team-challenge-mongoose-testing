const express = require("express")
const router = express.Router();
const Post = require("../models/Post.js");


const {body, validationResult} = require("express-validator")
const validarBody =[	
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('body').trim().notEmpty().withMessage('Body is required')]

function validate( req,res,next){
    console.log(req.params)
        const errors = validationResult
        (req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
        
    next()
}
    


//Crear publicación

    router.post("/create", validarBody,validate,async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).send(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a post" });
    }
});
// postCreate()

//Get todas las publicaciones
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get posts" });
    }
});

// Obtener un post por ID
router.get("/id/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the post" });
    }
});

// Obtener un post por titulo
router.get("/title/:title", async (req, res) => {
    try {
        const post = await Post.find({ title: req.params.title});
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the post" });
    }
});

// Actualizar un usuario por ID
router.put("/id/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the post" });
    }
});

// Delete todas  las publicaciones
router.delete("/id/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const post= await Post.findByIdAndDelete(id)
        if(!post){
            return res.json({error:"Post  not found"})
           }
           res.status(200).send({ message: "Post deleted successfully" });
       } catch (error) {
           console.error(error);
           res.status(500).send({ message: "There was a problem trying to delete the post" });
       }
})


module.exports = router;