import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const mercadopago = require('mercadopago');
const prisma = new PrismaClient();

mercadopago.configure({
  access_token: `${process.env.MERCADOPAGO_ACCESS_TOKEN}`
});

async function updatePaymentStatus(req: NextApiRequest, res: NextApiResponse<Object>) {
  const classifiedId = req.query.classifiedId as string | undefined;
  const payment = await getPayment(req.body.data.id);

  if (payment.status == 'approved') {
    const updateClassified = await prisma.classified.update({
      where: {
        id: classifiedId,
      },
      data: {
        status: 'active',
        payment_status: 'approved',
      },
    })

    return res.status(200).json({
      error: false,
      data: {'classified': 'active'}
    })
  }

  return
}

async function getPayment(paymentId: string) {
  let payment = await mercadopago.payment.get(paymentId)

  return payment.response;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Object>) {
  if (req.method !== 'POST') {
    return res.status(500).json({ error: 'only accepts POST method' })
  }

  if (!req.body.type || req.body.type !== 'payment') {
    return res.status(500).json({ error: 'missing type or isnt payment' })
  }

  return updatePaymentStatus(req, res);
}