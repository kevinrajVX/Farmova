import "./globals.css";

export const metadata = {
  title: "Farmova",
  description: "Farmova — a fresh Next.js app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
