// components/InstagramEmbed.jsx
'use client'

export default function InstagramEmbed({ value }) {
    const { url } = value
    if (!url) return null

    const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?]+)/)
    const postId = match?.[1]

    if (!postId) return null

    const embedUrl = `https://www.instagram.com/p/${postId}/embed/`

    return (
        <div className="my-6 flex justify-center">
            <iframe
                src={embedUrl}
                className="w-full max-w-[540px] rounded-md border border-gray-200  md:h-[680px] p-1"
                height="680"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                loading="lazy"
                title="Instagram Post"
            />
        </div>
    )
}