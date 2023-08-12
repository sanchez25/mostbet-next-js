import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    try{
        const newBanner = await prisma.banner.create({
            data: {
                name: req.body.name,
                title: req.body.title,
                description: req.body.description,
                text_btn: req.body.text_btn
            }
        })

        res.status(200).json({
            banner: newBanner
        })

    } catch(e){
        res.status(400).json({
            error: e
        })
        console.log('Error!', e)
    }

}