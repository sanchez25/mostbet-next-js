import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${posts
       .map(({ slug, updated_at }) => {

        let date = new Date(parseInt(updated_at))

         return `
       <url>
          <loc>${`${process.env.NEXT_PUBLIC_HOST}/${ slug != '/' ? slug + '/' : ''}`}</loc>
          <lastmod>${ formatDate(date) }</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
       </url>
     `;
       })
       .join('')}</urlset>
 `;
}

export async function getServerSideProps({ res }) {

    const posts = await prisma.post.findMany() || null

    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml')

    res.write(sitemap)
    res.end()

    return {
        props: {
            posts: posts
        }
    }
}

function SiteMap() {}

export default SiteMap;
