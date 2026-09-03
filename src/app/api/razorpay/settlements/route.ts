import { NextResponse } from 'next/server';
import { ServerDb } from '@/lib/serverDb';

const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

function isLiveMode(): boolean {
  return Boolean(keyId && keySecret && keyId.startsWith('rzp_live'));
}

export async function GET() {
  try {
    if (isLiveMode()) {
      try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const res = await fetch(`https://api.razorpay.com/v1/settlements`, {
          headers: { Authorization: `Basic ${auth}` }
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({ items: data.items || [], mode: 'live' });
        }
      } catch (err) {
        console.warn('Razorpay Live Settlements API failed, using DB fallback:', err);
      }
    }

    const settlements = await ServerDb.getSettlements();
    return NextResponse.json({ items: settlements, mode: 'demo' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch settlements', message: error.message },
      { status: 500 }
    );
  }
}
