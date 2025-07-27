import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import AuthSessionProvider from "@/components/providers/SessionProvider";

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