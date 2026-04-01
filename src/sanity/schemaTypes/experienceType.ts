import { defineField, defineType } from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ 
      name: 'company', 
      title: 'Company Name', 
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({ 
      name: 'role', 
      title: 'Job Role', 
      type: 'string',
      validation: (rule) => rule.required() 
    }),
    defineField({ 
      name: 'date', 
      title: 'Date Range', 
      type: 'string',
      description: 'e.g., Jul 2025 - Present' 
    }),
    defineField({ 
      name: 'highlights', 
      title: 'Technical Highlights', 
      type: 'array', 
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(3).error('Keep it concise for the Bento grid (max 3).')
    }),
    defineField({
      name: 'colSpan',
      title: 'Grid Column Span',
      type: 'string',
      options: {
        list: [
          { title: '1 Column', value: 'md:col-span-1' },
          { title: '2 Columns', value: 'md:col-span-2' },
        ]
      },
      initialValue: 'md:col-span-1'
    }),
    defineField({
      name: 'rowSpan',
      title: 'Grid Row Span',
      type: 'string',
      options: {
        list: [
          { title: '1 Row', value: 'md:row-span-1' },
          { title: '2 Rows', value: 'md:row-span-2' },
        ]
      },
      initialValue: 'md:row-span-1'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort the cards in the grid (lower numbers appear first)'
    })
  ],
})