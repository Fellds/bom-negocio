import type { NextPage } from 'next'
import Checkout from '../../components/Checkout'

const Novo: NextPage = () => {
	return (
    <>
      <section className="max-w-screen-xl mx-auto px-5">
        <Checkout />
      </section>
    </>
  	)
}

export default Novo