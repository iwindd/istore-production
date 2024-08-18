/* PROVIDERS */
import LocalizationProvider from "@/providers/LocalizationProvider";
import QueryProvider from "@/providers/QueryProvider";

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
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <ThemeRegistry>
            <QueryProvider>{children}</QueryProvider>
          </ThemeRegistry>
        </LocalizationProvider>
      </body>
    </html>
  );
}
