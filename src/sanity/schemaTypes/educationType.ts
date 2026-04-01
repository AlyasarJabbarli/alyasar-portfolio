import { defineField, defineType } from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Education & Honors',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Degree / Certification Title', type: 'string' }),
    defineField({ name: 'institution', title: 'Institution', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'date', title: 'Date Range', type: 'string' }),
    defineField({ name: 'highlight', title: 'Achievement/Highlight', type: 'text' }),
    defineField({ 
      name: 'iconName', 
      title: 'Icon Name', 
      type: 'string',
      description: 'Use "GraduationCap", "Code", or "Award"',
      options: {
        list: ['GraduationCap', 'Code', 'Award']
      }
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ],
})