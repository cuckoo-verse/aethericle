import { getTranslations } from "next-intl/server"
import { Hello } from "@/components/hello"

export default async function Home() {
  const t = await getTranslations("Home")

  return (
    <div className="flex flex-col gap-2">
      <h3>{t('recently-read')}</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="w-full h-20 bg-content2 rounded" />
        <div className="w-full h-20 bg-content2 rounded-lg" />
        <div className="w-full h-20 bg-content2 rounded-lg" />
        <div className="w-full h-20 bg-content2 rounded-lg" />
        <div className="w-full h-20 bg-content2 rounded-lg" />
        <div className="w-full h-20 bg-content2 rounded-lg" />
      </div>

      <h1>{t('discover')}</h1>
      <div className="w-full h-30 bg-content2 rounded-lg" />

      <Hello />
    </div>
  )
}
