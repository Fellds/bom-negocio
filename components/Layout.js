import Header from "./Header"
import Footer from "./Footer"
import Head from 'next/head'
import Script from "next/script"

function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen justify-between">
			<Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />

                <title>Bom Negócio | FM Verde Vale</title>

                <link rel="icon" href="/favicon.ico" />

                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta property="og:locale" content="pt_BR" />
            </Head>

            <Script id="sdk-mp" src="https://sdk.mercadopago.com/js/v2" strategy="beforeInteractive" />

			<Header />  

			<main className="mb-auto">
                { children }
            </main>

            <Footer />
        </div>
    )
}

export default Layout