import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse, formatHex } from "culori";
import { useTheme } from "next-themes"

// 在 ESM 环境下获得 CommonJS 风格的 __dirname
const __dirnameESM = path.dirname(fileURLToPath(import.meta.url));

// ===== 内部工具 =====
function normalizeColor(raw: string): string {
  // 去掉多余空白
  const trimmed = raw.trim();
  try {
    // culori 的 parse 支持多种颜色格式（oklch、hex、hsl 等）
    const parsed = parse(trimmed);
    if (parsed) {
      // 将任意颜色转换为标准 HEX 字符串（如 #ff0000）
      return formatHex(parsed);
    }
  } catch (_) {
    // 忽略解析错误，直接回退原值
  }
  // 无法解析则原样返回
  return trimmed;
}

// 缓存解析结果，避免重复 I/O
let paletteCache: Record<"light" | "dark", Record<string, string>> | null = null;

function parseGlobalsCss(): Record<"light" | "dark", Record<string, string>> {
  // 服务器端：通过 fs 读取文件
  if (typeof window === "undefined") {
    const cssPath = path.resolve(__dirnameESM, "..", "app", "globals.css");
    const source = fs.readFileSync(cssPath, "utf8");

    // 提取 :root 与 .dark 代码块
    const rootMatch = source.match(/:root\s*{([\s\S]*?)}/);
    const darkMatch = source.match(/\.dark\s*{([\s\S]*?)}/);

    const extract = (block?: RegExpMatchArray | null) => {
      const palette: Record<string, string> = {};
      if (!block) return palette;
      const body = block[1];
      // 匹配形如 --color-name: value; 的行
      const varRegex = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
      let m: RegExpExecArray | null;
      while ((m = varRegex.exec(body))) {
        const name = m[1];
        const value = normalizeColor(m[2]);
        palette[name] = value;
      }
      return palette;
    };

    return {
      light: extract(rootMatch),
      dark: extract(darkMatch),
    };
  }

  // 浏览器端：直接读取缓存（应在服务器端已填充），如未命中则返回空对象避免报错
  return {
    light: {},
    dark: {},
  };
}

// 预解析调色板（仅在构建 / SSR 阶段执行一次）
if (typeof window === "undefined" && !paletteCache) {
  paletteCache = parseGlobalsCss();
}

// ===== Public API =====
export function getColor(varName: string, mode: "light" | "dark" = "light") {
  if (!paletteCache) {
    // 在首次调用时解析全局 CSS
    paletteCache = parseGlobalsCss();
  }

  // 统一变量名格式：去除前缀 "--"
  const key = varName.startsWith("--") ? varName.slice(2) : varName;
  const palette = paletteCache[mode] ?? {};
  return palette[key] ?? "#000000";
}

type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
type ShadeGroup = Record<Shade, string> & { DEFAULT: string; foreground: string };

function buildShadeGroup(base: string, mode: "light" | "dark") {
  const shades: Shade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const group: Partial<ShadeGroup> = {};
  shades.forEach((shade) => {
    (group as Record<Shade, string>)[shade] = getColor(`${base}-${shade}`, mode);
  });

  // DEFAULT （未带数字后缀）
  (group as ShadeGroup).DEFAULT = getColor(base, mode);

  // foreground 没有就回退到 content1
  const fg = getColor(`${base}-foreground`, mode);
  (group as ShadeGroup).foreground = fg === "#000000" ? getColor("content1", mode) : fg;

  return group as ShadeGroup;
}

export function getHeroUIColors(mode: "light" | "dark" = "light") {
  const colors = {
    background: getColor("background", mode),
    foreground: getColor("foreground", mode),
    divider: getColor("divider", mode),
    focus: getColor("focus", mode),
    content1: getColor("content1", mode),
    content2: getColor("content2", mode),
    content3: getColor("content3", mode),
    content4: getColor("content4", mode),
    default: buildShadeGroup("default", mode),
    primary: buildShadeGroup("primary", mode),
    secondary: buildShadeGroup("secondary", mode),
    success: buildShadeGroup("success", mode),
    warning: buildShadeGroup("warning", mode),
    danger: buildShadeGroup("danger", mode),
  } as const;

  return colors;
}

// ===== React Hooks =====
// 以下 Hook 只能在 "use client" 的 React 组件中调用。
// 通过 next-themes 提供的 resolvedTheme 来决定当前模式，然后复用上面的纯函数。

/**
 * 返回当前（由 next-themes 控制的）主题配色对象。
 * 
 * 示例：
 * ```tsx
 * "use client";
 * import { useHeroUIColors } from "@/utils/theme-colors";
 *
 * export default function Card() {
 *   const colors = useHeroUIColors();
 *   return <div style={{ background: colors.default[50] }} />;
 * }
 * ```
 */
export function useHeroUIColors() {
  const { resolvedTheme } = useTheme();

  const mode: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";
  return getHeroUIColors(mode);
}

/**
 * 获取单个 CSS 变量在当前主题下对应的十六进制颜色。
 * @param varName 变量名，可以写 "default-500" 或 "--default-500"，或 "background" 等
 */
export function useCurrentColor(varName: string) {
  const { resolvedTheme } = useTheme();
  const mode: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";
  return getColor(varName, mode);
} 