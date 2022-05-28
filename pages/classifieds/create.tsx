import type { NextPage } from 'next'
import { useState } from 'react'
import { PrismaClient } from '@prisma/client';
import { useSession, signIn } from 'next-auth/react';

const Novo: NextPage = ({ categories }: any) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [telephone, setTelephone] = useState('');
  const [submitButton, setSubmitButton] = useState('');

  if (!session && status != 'loading') {
    return (
      <section className="max-w-screen-xl mx-auto px-5">
        <div className="flex flex-row gap-6 justify-center">
          <div className="w-8/12 bg-white border-default p-2">
            <h3>Por favor faça o <a onClick={() => signIn()}>login</a></h3>
          </div>
        </div>
      </section>
    )
  }

  function createClassified() {
    fetch('/api/classifieds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, price, category, description, telephone, submitButton })
    }).then(response => response.json())
      .then(json => {
        if (json.error == false) {
          window.open(json.data.payment_url, '_blank')?.focus()
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <section className="max-w-screen-xl mx-auto px-5">

        <div className="flex flex-row gap-6 justify-center">
          <div className="w-8/12 bg-white border-default p-2">
            <h3 className="text-xl font-bold mb-4">Criar um novo anúncio</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              createClassified();
            }}>
              <label className="form-group">
                <span>Título</span>
                <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Uma breve descrição" />
              </label>
              <label className="form-group">
                <span>Preço</span>
                <input onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" min="0" max="21474835" name="price" placeholder="R$ 200,00" />
              </label>
              <label className="form-group">
                <span>Categoria</span>
                <select onChange={(e) => setCategory(e.target.value)} name="category">
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label className="form-group">
                <span>Descrição do produto</span>
                <textarea onChange={(e) => setDescription(e.target.value)} rows={5} name="description" placeholder="Descrição completa do produto"></textarea>
              </label>
              <label className="form-group">
                <span>Telefone de contato</span>
                <input maxLength={11} onChange={(e) => setTelephone(e.target.value)} type="text" name="telephone" />
              </label>
              <div className="flex justify-between">
                <button type="submit" onClick={() => setSubmitButton('draft')} className="text-gray-500 hover:text-gray-700 cursor-pointer">salvar como rascunho</button>
                <button type="submit" onClick={() => setSubmitButton('pay')} className="button">salvar e fazer pagamento</button>
              </div>
            </form>
          </div>
        </div>

      </section>
    </>
  )
}

export async function getStaticProps() {
  const prisma = new PrismaClient();

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    props: {
      categories,
    },
  };
}

export default Novo