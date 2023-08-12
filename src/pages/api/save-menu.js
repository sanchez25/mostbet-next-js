import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{
    const newMenu = await prisma.menu.create({
      data: {
        name: req.body.name,
        value: req.body.value,
      }
    })
    
    res.status(200).json({ 
      menu: newMenu
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}