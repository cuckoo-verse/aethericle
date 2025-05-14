import { headers } from 'next/headers'

export async function useElectron() {
  const headersList = headers()
  return (await headersList).get('x-electron') === 'true'
}