//Step 1 import
import express from 'express'
import morgan from 'morgan'
import { readdirSync } from 'fs'
import cors from 'cors'
// import authRouter from './routes/auth.js'
// import categoryRouter from './routes/category.js'

const app = express()
const PORT = 5000


//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//Step 3 Router
// app.use('/api', authRouter)
// app.use('/api', categoryRouter)

// loop ./routes มาใช้เพื่อจะได้ไม่ต้องเขียนหลายๆอัน
const loadRouters = async ()=> {
  const files = readdirSync('./routes')
  for(const file of files){
    const route = await import(`./routes/${file}`)
    app.use('/api', route.default)
  }
}


//Step 2 Start Server
loadRouters().then(()=>{
  app.listen(PORT, () => {
    console.log(`Start Server : http://localhost:${PORT}`)
  })
})