import Document, { Head, Html, Main, NextScript } from "next/document"; //eslint-disable-line

//this is trying to preload the font to give us a performance advantage since the font are loaded in advance.

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* we also need to add the css rules to the font family inside styles - global.css file */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link //eslint-disable-line
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/000000/external-movie-mobile-technology-itim2101-lineal-color-itim2101.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
