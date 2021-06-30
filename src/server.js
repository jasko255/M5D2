import  express  from "express";
import listEndpoints from "express-list-endpoints";
import cors from 'cors'
import authorsRouter from "./services/authors/index.js";
import postsRouter from './services/blog/index.js'

const server = express()

server.use(express.json())

const PORT = process.env.PORT || 3001

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL]

server.use(cors(
    {origin: function(origin, callback){
    if(!origin || whitelist.indexOf(origin) !== -1){
        callback(null, true)
    }
    else{ callback(new Error('Not allowed by cors!'))

    }
}}))

//***********************************8 */ ENDPOINTS

server.use("/authors", authorsRouter)
server.use('/blogPosts', postsRouter)

console.table(listEndpoints(server))

server.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
})
