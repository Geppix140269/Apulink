export const metadata = {
  title: 'My Apulink Dashboard',
  description: 'Manage your Italian property investments'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea'
}

export default function MyApulinkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
