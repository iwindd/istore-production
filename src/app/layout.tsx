import { getServerSession } from "@/lib/session";

/* PROVIDERS */
import LocalizationProvider from "@/providers/LocalizationProvider";
import QueryProvider from "@/providers/QueryProvider";
import SessionProvider from '@/providers/SessionProvder';

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
        <LocalizationProvider>
          <ThemeRegistry>
            <SessionProvider session={session}>
              <QueryProvider>{children}</QueryProvider>
            </SessionProvider>
          </ThemeRegistry>
        </LocalizationProvider>
      </body>
    </html>
  );
}
