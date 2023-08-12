import getCSS from "./generateCSS"
import { PrismaClient } from '@prisma/client'
import renderCustomHTML from "./render"
import axios from "axios";

export default async function generate(amp, slug){

    const prisma = new PrismaClient()
    const style = getCSS()
    const options = await prisma.options.findMany()
    const mainLink = options.find(x => x.key == 'mainLink').value
    const mainID = parseInt(options.find(x => x.key == 'mainPageID').value)
    const sitename = options.find(x => x.key == 'sitename').value
    const mainLang = options.find(x => x.key == 'mainLang').value

    const post = slug
      ? await prisma.post.findFirst({where: {slug: slug}})
      : await prisma.post.findUnique({where: {id: mainID}})

    //console.log("Post", post)
    if (!post) {
        return false
    }

    let category = ""
    if(post.language_id != null) {
        category = await prisma.lang.findUnique({
            where: {
                id: post.language_id
            }
        })
    }

    let menu = ""
    if(category.menu_id != null) {
        menu = await prisma.menu.findUnique({
            where: {
                id: category.menu_id
            }
        })
    }

    let banner = ""
    if(category.banner_id != null) {
        banner = await prisma.banner.findUnique({
            where: {
                id: category.banner_id
            }
        })
    }

    let sidebar = ""
    if(category.sidebar_id != null) {
        sidebar = await prisma.sidebar.findUnique({
            where: {
                id: category.sidebar_id
            }
        })
    }

    let buttons = ""
    if(category.buttons_id != null) {
        buttons = await prisma.buttons.findUnique({
            where: {
                id: category.buttons_id
            }
        })
    }
 
    const rendered = await renderCustomHTML(post, amp, mainLink)

    let langs = await prisma.lang.findMany()
    langs = langs.filter(lang => lang.id != category.id)
    for(let item of langs) {
        let mainSlug = item.slug
        if(item.id == mainLang) {
            mainSlug = '/'
        } else {
            mainSlug = item.slug
        }
        item["mainSlug"] = mainSlug
    }

    let alternativeVersions = await prisma.post.findMany({
        where: {
            mainVersion_id: post.mainVersion_id
        }
    })
    for(let item of alternativeVersions) {
        let alternativeLangId = item.language_id
        let alternativeLang = await prisma.lang.findFirst({
            where: {
                id: alternativeLangId
            }
        })
        item["alternativeLang"] = alternativeLang
    }
    alternativeVersions = alternativeVersions.filter(lang => lang.language_id != category.id)

    let mainPost = ""
    if(post.mainVersion_id != null) {
        mainPost = await prisma.post.findUnique({
            where: {
                id: post.mainVersion_id
            }
        })
    }

    let customVersions = []
    /*if(post.bindings != null) {
        for(let item of post.bindings.split(',')) {
            if(item == '') {
                continue
            }
            let customVersionsLang = await prisma.post.findFirst({
                where: {
                    id: parseInt(item)
                }
            })
            if(customVersionsLang != null) {
                let customLangId = customVersionsLang.language_id
                let customLang = await prisma.lang.findFirst({
                    where: {
                        id: customLangId
                    }
                })
                customLang["customLang"] = customLang
                customVersions.push(customVersionsLang)
            }
        }
    }*/

    const generatedProps = {
       mainLink: mainLink,
       mainID: mainID,
       post: JSON.parse(JSON.stringify(post)),
       category: JSON.parse(JSON.stringify(category)),
       menu: menu,
       rendered: rendered,
       ampStyle: style,
       amp: amp,
       sitename: sitename,
       slug: post.slug,
       langs: langs,
       alternativeVersions: JSON.parse(JSON.stringify(alternativeVersions)),
       mainPost: JSON.parse(JSON.stringify(mainPost)),
       customVersions: JSON.parse(JSON.stringify(customVersions)),
       mainLang: mainLang,
       banner: banner,
       sidebar: sidebar,
       buttons: buttons
    }

    return generatedProps
 
 }