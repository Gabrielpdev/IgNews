import Document, { Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {
  render(){
    return(
        <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;0,700;1,900&display=swap" rel="stylesheet" />
          <title>Ig.News</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;