import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{
    const options = await prisma.options.findMany()
    res.status(200).json({ 
      options_data: options
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}