import Link from "next/link"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const Breadcrumbs = () => {

    const context = useContext({...PageContext})
    const {amp, post, sitename} = context
    const ampPostfix = amp ? 'amp' : ''

    return (
        <nav className="breadcrumbs">
            <Link href={"/" + ampPostfix}>{sitename}</Link>
            <span className="last">{post.shortTitle}</span>
        </nav>

    )
}

export default Breadcrumbs