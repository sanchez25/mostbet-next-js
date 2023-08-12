import Head from "next/head"
import FaqSchema from "./FaqSchema";
import BreadcrumbsSchema from "./BreadcrumbsSchema"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import XDefault from "./XDefault";
import HrefLang from "./HrefLang";

const Heading = function() {

    const context = useContext({...PageContext})
    const {mainID, post, amp, ampStyle, sitename, link, breadcrumbs, category, langs, alternativeVersions, mainPost, customVersions} = context
    const post_content = post ? JSON.parse(post.content) : ''
    const faq = ( Array.isArray(post_content.blocks) ) ? post_content.blocks.find( (item) => item.type === 'faq') : {}

    return (
        <Head>
            <html lang={category.attr}>
                {amp
                    ? <style amp-custom="">{ampStyle}</style>
                    : <link rel="amphtml" href={`${link}/amp`} />
                }
                <title>{post.seo_title}</title>
                <meta name="robots" content="noindex,nofollow" />
                <meta name="description" content={post.seo_description}/>
                <meta property="og:locale" content={category.attr} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={post.seo_title} />
                <meta property="og:description" content={post.seo_description} />
                <meta property="og:site_name" content={sitename} />
                <meta property="og:updated_time" content="2023-05-25T15:43:15+00:00" />
                <meta property="article:published_time" content="2022-11-15T13:45:33+00:00" />
                <meta property="article:modified_time" content="2023-05-25T15:43:15+00:00" />
                {(Array.isArray(faq.data)) ? <FaqSchema faq={faq.data} /> : '' }
                {breadcrumbs ? <BreadcrumbsSchema title={post.title} link={link} amp={amp}/>: ""}
                <link rel="icon" href="/favicon.png" />
                {langs.length <= 1 ? '' : post.mainVersion_id != null ? <XDefault mainID={mainID} slug={mainPost.slug} id={post.id} /> : <XDefault mainID={mainID} slug={post.slug} id={post.id} />}
                {/*post.bindings == '' && post.mainVersion_id != null ? alternativeVersions.map( item => (
                    <HrefLang id={post.id} slug={item.slug} lang={item.alternativeLang.attr} />
                )) : post.bindings == '' && post.mainVersion_id == null ? <HrefLang id={post.id} slug={post.slug} lang={category.attr} /> : customVersions.map(item => (<HrefLang id={post.id} slug={item.slug} lang={item.customLang.attr} />))*/}
                {post.mainVersion_id != null ? alternativeVersions.map( item => (
                    <HrefLang id={post.id} slug={item.slug} lang={item.alternativeLang.attr} />
                )) : <HrefLang id={post.id} slug={post.slug} lang={category.attr} />}
            </html>
        </Head>
    )
        
}
  
export default Heading;