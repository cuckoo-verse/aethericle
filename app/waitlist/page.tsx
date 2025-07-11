"use client"

import Image from "next/image"
import type React from "react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Loader2 } from "lucide-react"

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function SocialIcon({
  href,
  "aria-label": ariaLabel,
  icon,
}: { href: string; "aria-label": string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-base transform hover:scale-110"
    >
      {icon}
    </a>
  )
}

function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-primary hover:bg-primary/90 text-primary-foreground items-center font-semibold px-4 py-2 rounded-xl transition-base focus:outline-hidden ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-hidden active:ring-0 active:outline-hidden focus-visible:ring-0 focus-visible:outline-hidden active:border-transparent focus-visible:ring-offset-0 ${className}`}
      {...props}
    />
  )
}

function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsPending(false)
    setEmail("")
    alert("Thank you for joining the waitlist! But we WON'T send you any messages and the email didn't submitted.")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 mb-8">
      <div className="flex overflow-hidden rounded-xl bg-foreground/5 p-1 ring-1 ring-foreground/20 focus-within:ring-2 focus-within:ring-primary">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Don't enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
        />
        <Button type="submit" disabled={isPending} className="w-96 items-center">
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Get NO Notified"}
        </Button>
      </div>
    </form>
  )
}

function WaitlistSignup() {
  const t = useTranslations("Waitlist")

  return (
    <div className="w-full max-w-2xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-foreground/80 to-foreground/40">
            {t("title")}
          </h2>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div className="w-full">
          <WaitlistForm />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mt-8 text-sm">
            <p className="text-foreground font-semibold">{t('disclaimer-title')}</p>
            <p className="text-foreground/50 font-semibold">{t('disclaimer-content')}</p>
          </div>
        </div>
      </div>
      <div className="pt-8 flex justify-center space-x-6">
        <SocialIcon href="https://bsky.app/profile/choneas.com" aria-label="X (formerly Twitter)" icon={<XIcon className="w-6 h-6" />} />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 bg-background animate-fade-out" style={{ zIndex: -1 }} />
      <div className="fixed inset-0 top-[-5%] left-[-5%] w-[110%] h-[110%]" style={{ zIndex: 0 }}>
        <Image
          src="https://webstatic.mihoyo.com/bh3/event/novel-7swords/images/bg.7a33691a.jpg"
          alt="Background"
          fill
          className="object-center blur-sm"
          priority
        />
        {/* 添加一个遮罩层实现黑色透明效果 */}
        <div className="absolute inset-0 bg-background opacity-80" />
      </div>
      <div className="relative w-full animate-fade-in">
        <WaitlistSignup />
      </div>
    </div>
  )
}