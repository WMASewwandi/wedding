import "./globals.css";

export const metadata = {
  title: "Buyan & Sewwandi | Wedding Invitation",
  description: "Join us to celebrate our wedding day.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
