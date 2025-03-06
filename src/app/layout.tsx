import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import ThemeSwitch from "@/components/ThemeSwitch";
import Footer from "@/components/Footer";

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className='antialiased dark:bg-black dark:text-white bg-gray-200 text-black'
      > 
        <Providers>
          <div className="responsividade flex flex-col w-full min-h-screen">
            <Navbar />
            <div className="grow main-div">
              {children}
            </div>
            <ThemeSwitch />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
