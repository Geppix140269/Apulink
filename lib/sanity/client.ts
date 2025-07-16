// PATH: lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// Helper to get preview client for draft content
export function getPreviewClient(token?: string) {
  return client.withConfig({
    token,
    useCdn: false,
    ignoreBrowserTokenWarning: true,
  })
}
