import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{
    const posts = await prisma.post.findMany({
      where: {
        language_id: req.body.id,
      },
      select: {
        id: true,
        title: true,
        slug: true
      },
    })

    res.status(200).json({ 
      data: posts
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}