'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { HomeIcon, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/layouts/avatar";
import { globalData } from "@/data/global";
import { useSidebarStore } from "@/store/sidebar";
import { useIsElectron } from "@/hooks/use-is-electron";
import { cn } from "@/utils/cn";

export function Topbar() {
  const t = useTranslations("topbar");
  const { toggleCollapse } = useSidebarStore();
  const isElectronApp = useIsElectron();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  return (
    <header className="flex sticky top-0 h-[var(--topbar-height)] shrink-0 items-center justify-between w-full px-4 transition-[width,height] ease-linear">
      <Tooltip content={t("library")} placement="right">
        <Button
          isIconOnly
          disableRipple
          radius="full"
          variant="light"
          className="size-12 flex items-center justify-center data-[state=open]:bg-default-100 data-[state=open]:text-foreground hover:opacity-100 opacity-80 transition-opacity duration-200"
          onPress={toggleCollapse}
        >
          <Image width={28} height={28} src={globalData.logo} alt="logo" />
        </Button>
      </Tooltip>

      <div className="md:fixed flex gap-2 md:left-1/2 md:-translate-x-1/2 md:w-[32rem] z-10">
        <Tooltip content={t("home")}>
          <Button
            isIconOnly
            disableRipple
            radius="full"
            size="lg"
            startContent={<HomeIcon className="pointer-events-none size-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />}
            className="bg-content1/80 hover:bg-content1 opacity-80 hover:opacity-100 transition-base group"
            onPress={() => router.push("/")}
          />
        </Tooltip>
        <Input
          isClearable
          radius="full"
          classNames={{
            base: "w-full group",
            inputWrapper: cn(
              "bg-content1 border-none shadow-none opacity-80 group-hover:opacity-100 transition-base ring-0",
              isSearchFocused
                ? "ring-2 ring-foreground"
                : "hover:ring-1 hover:ring-default-200"
            ),
          }}
          size="lg"
          variant="faded"
          startContent={<Search className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" size={24} />}
          placeholder={isSearchFocused ? t("search-placeholder") : undefined}
          onFocusChange={(focused) => setIsSearchFocused(focused)}
        />
      </div>

      <div
        className={cn(
          "flex items-center ml-auto",
          isElectronApp && "fixed right-[9rem]"
        )}
      >
        {/* <Button radius="full" color="primary">Login</Button> // TODO: Add login button */}
        <Avatar />
      </div>
    </header>
  );
} 