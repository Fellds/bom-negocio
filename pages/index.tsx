import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
	return (
    <section className="max-w-screen-lg mx-auto px-2">
      <div className="flex flex-row gap-6">
        <div className="w-8/12 bg-white border-default p-2">
          <p className="text-lg leading-6 font-semibold">Par de Galinha Chocadeira</p>
        </div>

        <div className="w-4/12 bg-white border-default p-2">
          <p>sidebar</p>
        </div>
      </div>
    </section>
  )
}

export default Home