export const news = {
  name: "news",
  type: "document",
  title: "News",

  fields: [
    {
      name: "title",
      type: "string",
      title: "News Title",
      validation: (Rule) =>
        Rule.required().min(60).max(200),
    },

    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 100 },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) =>
        Rule.required().min(100).max(300),
    },

    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { value: "breaking", title: "Breaking" },
          { value: "national", title: "National" },
          { value: "world", title: "World" },
          { value: "entertainment", title: "Entertainment" },
          { value: "lifestyle", title: "Lifestyle" },
          { value: "technology", title: "Technology" },
          { value: "finance", title: "Finance" },
          { value: "auto", title: "Auto" },
          { value: "sports", title: "Sports" },
        ],
      },
      initialValue: "breaking",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "heading",
      type: "string",
      title: "H1 Heading",
      validation: (Rule) =>
        Rule.required().min(80).max(120),
    },

    {
      name: "tag",
      type: "string",
      title: "Tag",
      validation: (Rule) =>
        Rule.required().min(3).max(15),
    },

    {
      name: "isBreaking",
      type: "boolean",
      title: "Breaking",
      initialValue: false,
    },

    {
      name: "date",
      type: "datetime",
      title: "Date",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "author",
      type: "string",
      title: "Author",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "intro",
      type: "text",
      title: "Intro",
      validation: (Rule) =>
        Rule.required().min(100).max(300),
    },

    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    {
      name: "highlight",
      type: "array",
      title: "Highlights",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(3),
    },

    // =========================
    // ✅ CONTENT (FIXED VERSION)
    // =========================
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        // 🟢 Normal paragraph block
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },

        // 📌 READ ALSO (SAFE BLOCK VERSION)
        {
          type: "object",
          name: "readAlso",
          title: "Read Also",
          fields: [
            {
              name: "heading",
              type: "string",
              title: "Heading",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required(),
            },
          ],

          preview: {
            select: {
              title: "heading",
            },
            prepare({ title }) {
              return {
                title: "📌 Read Also",
                subtitle: title,
              }
            },
          },
        },
        {
          type: "object",
          name: "instagramEmbed",
          title: "Instagram Embed",
          fields: [
            {
              name: "url",
              type: "url",
              title: "Instagram Post URL",
              description: "e.g. https://www.instagram.com/p/ABC123xyz/",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "url",
            },
            prepare({ title }) {
              return {
                title: "📸 Instagram Embed",
                subtitle: title,
              }
            },
          },
        },

        // 🖼 image
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
            },
            {
              name: "caption",
              type: "string",
            },
          ],
        },

        // 📊 table
        {
          name: "table",
          type: "table",
        },
      ],
    },
    // =========================
// ✅ FAQ SECTION (OPTIONAL)
// =========================
{
  name: 'faq',
  title: 'FAQ — अक्सर पूछे जाने वाले सवाल (Optional)',
  type: 'array',
  of: [
    {
      type: 'object',
      title: 'सवाल-जवाब',
      fields: [
        {
          name: 'question',
          title: 'सवाल (Question)',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'answer',
          title: 'जवाब (Answer)',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.required()
        }
      ],
      preview: {
        select: { title: 'question' },
        prepare({ title }) {
          return { title: title || 'नया सवाल' }
        }
      }
    }
  ]
},

  ],
  
}