import { Inter as FontSans } from "next/font/google"
import { JetBrains_Mono as FontMono } from "next/font/google"

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: 'swap',
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
})

export const fontMono = FontMono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: 'swap',
    fallback: ['Consolas', 'Monaco', 'Liberation Mono', 'Courier New', 'monospace'],
})
