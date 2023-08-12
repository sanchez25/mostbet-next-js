import nextConnect from "next-connect"
import multer from "multer"
import fs from "fs"
import sharp from "sharp"


const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` })
  }
})

apiRoute.use(multer().any())

try {
  apiRoute.post((req, res) => {

    for ( let file of req.files ){
  
      fs.writeFile(`./public/uploads/img/${file.originalname}`, file.buffer, (err) => {
          console.error(err)
      })
  
      sharp(file.buffer).resize(800).webp({ lossless: true }).toBuffer().then(
        newBuffer => {
          fs.writeFile(`./public/uploads/img/webp/${file.originalname}.webp`, newBuffer, (err) => {
            console.error(err)
          })   
        }).catch( err => { console.log(err) })
    }
  
  })
  
} catch(e){
  console.log('File error!!!', e)
}

export default apiRoute

export const config = {
  api: {
    bodyParser: false,
  },
}