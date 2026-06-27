export default {
  name: 'goldPrice',
  title: 'Gold Price',
  type: 'document',
  fields: [
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: ['uae', 'qatar', 'saudi', 'oman', 'kuwait', 'bahrain'],
      },
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string', // YYYY-MM-DD format
    },
    {
      name: 'gold24k',
      title: '24K Price',
      type: 'number',
    },
    {
      name: 'gold22k',
      title: '22K Price',
      type: 'number',
    },
    {
      name: 'gold21k',
      title: '21K Price',
      type: 'number',
    },
    {
      name: 'gold18k',
      title: '18K Price',
      type: 'number',
    },
    {
      name: 'gold14k',
      title: '14K Price',
      type: 'number',
    },
    {
      name: 'silver999',
      title: 'Silver 999 Price (per Kg)',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'country',
      subtitle: 'date',
    },
  },
}