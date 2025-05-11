import Document, { Html, Head, Main, NextScript } from 'next/document';

class NoSSRDocument extends Document {
  render() {
    return (
      <Html lang="fr" suppressHydrationWarning>
        <Head>
          {/* Meta tags SEO allégées */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Céline Debarieux" />
          <meta name="description" content="Céline Debarieux, photographe d'exception au Mans, vous propose des portraits artistiques, reportages de mariage et événementiels haut de gamme." />
          <meta name="keywords" content="photographe, Le Mans, portrait, mariage, événementiel, artistique, Céline Debarieux" />
          
          {/* Polices importées directement - pas de preload */}
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
          
          {/* Script pour éviter le flash de contenu non stylisé */}
          <script dangerouslySetInnerHTML={{
            __html: `
              // Script pour éviter le FOUC (Flash Of Unstyled Content)
              document.documentElement.classList.add('js-loading');
              window.addEventListener('DOMContentLoaded', function() {
                document.documentElement.classList.remove('js-loading');
              });
            `
          }} />
        </Head>
        <body>
          <div id="app-root" suppressHydrationWarning>
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NoSSRDocument;
