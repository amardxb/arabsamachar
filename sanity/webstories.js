export const webstories = {
    name: "webstories",
    type: "document",
    title: "Webstories",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Web Story Title",
      },
      {
        name: "description",
        type: "string",
        title: "Web Story Description",        
      },
      {
        name: "slug",
        type: "slug",
        title: "Slug of Web story",
        options: {
          source: "title",
          maxLength: 60,
        },        
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
            { value: "sports", title: "Games" },
          ],
        },
        initialValue: "lifestyle", // Default value set to "home"        
      },       
      {
        name: "imagesWithContent",
        title: "Images with Content",
        type: "array",
        of: [
          {
            type: "object",
            title: "Image with Content",
            fields: [
              {
                name: "image",
                type: "image",
                title: "Image"
              },
              {
                name: "content",
                type: "string",
                title: "Content"
              },
              {
                name: "alt",
                type: "string",
                title: "Alteration Text"
              }
            ]
          }
        ]
      }   
    ]
    }