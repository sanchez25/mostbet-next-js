import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import axios from 'axios'
import React, { useState } from 'react'

export default function Media(props) {

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < file.length; i++) {
          formData.append("filesData", file[i])
        }

        axios
        .post(`${process.env.NEXT_PUBLIC_HOST}/api/fileupload`, formData)
        .then((res) => res.data);
    }

  const files_data = JSON.parse(props.files)

  return (
   <Layout title="Загрузка файлов" user={props.user}>
        <div className="h2">
            <h2>Медиа-галерея</h2>
        </div>
        <div className="files-list">
        { 
        files_data.map(file =>(
          <>
          <div className="image">
             <img src={`/uploads/img/${file}`} alt="" />
              <span>{file}</span>
          </div>
           
          </>  
          )) 
        }
        </div>
        <form
        onSubmit={handleSubmit}
        method='POST'
        encType='multipart/form-data'
        action='uploadFiles'
      >
        <input
          type='file'
          name='files'
          onChange={(e) => setFile(e.target.files)}
          multiple
        />
        <button>Загрузить файлы</button>
      </form>
        
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null

        let filesList = []
         
        await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/files-list`).then(
          (response) => {
            filesList = JSON.stringify(response.data.myFiles)
          }
        )
        
        return {
          props: { 
            user: user,
            files: filesList
          }
        }
  
    }
  )