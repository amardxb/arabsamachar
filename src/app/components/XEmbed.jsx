'use client'

import { useEffect, useRef } from 'react'

export default function XEmbed({ value }) {
    const { url } = value
    const ref = useRef(null)

    useEffect(() => {
        if (!url || !ref.current) return

        const renderTweet = () => {
            ref.current.innerHTML = `
        <blockquote class="twitter-tweet">
          <a href="${url}"></a>
        </blockquote>
      `

            window.twttr.widgets.load(ref.current)
        }

        if (window.twttr?.widgets) {
            renderTweet()
            return
        }

        const existingScript = document.querySelector(
            'script[src="https://platform.twitter.com/widgets.js"]'
        )

        if (existingScript) {
            existingScript.addEventListener('load', renderTweet)
            return
        }

        const script = document.createElement('script')
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.onload = renderTweet
        document.body.appendChild(script)

        return () => {
            script.onload = null
        }
    }, [url])

    return (
        <div className="my-6 flex justify-center">
            <div ref={ref} className="w-full max-w-[550px]" />
        </div>
    )
}