import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { useState } from 'react'

const Novo: NextPage = ({ classifieds, error }: any) => {
  return (
    <>
      <section className="max-w-screen-xl mx-auto px-5">

        <div className="flex flex-row gap-6 justify-center">
          <div className="w-8/12 bg-white border-default p-2">
            { error }
            {classifieds.map((classified: any) => (
              <>
                <p>{classified.id}</p>
                <p>{classified.title}</p>
                <p>{classified.price}</p>
                <p>{classified.description}</p>
                <p>{classified.status}</p>
                <p>{classified.user.email}</p>
                <p>{classified.category.name}</p>
                <br />
              </>
            ))}
          </div>

        </div>

      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const prisma = new PrismaClient();

  if (!session) {
    return {
      props: {
        classifieds : [],
        error : 'You should login first'
      }
    }
  }

  const classifieds = await prisma.classified.findMany({
    include: {
      'category': true,
      'user': true
    }
  });

  for (const element of classifieds) {
    element.created_at = element.created_at.toString()
    element.category.created_at = element.created_at.toString()
    element.user.created_at = element.created_at.toString()
    element.updated_at = element.updated_at.toString()
    element.category.updated_at = element.updated_at.toString()
    element.user.updated_at = element.updated_at.toString()
  }

  return {
    props: {
      classifieds,
      error : ''
    }
  }
}

export default Novo