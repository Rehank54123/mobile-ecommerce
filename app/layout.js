import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata = {
  title: "Ingrosmart | B2B & B2C E-commerce",
  description: "Ingrosso Telefonia, Ricambi e Accessori",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
