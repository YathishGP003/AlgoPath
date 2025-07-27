import "./globals.css";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import Navbar from "@/components/shared/Navbar";

export const metadata = {
  title: "AlgoPath - Your Coding Ground",
  description: "Best Coding platform for all your needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <Navbar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
