import Script from "next/script"

function Checkout() {
    return (
        <>
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        var mp = new MercadoPago('${process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY}', {
                            locale: 'pt-BR'
                        });

                        if(checkout == undefined) {
                            var checkout = mp.checkout({
                                preference: {
                                    id: '244286819-b735cabf-45a2-4d5e-8bec-b4f9c6d86064'
                                },
                                render: {
                                    container: '.cho-container',
                                    label: 'Pagar',
                                }
                            });
                        }
                        
                    `,
                }}
            />

            <a className="button" href="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=244286819-b735cabf-45a2-4d5e-8bec-b4f9c6d86064"
                target="_blank"
                rel="noopenner">
                Pagar
            </a>

            {/* https://medium.com/nextjs/the-script-component-in-next-js-ee6ee6cd705a */}
            {/* https://nextjs.org/docs/migrating/from-create-react-app#safely-accessing-web-apis */}
            <div className="cho-container"></div>
        </>
    )
}

export default Checkout