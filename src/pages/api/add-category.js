import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{
    const newCat = await prisma.lang.create({
      data: {
        title: req.body.title,
        slug: req.body.slug,
        attr: req.body.attr,
        flag: req.body.flag
      }
    })
    
    res.status(200).json({ 
      cat: newCat
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}