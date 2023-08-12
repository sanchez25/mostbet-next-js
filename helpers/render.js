import Jimp from "jimp"
import ImageWrap from "@/components/ImageWrap"
import { renderToString } from 'react-dom/server'

export default async function renderCustomHTML(post, amp, mainLink) {

    let HTML = ''
    
    const postObject = post ? JSON.parse(post.content) : {}

    for (let block of postObject.blocks) {
        
        switch (block.type) {
            
            case 'header':
                
                HTML += `<h${block.data.level} id="${block.data.text.replace(/ /g,'-').replace('?','').replace('!','').replace(',','').replace(':','').toLowerCase()}">${block.data.text}</h${block.data.level}>`
                
                break;
            
            case 'button':
                
                let [text, btnClass, splitBtn] = block.data.button.split('/')
                let ampLink = `tap:AMP.navigateTo(url='${mainLink}&split=${splitBtn}')`
                amp 
                    ? HTML += `<div class="button-block"><button class="btn-${btnClass}-${post.page_key}" on=${ampLink}>${text}</button></div>`
                    : HTML += `<div class="button-block"><button class="btn-${btnClass}-${post.page_key}" data-split=${splitBtn}>${text}</button></div>`
                break;
            
            case 'paragraph':
                
                HTML += `<p>${block.data.text}</p>`
                
                break;
            
            case 'image':

                let jimp_img = block.data.file.url.replace('.webp', '').replace('/webp', '')

                await Jimp.read(`${process.env.NEXT_PUBLIC_DEV}${jimp_img}`).then((img) => {

                    let imageRatio = img.bitmap.height / img.bitmap.width
                    let imageType = (img.bitmap.height >= img.bitmap.height) ? "horizontal" : "vertical";
                    let imageData = (block.data.caption !== undefined) ? block.data.caption.split('|') : []
                    let [caption, alt,  title] = imageData
                    
                    let imgComponent = renderToString(
                        <ImageWrap 
                            imgsrc={`${block.data.file.url.replace('.jpg','').replace('.png','')}`} 
                            imgalt={alt ? alt.trim() : ''} 
                            imgheight={img.bitmap.height} 
                            imgwidth={img.bitmap.width} 
                            imgclass={`general-image ${imageType}`}
                            fill={true}
                        />
                    )


                    HTML += `<figure class="${imageType}">${imgComponent}<figcaption>${caption.trim()}</figcaption></figure>`
                })
                
                break;

            case 'list':
                
                let listItems = block.data.items
                let listType = (block.data.style === 'unordered') ? 'ul' : 'ol'

                HTML += `<${listType} class="general-${listType}">`
                
                for (let item of listItems) {
                    HTML += `<li>${item}</li>`
                }
                
                HTML += `</${listType}>`
                
                break;
            
            case 'table':
                
                let tableItems = block.data.content
                let withHeadings = block.data.withHeadings

                withHeadings ? HTML += '<table class="general-table"><thead><tr>' : HTML += '<table class="general-table">'
                
                if (withHeadings) {
                    for (let i = 0; i < tableItems.length; i++) {
                        if (i > 0) {
                            break
                        }
                        for (let item of tableItems[i]) {
                            HTML += `<th>${item}</th>`
                        }
                    }
                }

                withHeadings ? HTML += '</tr></thead>' : ''
                HTML += '<tbody class="general-tbody">'
                
                for (let i = withHeadings ? 1 : 0; i < tableItems.length; i++) {
                    HTML += '<tr class="general-tr">'
                    for (let item of tableItems[i]) {
                        HTML += `<td class="general-td">${item}</td>`
                    }
                    HTML += '</tr>'
                }
                
                HTML += '</tbody></table>'
                
                break;
            
            case 'faq':
                
                let faqList = block.data
                
                if (Array.isArray(faqList)) {
                    HTML += '<div class="faq-container">'
                    for (let item of faqList) {
                        HTML += `<div class="faq-item"><input type="checkbox" class="toggle" aria-label="question"><p class="faq-question">${item.question}</p><div class="icon"></div><p class="faq-answer">${item.answer}</p></div>`
                    }
                    HTML += '</div>'
                }

                break;
            
            case 'raw':
                
                break;
           
            case 'columns':
                
                HTML += '<div class="columns">'
                
                for (let items of block.data.cols) {
                    HTML += '<div class="column">'
                    for (let item of items.blocks) {
                        if (item.type == 'header') {
                            HTML += `<h${item.data.level} class="column-header">${item.data.text}</h${item.data.level}>`
                        }
                        else if (item.type == 'paragraph') {
                            HTML += `<p class="column-p">${item.data.text}</p>`
                        }
                        else if (item.type == 'image') {

                            let jimp_img = item.data.file.url.replace('.webp', '').replace('/webp', '')

                            await Jimp.read(`${process.env.NEXT_PUBLIC_DEV}${jimp_img}`).then((img) => {

                                let imageType = (img.bitmap.width >= img.bitmap.height) ? "horizontal" : "vertical"; 
                                let imageData = (block.data.caption !== undefined) ? block.data.caption.split('|') : []
                                let [caption, alt,  title] = imageData

                                let imgComponent = renderToString(
                                    <ImageWrap 
                                        imgsrc={`${block.data.file.url}`} 
                                        imgalt={alt ? alt.trim() : ''} 
                                        imgheight={img.bitmap.height} 
                                        imgwidth={img.bitmap.width} 
                                        imgclass={`general-image ${imageType}`}
                                    />
                                )

                                HTML +=  `<figure>
                                         ${imgComponent}
                                     <figcaption>${caption.trim()}</figcaption>
                                </figure>`
                            })
                        }
                    }
                    HTML += '</div>'
                }

                HTML += '</div>'
                
                break;
            
            case 'toc':
                
                HTML += '<div class="table_of_contents"><input id="collapsible" class="toggle" type="checkbox"><label for="collapsible" class="lbl-toggle">İçindekiler:</label><div class="table_box">'
                
                for (let item of block.data) {

                    let replaced = item.heading.replace(/ /g,'-').replace('?','').replace('!','').replace(',','').replace(':','').toLowerCase()

                    HTML += amp 
                        ? `<a class="table_link" href="#${replaced}">${item.heading}</a>`
                        : `<a class="table_link" href="#${replaced}" data-href="#${replaced}">${item.heading}</a>`
                }
                
                HTML += '</div></div>'
                
                break;
        }

    }

    return HTML
}