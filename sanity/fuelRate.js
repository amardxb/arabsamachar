export default {
    name: 'fuelRate',
    title: 'Fuel Rate',
    type: 'document',
    fields: [
        {
            name: 'country',
            title: 'Country',
            type: 'string',
            options: {
                list: [
                    { title: 'UAE (AED)', value: 'uae' },
                    { title: 'Saudi Arabia (SAR)', value: 'saudi' },
                    { title: 'Qatar (QAR)', value: 'qatar' },
                    { title: 'Kuwait (Fils)', value: 'kuwait' },
                    { title: 'Oman (BZS)', value: 'oman' },
                    { title: 'Bahrain (Fils)', value: 'bahrain' },
                ],
                layout: 'radio',
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'month',
            title: 'Month (1-12)',
            type: 'number',
            validation: Rule => Rule.required().min(1).max(12),
        },
        {
            name: 'year',
            title: 'Year',
            type: 'number',
            validation: Rule => Rule.required().min(2024),
        },

        // ── UAE ──────────────────────────────
        {
            name: 'uae_super98',
            title: 'Super 98 (AED/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'uae',
        },
        {
            name: 'uae_special95',
            title: 'Special 95 (AED/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'uae',
        },
        {
            name: 'uae_eplus91',
            title: 'E-Plus 91 (AED/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'uae',
        },
        {
            name: 'uae_diesel',
            title: 'Diesel (AED/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'uae',
        },

        // ── SAUDI ────────────────────────────
        {
            name: 'saudi_gasoline98',
            title: 'Gasoline 98 (SAR/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'saudi',
        },
        {
            name: 'saudi_super95',
            title: 'Super 95 (SAR/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'saudi',
        },
        {
            name: 'saudi_premium91',
            title: 'Premium 91 (SAR/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'saudi',
        },
        {
            name: 'saudi_diesel',
            title: 'Diesel (SAR/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'saudi',
        },

        // ── QATAR ────────────────────────────
        {
            name: 'qatar_super95',
            title: 'Super 95 (QAR/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'qatar',
        },
        {
            name: 'qatar_premium91',
            title: 'Premium 91 (QAR/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'qatar',
        },
        {
            name: 'qatar_diesel',
            title: 'Diesel (QAR/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'qatar',
        },

        // ── KUWAIT ───────────────────────────
        {
            name: 'kuwait_ultra98',
            title: 'Ultra 98 (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'kuwait',
        },
        {
            name: 'kuwait_super95',
            title: 'Super 95 (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'kuwait',
        },
        {
            name: 'kuwait_premium91',
            title: 'Premium 91 (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'kuwait',
        },
        {
            name: 'kuwait_diesel',
            title: 'Diesel (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'kuwait',
        },

        // ── OMAN ─────────────────────────────
        {
            name: 'oman_mogas98',
            title: 'Mogas 98 (Baisa/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'oman',
        },
        {
            name: 'oman_mogas95',
            title: 'Mogas 95 (Baisa/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'oman',
        },
        {
            name: 'oman_mogas91',
            title: 'Mogas 91 (Baisa/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'oman',
        },
        {
            name: 'oman_diesel',
            title: 'Diesel (Baisa/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'oman',
        },

        // ── BAHRAIN ──────────────────────────
        {
            name: 'bahrain_super98',
            title: 'Super 98 (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'bahrain',
        },
        {
            name: 'bahrain_mumtaz95',
            title: 'Mumtaz 95 (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'bahrain',
        },
        {
            name: 'bahrain_jayyid91',
            title: 'Jayyid 91 (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'bahrain',
        },
        {
            name: 'bahrain_diesel',
            title: 'Diesel (Fils/Ltr)',
            type: 'number',
            hidden: ({ document }) => document?.country !== 'bahrain',
        },
    ],

    preview: {
        select: {
            country: 'country',
            month: 'month',
            year: 'year',
        },
        prepare({ country, month, year }) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const flags = {
                uae: '🇦🇪', saudi: '🇸🇦', qatar: '🇶🇦',
                kuwait: '🇰🇼', oman: '🇴🇲', bahrain: '🇧🇭'
            }
            return {
                title: `${flags[country] || ''} ${country?.toUpperCase()} — ${months[month - 1]} ${year}`,
            }
        },
    },
}