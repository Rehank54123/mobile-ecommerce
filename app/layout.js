import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import Script from 'next/script';

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
        
        {/* Google Translate Integration */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <Script id="google-translate-script" strategy="lazyOnload">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'it',
                includedLanguages: 'it,en',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
      </body>
    </html>
  );
}
