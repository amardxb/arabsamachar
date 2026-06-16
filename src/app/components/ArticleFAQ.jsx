'use client'

import { useState } from 'react'

export default function ArticleFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (!faqs || faqs.length === 0) return null

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }

  return (
    <section style={{ marginTop: '2.5rem' }}>

      {/* Google Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2 style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        अक्सर पूछे जाने वाले सवाल
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#fff'
          }}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              style={{
                width: '100%',
                textAlign: 'left',
                background: openIndex === i ? '#eff6ff' : 'none',
                border: 'none',
                padding: '1rem 1.25rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: openIndex === i ? '#1d4ed8' : '#111827',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'inherit'
              }}
            >
              <span>{faq.question}</span>
              <span style={{
                fontSize: '1.4rem',
                color: openIndex === i ? '#1d4ed8' : '#6b7280',
                flexShrink: 0,
                lineHeight: 1
              }}>
                {openIndex === i ? '−' : '+'}
              </span>
            </button>

            {openIndex === i && (
              <div style={{
                padding: '0.75rem 1.25rem 1rem',
                fontSize: '0.9rem',
                color: '#4b5563',
                lineHeight: '1.7',
                borderTop: '1px solid #e5e7eb'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}