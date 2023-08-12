import Link from "next/link";
import {useRouter} from "next/router";

const Menu = (props) => {

    const { pathname, asPath } = useRouter()
    const ampPostfix = props.amp ? '/amp' : ''

    let mainLink = props.category.id
    if (mainLink == props.mainLang) {
        mainLink = ''
    } else {
        mainLink = props.category.slug
    }

    return (
        <div className="menu">
            { props.list.value && JSON.parse(props.list.value).map(({ id, title, slug }) => (
                <>
                   {
                    ( id === props.mainID )
                    ? <Link key={id} href={`/${ampPostfix}`} className={ (pathname.includes("[[...slug]]") || pathname == '/amp') ? "active" : ""}>{title}</Link> 
                    : <Link key={id} className={asPath.includes(slug) ? "active" : ""} href={`/${mainLink}/${slug}${ampPostfix}`}>{title}</Link>
                   } 
                </>
            ))}
        </div>

    )
}

export default Menu