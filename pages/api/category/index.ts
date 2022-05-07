// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createCategory(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ unauthorized: true })
  }

  if (!req.body.name || !req.body.slug) {
    return res.status(500).json({ error: 'validation error' })
  }

  const category = await prisma.category.create({
    data: {
      name: req.body.name,
      slug: req.body.slug,
    }
  });

  if (category.id) {
    return res.status(200).json(category)
  }
  
  return res.status(500).json({ error: 'something gone wrong' })
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createCategory(req, res);
  }
}
