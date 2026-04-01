import { type SchemaTypeDefinition } from 'sanity'
import { experienceType } from './experienceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [experienceType],
}