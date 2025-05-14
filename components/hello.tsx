'use client'

import { useLocale } from "next-intl"
import { useDisclosure } from "@heroui/modal"
import { Button } from "@heroui/button"
import { AuthModal } from "@cuckoo-verse/auth"
import Link from "next/link"
import { useElectron } from '@/hooks/use-electron'
import { useWindowManager } from '@/hooks/use-window-manager'

export function Hello() {
  const locale = useLocale()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const isElectron = useElectron()
  const { minimize, close, isMinimized } = useWindowManager()

  return (
    <div className="h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Hello Component</h1>
        <p className="mb-4">Running in: {isElectron ? 'Electron' : 'Browser'}</p>
        {isElectron && (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button
                onPress={minimize}
              >
                {isMinimized ? '还原' : '最小化'}
              </Button>
              <Button
                onPress={close}
              >
                关闭
              </Button>
            </div>

          </div>
        )}
        <Button onPress={onOpen}>Open Modal</Button>
        <AuthModal
          isDismissable={true}
          isOpen={isOpen}
          onOpen={onOpen}
          onChange={onOpenChange}
          locale={locale}
        />
        <Link href="/waitlist">HERE IS SOME LINK</Link>
      </div>
    </div>
  )
}