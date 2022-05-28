// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { PrismaClient } from '@prisma/client'

const mercadopago = require('mercadopago');
const prisma = new PrismaClient();

mercadopago.configure({
  access_token: `${process.env.MERCADOPAGO_ACCESS_TOKEN}`
});

async function createClassified(req: NextApiRequest, res: NextApiResponse<Object>) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ unauthorized: true })
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
      telephone: req.body.telephone,
      userId: user?.id,
    }
  });

  if (!classified.id) {
    return res.status(500).json({ error: 'something gone wrong' })
  }

  if (req.body.submitButton != 'pay') {
    return res.status(200).json(classified)
  }

  const payment_url = await createPreference(req, classified.id);

  return res.status(200).json({
    error: false,
    data: {
      classified,
      payment_url: payment_url
    }
  })
};

async function createPreference(req: object, idClassified: string) {
  let data;

  let preference = {
    items: [{
      title: 'Classificado Bom Negócio pra Você',
      description: 'Seu classificado anúnciado na FM Verde Vale',
      quantity: 1,
      unit_price: 50,
      currency_id: 'BRL',
    }],
    payment_methods: {
      excluded_payment_types: [
        { id: 'debit_card' },
        // {id:'credit_card'},
        { id: 'ticket' },
      ],
    },
    external_reference: idClassified,
    // auto_return: 'approved',
    // back_urls: {
    //     success: '',
    // }
    notification_url: `https://${process.env.APP_URL}/api/classifieds/${idClassified}`,
    statement_descriptor: 'BOMNEGOCIO'
  };

  await mercadopago.preferences.create(preference)
    .then(function (response: any) {
      console.log(response.body.id);
      console.log(response.body.init_point);
      data = response.body.init_point;
    }).catch(function (error: any) {
      data = error;
    });

  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(500).json({ error: 'only accepts POST method' })
  }

  if (!req.body.title || !req.body.price || !req.body.category || !req.body.description || !req.body.telephone) {
    return res.status(500).json({
      error: true,
      fields: [
        'title', 'price', 'category', 'description', 'telephone'
      ],
      message: 'Campo em branco'
    })
  }

  return createClassified(req, res);
}
