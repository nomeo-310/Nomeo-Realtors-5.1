import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from 'next-themes'
import DialogProvider from "@/components/providers/DialogProvider";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { getCurrentUser } from "@/lib/actions/user-actions";
import QueryProvider from "@/components/providers/QueryProvider";
import Navigation from "../components/navigation/Navigation";
import DashboardLayout from "./components/DashboardLayout";


export const metadata: Metadata = {
  title: { template: "Dashboard | %s", default: "Dashboard | Notifications" },
  description: "A real estate webapp built with ReactJS bootsrapped in NextJS, styled with TailwindCSS. A WebApp designed by Salomi Afolabi of Nomeo Consults. The app was initially intended as a real estate application to help in leasing and purchasing apartments but in the future will include investment opportunities as well other types of real estate adverts. This application is an updated version of the just concluded Nomeo Suites 5.0",
};

const urbanist = localFont({
  src: [{ path: "../../public/fonts/Urbanist-Regular.ttf", weight: "400" }],
  variable: "--font-urbanist",
});

const barlow = localFont({
  src: [{ path: "../../public/fonts/Barlow-Regular.ttf", weight: "400" }],
  variable: "--font-barlow",
});

export default async function MainDashboardLayout({children}:{children: React.ReactNode}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${barlow.variable}`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster/>
            <DialogProvider user={currentUser} />
            <Navigation/>
            <DashboardLayout user={currentUser}>
              {children}
            </DashboardLayout>
            <ScrollToTop />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
