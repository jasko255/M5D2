// *******************8auth crud
// read get  http://localhost:3001/authors/
// read get  http://localhost:3001/authors/:id
// create post  http://localhost:3001/authors/
// update put  http://localhost:3001/authors/:id
// delete delete  http://localhost:3001/authors/:id


import express from 'express'

const authorsRouter = express.Router()

// read get  http://localhost:3001/authors/
authorsRouter.get("/", (req, res)=>{
    console.log('URL--->', req.url )
    res.send('hello im the get authors end')
})

// read get  http://localhost:3001/authors/:id
authorsRouter.get("/:id", (req, res)=>{
    res.send('hello im the get user end')
})

// create post  http://localhost:3001/authors/
authorsRouter.post("/", (req, res)=>{
    res.send('hello im the create author end')
})

// update put  http://localhost:3001/authors/:id
authorsRouter.put("/:id", (req, res)=>{
    res.send('hello im the update author end')
})

// delete delete  http://localhost:3001/authors/:id
authorsRouter.delete("/:id", (req, res)=>{
    res.send('hello im the delete authors end')
})



export default authorsRouter