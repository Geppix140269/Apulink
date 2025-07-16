// PATH: sanity/schemas/region.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'region',
  title: 'Region',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Region Code',
      type: 'string',
      validation: (Rule) => Rule.required().uppercase().min(2).max(3),
      description: 'ISO country/region code (e.g., IT, US, EU)',
    }),
    defineField({
      name: 'name',
      title: 'Region Name',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'it',
          title: 'Italian',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'type',
      title: 'Region Type',
      type: 'string',
      options: {
        list: [
          { title: 'Country', value: 'country' },
          { title: 'State/Province', value: 'state' },
          { title: 'Region', value: 'region' },
          { title: 'City', value: 'city' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Region',
      type: 'reference',
      to: [{ type: 'region' }],
      description: 'For hierarchical regions (e.g., city within country)',
    }),
    defineField({
      name: 'taxIdFormat',
      title: 'Tax ID Format',
      type: 'object',
      description: 'Validation rules for tax IDs in this region',
      fields: [
        defineField({
          name: 'pattern',
          title: 'Regex Pattern',
          type: 'string',
          description: 'Regular expression for validation (e.g., ^IT\\d{11}$ for Italy)',
        }),
        defineField({
          name: 'example',
          title: 'Example Format',
          type: 'string',
          description: 'Example: IT12345678901',
        }),
        defineField({
          name: 'description',
          title: 'Format Description',
          type: 'object',
          fields: [
            defineField({
              name: 'en',
              title: 'English',
              type: 'string',
              description: 'e.g., "11 digits preceded by IT"',
            }),
            defineField({
              name: 'it',
              title: 'Italian',
              type: 'string',
              description: 'e.g., "11 cifre precedute da IT"',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'phonePrefix',
      title: 'Phone Prefix',
      type: 'string',
      description: 'International dialing code (e.g., +39 for Italy)',
    }),
    defineField({
      name: 'postalCodeFormat',
      title: 'Postal Code Format',
      type: 'object',
      description: 'Validation rules for postal codes',
      fields: [
        defineField({
          name: 'pattern',
          title: 'Regex Pattern',
          type: 'string',
          description: 'e.g., ^\\d{5}$ for 5-digit codes',
        }),
        defineField({
          name: 'example',
          title: 'Example',
          type: 'string',
          description: 'e.g., 00100',
        }),
      ],
    }),
    defineField({
      name: 'flag',
      title: 'Flag Emoji',
      type: 'string',
      description: 'Unicode flag emoji (e.g., 🇮🇹)',
    }),
    defineField({
      name: 'currency',
      title: 'Currency Code',
      type: 'string',
      description: 'ISO 4217 currency code (e.g., EUR, USD)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this region is available for selection',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'code',
      flag: 'flag',
      type: 'type',
    },
    prepare({ title, subtitle, flag, type }) {
      return {
        title: `${flag || ''} ${title || 'Untitled'}`,
        subtitle: `${subtitle} (${type})`,
      }
    },
  },
})
