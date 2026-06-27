export default {
  name: 'weatherData',
  title: 'Weather Data',
  type: 'document',
  fields: [
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'UAE', value: 'uae' },
          { title: 'Qatar', value: 'qatar' },
          { title: 'Saudi Arabia', value: 'saudi' },
          { title: 'Kuwait', value: 'kuwait' },
          { title: 'Bahrain', value: 'bahrain' },
          { title: 'Oman', value: 'oman' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'fetchedAt',
      title: 'Fetched At (timestamp)',
      type: 'datetime',
    },
    { name: 'temperature', title: 'Temperature (°C)', type: 'number' },
    { name: 'apparentTemperature', title: 'Feels Like (°C)', type: 'number' },
    { name: 'humidity', title: 'Humidity (%)', type: 'number' },
    { name: 'windSpeed', title: 'Wind Speed (km/h)', type: 'number' },
    { name: 'visibility', title: 'Visibility (km)', type: 'number' },
    { name: 'weatherCode', title: 'WMO Weather Code', type: 'number' },
    { name: 'sunrise', title: 'Sunrise', type: 'string' },
    { name: 'sunset', title: 'Sunset', type: 'string' },
  ],
  preview: {
    select: { title: 'country', subtitle: 'date' },
  },
};