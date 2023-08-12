import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    try{
        await prisma.buttons.delete({
            where: {
                id: parseInt(req.body.id)
            }
        })

        res.status(200).json({
            deleted: true
        })

    } catch(e){
        res.status(400).json({
            error: e
        })
        console.log('Error!', e)
    }
}