import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import SessionContext from '@/Context/session-context';
import '@/app/globals.css';
import { ThemeProvider } from '@/Provider/ThemeProvider';

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "InsiderAi App";
const APP_DEFAULT_TITLE = "InsiderAi - Socialfy";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "I PWA app";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-primary-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <SessionContext>
            {children}
            <Toaster />
          </SessionContext>
        </ThemeProvider>
      </body>
    </html>
  )
}
