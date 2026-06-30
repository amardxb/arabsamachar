export const revalidate = 60

export async function GET(req) {
    const lat = req.headers.get('x-vercel-ip-latitude')
    const lng = req.headers.get('x-vercel-ip-longitude')
    const rawCity = req.headers.get('x-vercel-ip-city')
    const city = rawCity ? decodeURIComponent(rawCity) : null

    const latitude = lat || '21.4225'
    const longitude = lng || '39.8262'

    const today = new Date()
    const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`

    try {
        const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=4`
        const res = await fetch(url, { next: { revalidate: 60 } })
        const data = await res.json()

        if (data.code !== 200) {
            return Response.json({ error: 'Failed to fetch' }, { status: 500 })
        }

        return Response.json({
            city,            
            timings: data.data.timings,
        })
    } catch (err) {
        return Response.json({ error: 'Failed to fetch' }, { status: 500 })
    }
}