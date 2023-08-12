import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    try{
        const editSidebar = await prisma.sidebar.update({
            where: {
                id: parseInt(req.body.id),
            },
            data: {
                name: req.body.name,
                banner_title: req.body.banner_title,
                banner_price: req.body.banner_price,
                text_btn: req.body.text_btn,
                top_one: req.body.top_one,
                top_two: req.body.top_two,
                top_three: req.body.top_three,
                bottom_one: req.body.bottom_one,
                bottom_two: req.body.bottom_two,
                bottom_three: req.body.bottom_three,
                bottom_four: req.body.bottom_four,
                bottom_five: req.body.bottom_five
            }
        })

        res.status(200).json({
            banner: editSidebar
        })

    } catch(e){
        res.status(400).json({
            error: e
        })
        console.log('Error!', e)
    }
}