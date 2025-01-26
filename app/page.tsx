"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    background:url("https://webstatic.mihoyo.com/bh3/event/novel-7swords/images/bg.7a33691a.jpg") center center;
    background-size: cover;
    filter: blur(4px);
    pointer-events: none;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  .content {
    position: relative;
    z-index: 2;
  }
`

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
      className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110"
    >
      {icon}
    </a>
  )
}

function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-black hover:bg-gray-800 text-white items-center font-semibold px-4 py-2 rounded-xl transition-all duration-300 ease-in-out focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0 ${className}`}
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
      <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-500">
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
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
            {t("title")}
          </h2>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-gray-300">
            {t("description")}
          </p>
        </div>
        <div className="w-full">
          <WaitlistForm />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mt-8 text-sm">
            <p className="text-white font-semibold">{t('disclaimer-title')}</p>
            <p className="text-white text-opacity-50 font-semibold">{t('disclaimer-content')}</p>
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
    <main className="min-h-screen flex items-center justify-center">
      <style jsx global>
        {backgroundStyle}
      </style>
      {/* 黑色遮罩层 */}
      <div className="fixed inset-0 bg-black animate-fade-out z-50" />
      {/* 背景和内容 */}
      <div className="bg-pattern" />
      <div className="content w-full animate-fade-in opacity-0">
        <WaitlistSignup />
      </div>
    </main>
  )
}