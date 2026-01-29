import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Client from "@/components/Client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:"The Momo House - Best Momos in Town",
    template:"%s | The Momo House"
  } ,
  description: "Order delicious momos from the comfort of your home. Fast delivery, authentic taste, and affordable prices.",
  keywords:['momos','food delivery','restaurant','dumplings','online food'],
  authors:[{name:"The Momo House"}],
  openGraph:{
    title:'The Momo House',
    description:'Best momos delivered to your doorstep',
    type:'website',
    url:"https://food-ordering-frontend-pranaya.vercel.app/",
    siteName:'The Momo House',
    images:[{
      url:'/og-image.png',
      width:1200,
      height:630,
      alt:"The Momo House Restaurant"
    }],
  },
  twitter:{
    card:'summary_large_image',
    title:'The Momo House',
    description:'Best momos delivered to your doorstep',
    images:['/twitter-image.png']
  },
  robots:{
    index:true,
    follow:true,
    googleBot:{
      index:true,
      follow:true,
      'max-video-preview':-1,
      "max-image-preview":'large',
      "max-snippet":-1,
    }
  },
  verification:{
    google:'your-google-verification-code',
    yandex:'your-yandex-verification-code'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200 dark:bg-stone-800 `}
      >
        <Client>
          {children}
        </Client>
      </body>
    </html>
  );
}
