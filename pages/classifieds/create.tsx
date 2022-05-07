import type { NextPage } from 'next'
import { useState } from 'react'

const Novo: NextPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <section className="max-w-screen-xl mx-auto px-5">

        <form onSubmit={(e) => {
          e.preventDefault();

          fetch('/api/classifieds', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, price, category, description })
          })
        }}>
          <label>
            <span>Título</span>
            <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" />
          </label>
          <label>
            <span>Preço</span>
            <input onChange={(e) => setPrice(e.target.value)} type="text" name="price" />
          </label>
          <label>
            <span>Categoria</span>
            <input onChange={(e) => setCategory(e.target.value)} type="text" name="category" />
          </label>
          <label>
            <span>Descrição</span>
            <textarea onChange={(e) => setDescription(e.target.value)} name="description"></textarea>
          </label>
          <button>Submit</button>
        </form>

      </section>
    </>
  )
}

export default Novo