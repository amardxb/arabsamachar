export default {
  name: "exchangeRate",
  title: "Exchange Rate",
  type: "document",

  fields: [
    {
      name: "country",
      title: "Country",
      type: "string",
      description: "Example: uae, qatar, oman",
      options: {
        list: ["uae", "qatar", "saudi", "oman", "kuwait", "bahrain"],
      },
    },

    {
      name: "date",
      title: "Date",
      type: "string",
      description: "Format: YYYY-MM-DD (e.g. 2026-06-22)"
    },

    {
      name: "slot",
      title: "Time Slot",
      type: "string",
      description: "morning | evening",
      options: {
        list: [
          { title: "Morning", value: "morning" },
          { title: "Evening", value: "evening" },
        ]
      }
    },

    {
      name: "rates",
      title: "Exchange Rates",
      type: "object",
      fields: [
        {
          name: "INR",
          title: "INR (Indian Rupee)",
          type: "number"
        },
        {
          name: "PKR",
          title: "PKR (Pakistani Rupee)",
          type: "number"
        },
        {
          name: "PHP",
          title: "PHP (Philippine Peso)",
          type: "number"
        },
        {
          name: "LKR",
          title: "LKR (Sri Lankan Rupee)",
          type: "number"
        },
        {
          name: "NPR",
          title: "NPR (Nepali Rupee)",
          type: "number"
        },
        {
          name: "BDT",
          title: "BDT (Bangladeshi Taka)",
          type: "number"
        }
      ]
    }
  ],

  preview: {
    select: {
      title: "country",
      subtitle: "date",
    },
  },
}