// schemas/author.js
export default {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Profile Photo',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'role',
            title: 'Role / Designation',
            type: 'string',
            description: 'e.g. Senior Correspondent, Editor',
        },
        {
            name: 'bio',
            title: 'Short Bio',
            type: 'text',
            rows: 4,
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'twitter', type: 'url', title: 'Twitter/X' },
                { name: 'linkedin', type: 'url', title: 'LinkedIn' },
                { name: 'facebook', type: 'url', title: 'Facebook' },
            ],
        },
    ],
    preview: {
        select: { title: 'name', media: 'image' },
    },
};