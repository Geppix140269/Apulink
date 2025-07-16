// PATH: sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Supplier Platform CMS',
  
  projectId,
  dataset,
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Translations')
              .child(
                S.list()
                  .title('Translations by Namespace')
                  .items([
                    S.listItem()
                      .title('Common')
                      .child(
                        S.documentList()
                          .title('Common Translations')
                          .filter('_type == "translation" && namespace == "common"')
                      ),
                    S.listItem()
                      .title('Form')
                      .child(
                        S.documentList()
                          .title('Form Translations')
                          .filter('_type == "translation" && namespace == "form"')
                      ),
                    S.listItem()
                      .title('Validation')
                      .child(
                        S.documentList()
                          .title('Validation Translations')
                          .filter('_type == "translation" && namespace == "validation"')
                      ),
                    S.listItem()
                      .title('Navigation')
                      .child(
                        S.documentList()
                          .title('Navigation Translations')
                          .filter('_type == "translation" && namespace == "navigation"')
                      ),
                    S.listItem()
                      .title('Messages')
                      .child(
                        S.documentList()
                          .title('Message Translations')
                          .filter('_type == "translation" && namespace == "messages"')
                      ),
                    S.listItem()
                      .title('Errors')
                      .child(
                        S.documentList()
                          .title('Error Translations')
                          .filter('_type == "translation" && namespace == "errors"')
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Categories')
              .child(
                S.documentList()
                  .title('All Categories')
                  .filter('_type == "category"')
              ),
            S.listItem()
              .title('Regions')
              .child(
                S.list()
                  .title('Regions by Type')
                  .items([
                    S.listItem()
                      .title('Countries')
                      .child(
                        S.documentList()
                          .title('Countries')
                          .filter('_type == "region" && type == "country"')
                      ),
                    S.listItem()
                      .title('States/Provinces')
                      .child(
                        S.documentList()
                          .title('States/Provinces')
                          .filter('_type == "region" && type == "state"')
                      ),
                    S.listItem()
                      .title('Cities')
                      .child(
                        S.documentList()
                          .title('Cities')
                          .filter('_type == "region" && type == "city"')
                      ),
                  ])
              ),
          ])
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
})
