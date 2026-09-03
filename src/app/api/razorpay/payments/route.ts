import { NextResponse } from 'next/server';
import { ServerDb } from '@/lib/serverDb';

const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

function isLiveMode(): boolean {
  return Boolean(keyId && keySecret && keyId.startsWith('rzp_live'));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 100;

    if (isLiveMode()) {
      try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const res = await fetch(`https://api.razorpay.com/v1/payments?count=${limit}`, {
          headers: { Authorization: `Basic ${auth}` }
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ items: data.items || [], mode: 'live' });
        }
      } catch (err) {
        console.warn('Razorpay Live Server Fetch failed, using DB fallback:', err);
      }
    }

    const transactions = await ServerDb.getTransactions(limit);
    return NextResponse.json({ items: transactions, mode: 'demo' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch payments', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, description, customerPhone } = body;

    if (!amount || !description) {
      return NextResponse.json({ error: 'Missing required parameters: amount, description' }, { status: 400 });
    }

    if (isLiveMode()) {
      try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const res = await fetch(`https://api.razorpay.com/v1/payment_links`, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: amount * 100, // in paise
            currency: 'INR',
            description,
            customer: { contact: customerPhone || '+919876543210' },
            notify: { sms: true }
          })
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ link: data, mode: 'live' });
        }
      } catch (err) {
        console.warn('Live payment link creation failed, returning mock link:', err);
      }
    }

    const mockId = `plink_${Math.floor(Math.random() * 899999 + 100000)}`;
    const mockLink = {
      id: mockId,
      short_url: `https://rzp.io/l/sharma_store_${mockId}`,
      amount: amount * 100,
      status: 'created',
      description,
      customerPhone: customerPhone || '+919876543210'
    };

    return NextResponse.json({ link: mockLink, mode: 'demo' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Payment link creation failed', message: error.message },
      { status: 500 }
    );
  }
}
