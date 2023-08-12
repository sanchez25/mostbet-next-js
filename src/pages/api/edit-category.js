import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{
    const editCat = await prisma.lang.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
          title: req.body.title,
          slug: req.body.slug,
          attr: req.body.attr,
          flag: req.body.flag,
          menu_id: req.body.menu,
          banner_id: req.body.banner,
          sidebar_id: req.body.sidebar,
          buttons_id: req.body.buttons
      }
    })
    
    res.status(200).json({ 
      cat: editCat
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}