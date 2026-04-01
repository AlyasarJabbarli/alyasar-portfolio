import { type SchemaTypeDefinition } from 'sanity'
import { experienceType } from './experienceType'
import { projectType } from './projectType'
import { educationType } from './educationType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [experienceType, projectType, educationType],
}