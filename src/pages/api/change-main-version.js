import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    try{

        const editPost = await prisma.post.update({
            where: {
                id: parseInt(req.body.id),
            },
            data: {
                mainVersion_id: req.body.mainVersionId
            }
        })

        res.status(200).json({
            post: editPost
        })

    } catch(e){
        res.status(400).json({
            error: e
        })
        console.log('Error!', e)
    }
}