import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{
    const updateOption = await prisma.options.update({
      where: {
        key: req.body.key,
      },
      data: {
          value: req.body.value
      }
    })
    
    res.status(200).json({ 
      updated: updateOption
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}