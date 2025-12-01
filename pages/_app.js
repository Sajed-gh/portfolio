// pages/_app.js
import '../styles/globals.css'
// The path is correct, assuming you renamed your style.css to globals.css

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp