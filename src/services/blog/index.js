
import express from "express";
import fs from 'fs'
import path,  { dirname } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";


const postsRouter = express.Router()


// GET /blogPosts => http://localhost:3001/blogPosts/
// GET /blogPosts /123 => http://localhost:3001/blogPosts/:id
// POST /blogPosts => http://localhost:3001/blogPosts/
// PUT /blogPosts /123 => http://localhost:3001/blogPosts/:id
// DELETE /blogPosts /123 => http://localhost:3001/blogPosts/:id



const fileSelf = fileURLToPath(import.meta.url)
const fileFolder = dirname(fileSelf)

const postsJSONPath = path.join(fileFolder, "posts.json")




postsRouter.get('/', (req, res, next)=>{
   const postsJSONContent = fs.readFileSync(postsJSONPath)
   const contentAsJSON = JSON.parse(postsJSONContent)
   res.send(contentAsJSON)

})

postsRouter.get('/:id', (req, res, next)=>{
    const postsJSONContent = fs.readFileSync(postsJSONPath)
   const contentAsJSON = JSON.parse(postsJSONContent)

    const post = contentAsJSON.find((post)=> post.id === req.params.id)
    if(!post){
        res.status(404).send({message: `Post with ${req.params.id} not found!`})
    }

   res.send(post)

})

postsRouter.post('/', (req, res, next)=>{
    const {category, title, cover, readTime, author, content  } = req.body
    const post = {
        id: uniqid(),
        category,
         title,
          cover,
           readTime,
            author,
             content,
        // avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const postsJSONContent = fs.readFileSync(postsJSONPath)
   const contentAsJSON = JSON.parse(postsJSONContent)
   contentAsJSON.push(post)
   fs.writeFileSync(postsJSONPath, JSON.stringify(contentAsJSON));
   res.send(post)
})

postsRouter.put('/:id', (req, res, next)=>{
    const postsJSONContent = fs.readFileSync(postsJSONPath)
    const contentAsJSON = JSON.parse(postsJSONContent)
 
     const postIndex = contentAsJSON.findIndex((post)=> post.id === req.params.id)
     if(!postIndex == -1){
         res.status(404).send({message: `Post with ${req.params.id} not found!`})
     }
     const prevPost = contentAsJSON[postIndex]
     const changedPost = {...prevPost, ...req.body, updatedAt: new Date(),  id: req.params.id}
     contentAsJSON[postIndex] = changedPost
     fs.writeFileSync(postsJSONPath, JSON.stringify(contentAsJSON));
    res.send(changedPost)

})

postsRouter.delete('/:id', (req, res, next)=>{
    const postsJSONContent = fs.readFileSync(postsJSONPath)
    let contentAsJSON = JSON.parse(postsJSONContent)

    const post = contentAsJSON.find((post)=> post.id === req.params.id)
    if(!post) {
        res.status(404).send({ message: `Post with ${req.params.id} is not found!` });
    }
    contentAsJSON = contentAsJSON.filter((post)=> post.id !== req.params.id )
    fs.writeFileSync(postsJSONPath, JSON.stringify(contentAsJSON));
    res.status(204).send()

})



export default postsRouter