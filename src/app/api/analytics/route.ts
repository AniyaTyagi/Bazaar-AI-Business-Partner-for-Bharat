import { NextResponse } from 'next/server';
import { ServerDb } from '@/lib/serverDb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'summary') {
      const summary = await ServerDb.getSummary();
      return NextResponse.json(summary);
    }

    if (type === 'transactions') {
      const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;
      const transactions = await ServerDb.getTransactions(limit);
      return NextResponse.json(transactions);
    }

    if (type === 'settlements') {
      const settlements = await ServerDb.getSettlements();
      return NextResponse.json(settlements);
    }

    if (type === 'customers') {
      const customers = await ServerDb.getCustomers();
      return NextResponse.json(customers);
    }

    if (type === 'products') {
      const products = await ServerDb.getProducts();
      return NextResponse.json(products);
    }

    if (type === 'expenses') {
      const expenses = await ServerDb.getExpenses();
      return NextResponse.json(expenses);
    }

    if (type === 'offers') {
      const offers = await ServerDb.getOffers();
      return NextResponse.json(offers);
    }

    if (type === 'audit') {
      const audit = await ServerDb.getAuditLogs();
      return NextResponse.json(audit);
    }

    // Default: Return complete aggregated dashboard payload
    const [summary, transactions, settlements, customers, products, expenses, offers] = await Promise.all([
      ServerDb.getSummary(),
      ServerDb.getTransactions(50),
      ServerDb.getSettlements(),
      ServerDb.getCustomers(),
      ServerDb.getProducts(),
      ServerDb.getExpenses(),
      ServerDb.getOffers()
    ]);

    return NextResponse.json({
      summary,
      transactions,
      settlements,
      customers,
      products,
      expenses,
      offers
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', message: error.message },
      { status: 500 }
    );
  }
}
