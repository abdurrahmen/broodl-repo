import { Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./Head";
import Logout from "@/components/Logout";

const salsa = Luckiest_Guy({ subsets: ["latin"], weight: ['400']});

export const metadata = {
  title: "Broodl",
  description: "Track yoy daily mood, every day of the year",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={'text-xl sm:text-4xl textGradient ' + salsa.className}>Broodl</h1>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-600 ' + salsa.className}>Created With Luv</p>
    </footer>
  )

  return (
    <html lang="en">
      <Head></Head>
      <AuthProvider>
        <body className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col '}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
