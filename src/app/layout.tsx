import { getServerSession } from "@/lib/session";
import MainLayout from "@/providers/LayoutProvider";

/* PROVIDERS */
import LocalizationProvider from "@/providers/LocalizationProvider";
import QueryProvider from "@/providers/QueryProvider";
import SessionProvider from "@/providers/SessionProvder";
import RecoilProvider from '@/providers/RecoilProvider';

/* THEME */
import ThemeRegistry from "@/styles/ThemeRegistry";

export const metadata = {
  title: "iStore",
  description: "",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <RecoilProvider>
          <LocalizationProvider>
            <ThemeRegistry>
              <SessionProvider session={session}>
                <QueryProvider>
                  <MainLayout session={session}>{children}</MainLayout>
                </QueryProvider>
              </SessionProvider>
            </ThemeRegistry>
          </LocalizationProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
