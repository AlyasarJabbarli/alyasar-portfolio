import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ 
      name: 'tech', 
      title: 'Tech Stack', 
      type: 'array', 
      of: [{ type: 'string' }] 
    }),
    defineField({ name: 'link', title: 'Live Demo URL', type: 'url' }),
    defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ],
})