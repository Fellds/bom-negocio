// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createClassified(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ unauthorized: true })
  }

  if (!req.body.title || !req.body.price || !req.body.category || !req.body.description) {
    return res.status(500).json({ error: 'validation error' })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const classified = await prisma.classified.create({
    data: {
      title: req.body.title,
      price: req.body.price * 100, //format to cents
      categoryId: req.body.category,
      description: req.body.description,
      userId: user?.id,
    }
  });

  if (!classified.id) {
    return res.status(500).json({ error: 'something gone wrong' })
  }

  if (req.body.submitButton == 'pay') {
    return res.status(200).json('paga')
  }

  return res.status(200).json(classified)
};

async function createPreference() {
  
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createClassified(req, res);
  }
}
