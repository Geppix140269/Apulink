// PATH: sanity/schemas/translation.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'translation',
  title: 'Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier (e.g., submit, required, email_invalid)',
    }),
    defineField({
      name: 'namespace',
      title: 'Namespace',
      type: 'string',
      options: {
        list: [
          { title: 'Common', value: 'common' },
          { title: 'Form', value: 'form' },
          { title: 'Validation', value: 'validation' },
          { title: 'Navigation', value: 'navigation' },
          { title: 'Messages', value: 'messages' },
          { title: 'Errors', value: 'errors' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'common',
    }),
    defineField({
      name: 'value',
      title: 'Translation Value',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'it',
          title: 'Italian',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Context Description',
      type: 'text',
      rows: 2,
      description: 'Where/how this translation is used (for translators)',
    }),
    defineField({
      name: 'variables',
      title: 'Variables',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of variables used in the translation (e.g., {{name}}, {{count}})',
    }),
    defineField({
      name: 'maxLength',
      title: 'Maximum Length',
      type: 'number',
      description: 'Maximum character length (for UI constraints)',
    }),
  ],
  preview: {
    select: {
      key: 'key',
      namespace: 'namespace',
      en: 'value.en',
      it: 'value.it',
    },
    prepare({ key, namespace, en, it }) {
      const enPreview = en?.length > 50 ? `${en.substring(0, 50)}...` : en
      const itPreview = it?.length > 50 ? `${it.substring(0, 50)}...` : it
      return {
        title: `${namespace}.${key}`,
        subtitle: `EN: ${enPreview} | IT: ${itPreview}`,
      }
    },
  },
  orderings: [
    {
      title: 'Namespace, Key',
      name: 'namespaceKeyAsc',
      by: [
        { field: 'namespace', direction: 'asc' },
        { field: 'key', direction: 'asc' }
      ]
    }
  ],
})
