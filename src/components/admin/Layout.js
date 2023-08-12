import Head from "next/head"
import Sidebar from "./Sidebar"

const layout = ({
    user,
    title = 'Админ-панель', 
    description = 'Добро пожаловать в админку',
    children
}) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <header>
                <div className="header_top wrapper">
                    <div className="header_logo">
                        <img src="/admin/seo.svg" alt="" />
                        <span><b>ALFA</b> Admin Panel</span>
                    </div>
                    <div className="header_admin">
                        <img src="/admin/avatarka.png" alt="" />
                        <span>Admin</span>
                    </div>
                </div>
            </header>


            <div className="main_content wrapper">
                
                <Sidebar />
                <div className="info">
                    <div className="info_content">
                       { user ? children: 'User not logged in.'}
                    </div>
                </div>
            </div>

    </>
        
    )

}

export default layout


