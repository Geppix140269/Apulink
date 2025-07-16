// PATH: sanity/schemas/category.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'name',
      title: 'Category Name',
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
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'it',
          title: 'Italian',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty for top-level categories',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon name (e.g., 🏭 or manufacturing)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this category is currently available for selection',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'name.it',
      parent: 'parent.name.en',
      icon: 'icon',
    },
    prepare({ title, subtitle, parent, icon }) {
      return {
        title: `${icon || ''} ${title || 'Untitled'}`,
        subtitle: parent ? `${parent} > ${subtitle}` : subtitle,
      }
    },
  },
})
