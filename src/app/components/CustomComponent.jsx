import { IoIosArrowDroprightCircle } from 'react-icons/io'
import BlurImage from './BlurImage'
import { imgUrl } from '../../../sanity/lib/image'
import InstagramEmbed from '@/app/components/InstagramEmbed'
import XEmbed from '@/app/components/XEmbed'

export const components = {
  types: {
    image: ({ value }) => {
      if (!value) return null
      return (
        <div className="w-full my-6 relative h-[300px] md:h-[450px]">
          <BlurImage
            src={imgUrl(value, 960)}
            alt={value?.alt || 'news image'}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="w-full h-auto object-contain rounded-lg"
          />
          {value?.caption && (
            <p className="text-center text-sm text-gray-600 mt-2">{value.caption}</p>
          )}
        </div>
      )
    },

    table: ({ value }) => {
      const rows = value?.rows || []
      const firstRow = rows[0]
      const remaining = rows.slice(1)
      return (
        <div className="w-full overflow-x-auto">
          <table className="table-fixed w-full border border-gray-300 mb-6 mt-4">
            <thead>
              <tr className="bg-gray-200">
                {firstRow?.cells?.length > 0 ? (
                  firstRow.cells.map((cell, i) => (
                    <th key={i} className="border border-gray-300 p-2 text-sm font-semibold text-left">
                      {cell}
                    </th>
                  ))
                ) : (
                  <th colSpan="100" className="text-center p-2">No data</th>
                )}
              </tr>
            </thead>
            <tbody>
              {remaining?.length > 0 ? (
                remaining.map((row, rowIndex) => (
                  <tr key={row._key || rowIndex}>
                    {row?.cells?.length > 0 ? (
                      row.cells.map((cell, i) => (
                        <td key={i} className="border border-gray-300 p-2 text-sm">{cell}</td>
                      ))
                    ) : (
                      <td colSpan="100" className="text-center p-2">No data</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="100" className="text-center p-2">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    },

    readAlso: ({ value }) => {
      if (!value?.href) return null
      return (
        <a
          href={value.href}
          className="block border-l-4 border-orange-500 pl-4 py-3 my-4 hover:bg-orange-50 transition rounded"
        >
          <span className="text-gray-500 mr-2">यह भी पढ़ें:</span>
          <span className="text-blue-700 font-medium">{value?.heading}</span>
        </a>
      )
    },
 

  instagramEmbed: ({ value }) => {
    if (!value?.url) return null
    return <InstagramEmbed value={value} />
    },
  
    xEmbed: ({ value }) => {
      if (!value?.url) return null
      return <XEmbed value={value} />
    },
  },
 

  block: {
    h1: ({ children }) => <h1 className="mt-4 mb-8 text-3xl font-bold text-gray-800">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-4 mb-2 text-2xl font-semibold text-gray-800">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-800">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-4 mb-2 text-lg font-semibold text-gray-800">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-4 mb-2 text-md font-semibold text-gray-800">{children}</h5>,
    h6: ({ children }) => <h6 className="mt-4 mb-2 font-semibold text-gray-800">{children}</h6>,
    normal: ({ children }) => <p className="mb-8 text-lg text-gray-800 pl-2">{children}</p>,
    blockquote: ({ children }) => <blockquote className="text-red-800 italic mt-3 mb-3 text-md">{children}</blockquote>,
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("/") ? "noreferrer noopener" : undefined
      return (
         <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {children}
        </a>
      )
    },
  },

  list: {
    bullet: ({ children }) => <ul className="leading-loose mt-4 ml-4 mb-6 list-outside">{children}</ul>,
    number: ({ children }) => <ol className="leading-loose list-decimal mt-4 list-outside">{children}</ol>,
    checkmarks: ({ children }) => <ol className="m-auto text-md">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li><IoIosArrowDroprightCircle className="inline-block mr-4" size={20} fill="#c4132a" />{children}</li>
    ),
    number: ({ children }) => <li className="ml-6">{children}</li>,
    checkmarks: ({ children }) => <li>{children}</li>,
  },
}