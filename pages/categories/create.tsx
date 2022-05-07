import type { NextPage } from 'next'
import { useState } from 'react'

const Novo: NextPage = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    return (
        <>
            <section className="max-w-screen-xl mx-auto px-5">

                <form onSubmit={(e) => {
                    e.preventDefault();

                    fetch('/api/category', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, slug })
                    })
                }}>
                    <label>
                        <span>Name</span>
                        <input onChange={(e) => setName(e.target.value)} type="text" name="name" />
                    </label>
                    <label>
                        <span>Slug</span>
                        <input onChange={(e) => setSlug(e.target.value)} type="text" name="slug" />
                    </label>
                    <button>Submit</button>
                </form>

            </section>
        </>
    )
}

export default Novo