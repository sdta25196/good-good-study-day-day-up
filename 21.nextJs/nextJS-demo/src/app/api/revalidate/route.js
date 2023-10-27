import { NextRequest } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function GET(request) {
  const secret = request.nextUrl.searchParams.get('secret')
  const tag = request.nextUrl.searchParams.get('tag')
  const path = request.nextUrl.searchParams.get('path')
  if (path) {
    revalidatePath(path, 'page');
  }
  if (tag) {
    revalidateTag(tag)
  }
  // if (secret !== process.env.MY_SECRET_TOKEN) {
  //   return Response.json({ message: 'Invalid secret' }, { status: 401 })
  // }

  // if (!tag) {
  //   return Response.json({ message: 'Missing tag param' }, { status: 400 })
  // }


  return Response.json({ revalidated: true, now: Date.now() })
}

// export async function GET(request) {
//   return new Response('Hello, Next.js!', {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   })
// }