"use client"

// TODO : todo

import { Image } from "@heroui/image"
import { Link } from "@heroui/link"
// import { useTranslations } from "next-intl"
import { Button } from "@heroui/button"
import { cn } from "@/utils/cn"

interface SidebarItemProps {
    title: string
    cover: string
    wordCount?: number
    progress?: number
    isCollapsed?: boolean
    className?: string
}

export function SidebarItem({
    title,
    cover,
    // wordCount,
    // progress,
    isCollapsed,
    className
}: SidebarItemProps) {
    // const t = useTranslations("sidebar-item")

    return (
        <Button
            disableRipple
            as={Link}
            isIconOnly={isCollapsed}
            className={cn(
                "w-full relative bg-transparent hover:bg-default-100 rounded-sm",
                !isCollapsed && "h-20",
                className
            )}>
            {isCollapsed ? (
                // 折叠状态：只显示封面
                <div className="w-full aspect-square overflow-hidden">
                    <Image
                        alt={title}
                        src={cover}
                        className="w-full h-full object-cover rounded-sm"
                    />
                </div>
            ) : (
                // 展开状态：使用flex布局，左侧封面，右侧内容
                <div className="flex w-full h-full">
                    {/* 左侧封面区域 - 保持正方形比例 */}
                    <div className="h-full aspect-square flex-shrink-0">
                        <Image
                            alt={title}
                            src={cover}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* 右侧内容区域 */}
                    <div className="flex-1 justify-between gap-1 p-2">
                        <span className="text-sm font-medium text-foreground line-clamp-1">
                            {title}
                        </span>
                        <div>
                            <p className="text-xs text-default-500">
                                {/* {progress}% {t("word-count", { count: wordCount })} */}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Button>
    )
}