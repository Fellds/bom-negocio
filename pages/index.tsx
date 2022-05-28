import type { GetServerSideProps, NextPage } from 'next'
import { PrismaClient } from '@prisma/client';

const Home: NextPage = ({ classifieds }: any) => {
  return (
    <section className="max-w-screen-lg mx-auto px-2">
      <div className="flex flex-row gap-6">
        {classifieds.map((classified: any) => (
          <>
            <div key={classified.id} className="w-8/12 bg-white border-default p-2">
              <p className="text-lg leading-6 font-semibold">{classified.title}</p>
              <p>{classified.id}</p>
              <p>{classified.price}</p>
              <p>{classified.description}</p>
              <p>{classified.status}</p>
              <p>{classified.user.email}</p>
              <p>{classified.category.name}</p>
            </div>
          </>
        ))}
        <div className="w-4/12 bg-white border-default p-2">
          <p>sidebar</p>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();

  const classifieds = await prisma.classified.findMany({
    where: {
      status: 'active',
    },
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
      classifieds
    }
  }
}

export default Home