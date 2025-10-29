import "./globals.css";
import { CardProvider } from "../context/CardContext";

export const metadata = {
  title: "CardDeck",
  description: "Gestão de Cartões de Crédito com Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 min-h-screen flex justify-center items-start p-8 text-gray-900">
        <CardProvider>{children}</CardProvider>
      </body>
    </html>
  );
}
