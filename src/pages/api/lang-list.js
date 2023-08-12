import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    try{
        const langs = await prisma.lang.findMany()
        res.status(200).json({
            langs_data: langs
        })

    } catch(e){
        res.status(400).json({
            error: e
        })
        console.log('Error!', e)
    }

}