import fs from "fs"

export default async function(req, res){
    
    fs.promises.readdir('./public/uploads/img/flags')
        .then(flags => {
            res.status(200).json({
                flags: flags
            }) 
        })
        .catch(err => {
            console.log(err)
        })
}