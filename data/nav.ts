import { Feather, HomeIcon, LucideIcon } from "lucide-react"

interface NavMainItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavMainSubItem[]
}

interface NavMainSubItem {
  title: string
  url: string
}

interface NavAvatarUser {
  name: string
  email: string
  avatar: string
}

interface NavNovel {
  name: string
  url: string
  icon: LucideIcon
}

const navMain: NavMainItem[] = [
  {
    title: "home",
    url: "/",
    icon: HomeIcon,
    isActive: true,
  },
]

const navAvatarUser: NavAvatarUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}
  
const navNovels: NavNovel[] = [
  {
    name: "神州折剑录",
    url: "/novels/shenzhoubrokenswordlegend",
    icon: Feather,
  },
  {
    name: "神州折剑录 2",
    url: "/novels/shenzhoubrokenswordlegend2",
    icon: Feather,
  }
]

export { navMain, navAvatarUser, navNovels}