import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    try{
        const newButtons = await prisma.buttons.create({
            data: {
                name: req.body.name,
                btn_log: req.body.btn_log,
                btn_reg: req.body.btn_reg,
                btn_download: req.body.btn_download,
                btn_promo: req.body.btn_promo
            }
        })

        res.status(200).json({
            banner: newButtons
        })

    } catch(e){
        res.status(400).json({
            error: e
        })
        console.log('Error!', e)
    }
}