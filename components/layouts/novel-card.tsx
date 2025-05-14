"use client"

import { Image } from "@heroui/image"
import { Link } from "@heroui/link"
import { useTranslations } from "next-intl"
import { Button } from "@heroui/button"
import { cn } from "@/utils/cn"

interface NovelCardProps {
    title: string
    cover: string
    wordCount: number
    progress: number
    isCollapsed?: boolean
    className?: string
}

export function NovelCard({
    title,
    cover,
    wordCount,
    progress,
    isCollapsed,
    className
}: NovelCardProps) {
    const t = useTranslations("sidebar")

    return (
        <Button
            disableRipple
            as={Link}
            isIconOnly={isCollapsed}
            className={cn(
                "w-full max-h-[4rem] group relative overflow-hidden bg-transparent border-transparent",
                "hover:bg-default-50 hover:ring-accent-foreground/20",
                !isCollapsed && "!h-20",
                className
            )}>
            <div className="absolute inset-0 p-0">
                <Image
                    alt={title}
                    className="w-full h-full object-cover aspect-square"
                />
            </div>

            {!isCollapsed && (
                <div className="absolute inset-0 flex flex-col justify-between p-2 pl-[calc(theme(spacing.20)+theme(spacing.2))]">
                    <span className="text-sm font-medium text-white line-clamp-1">
                        {title}
                    </span>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                            {progress}%
                        </p>
                    </div>
                </div>
            )}
        </Button>
    )
}