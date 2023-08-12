import { PrismaClient } from '@prisma/client'
//import { useContext } from 'react'
//import { PageContext } from "@/providers/PageContext"

const prisma = new PrismaClient()

//const context = useContext({...PageContext})

//const { category, mainLang} = context

export default async function handler(req, res) {

  try{

   /* let mainLink = category.id
    if (mainLink == mainLang) {
      mainLink = ''
    } else {
      mainLink = props.category.slug
    }*/

    const newPage = await prisma.post.create({
      data: {
        seo_title: req.body.seoTitle,
        shortTitle: req.body.shortTitle,
        seo_description: req.body.seoDescription,
        title: req.body.title,
        language_id: req.body.category,
        content: req.body.content,
        slug: req.body.slug,
        updated_at: Date.now().toString()
      }
    })
    
    res.status(200).json({ 
      post: newPage
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}