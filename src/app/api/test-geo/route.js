export async function GET(req) {
  const country = req.headers.get('x-vercel-ip-country')
  return Response.json({ country })
}
