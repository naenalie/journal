import "./globals.css";

export const metadata = {
  title: "My Kawaii Journal - Digital Scrapbook",
  description: "A secure, cute, and synced digital scrapbook and planner app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
