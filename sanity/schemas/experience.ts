// sanity/schemas/experience.ts
export default {
    name: 'experience',
    type: 'document',
    fields: [
      { name: 'company', type: 'string' }, // e.g., "Inci Group" 
      { name: 'role', type: 'string' },    // e.g., "Software Engineer" 
      { name: 'duration', type: 'string' },
      { name: 'metrics', type: 'array', of: [{ type: 'string' }] }, // "Reduced LCP by X%" 
      { name: 'techStack', type: 'array', of: [{ type: 'string' }] },
    ]
  }