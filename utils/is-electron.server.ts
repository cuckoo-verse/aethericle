import { headers } from 'next/headers'

/**
 * Checks if the code is running in an Electron environment on the server-side.
 * This should only be used in Server Components.
 */
export async function isElectronServer() {
  const headersList = await headers()
  return headersList.get('x-electron') === 'true'
} 