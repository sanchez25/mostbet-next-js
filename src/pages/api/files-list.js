import fs from "fs"

export default async function(req, res){
    
    fs.promises.readdir('./public/uploads/img')
        .then(filenames => {
            res.status(200).json({
                myFiles: filenames
            }) 
        })
        .catch(err => {
            console.log(err)
        })
}