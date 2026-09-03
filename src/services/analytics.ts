import { generateCustomers, generateTransactions, generateSettlements, generateExpenses, PRODUCTS_CATALOG } from '../data/syntheticData';
import { Transaction, Customer, Product, Settlement, Expense, BusinessSummary, PaymentMethod, WebhookEvent, Offer } from '../types';

let customersData: Customer[] = generateCustomers();
let transactionsData: Transaction[] = generateTransactions(customersData);
let settlementsData: Settlement[] = generateSettlements(transactionsData);
let expensesData: Expense[] = generateExpenses();

let webhookEventsData: WebhookEvent[] = [
  { id: 'evt_001', event: 'payment.captured', timestamp: '19:54:12', amount: 1450, details: 'Sunita Verma via UPI (okicici)', status: 'success' },
  { id: 'evt_002', event: 'settlement.processed', timestamp: '18:30:00', amount: 31200, details: 'Auto-settled to Axis Bank (UTR: UTIB0009831)', status: 'success' },
  { id: 'evt_003', event: 'payout.queued', timestamp: '17:15:22', amount: 18500, details: 'Amul Dairy Supplier Payout via RazorpayX', status: 'processing' },
  { id: 'evt_004', event: 'payment.captured', timestamp: '16:42:05', amount: 2850, details: 'Aniya Gupta via HDFC Visa Card', status: 'success' },
  { id: 'evt_005', event: 'refund.created', timestamp: '15:10:00', amount: 710, details: 'Order #order_9812 refunded', status: 'success' }
];

const SAMPLE_INDIAN_NAMES = [
  'Amit Sharma', 'Pooja Patel', 'Vikram Singh', 'Neha Gupta', 'Rajesh Kumar',
  'Ananya Roy', 'Siddharth Malhotra', 'Meera Iyer', 'Karan Verma', 'Ritu Saxena',
  'Deepak Joshi', 'Sanjay Dutt', 'Kavita Nair', 'Arjun Kapoor', 'Preeti Mishra'
];

const SAMPLE_PAYMENT_METHODS: PaymentMethod[] = ['upi', 'upi', 'upi', 'card', 'payment_link'];

let liveSimulationInterval: NodeJS.Timeout | null = null;

export class AnalyticsService {
  static getCustomers(): Customer[] {
    return customersData;
  }

  static getTransactions(): Transaction[] {
    return transactionsData;
  }

  static getSettlements(): Settlement[] {
    return settlementsData;
  }

  static getExpenses(): Expense[] {
    return expensesData;
  }

  static getWebhookEvents(): WebhookEvent[] {
    return webhookEventsData;
  }

  static addTransaction(
    amount?: number,
    customerName?: string,
    method?: PaymentMethod
  ): Transaction {
    const finalName = customerName || SAMPLE_INDIAN_NAMES[Math.floor(Math.random() * SAMPLE_INDIAN_NAMES.length)];
    const finalMethod = method || SAMPLE_PAYMENT_METHODS[Math.floor(Math.random() * SAMPLE_PAYMENT_METHODS.length)];
    const finalAmount = amount || Math.floor(Math.random() * 1200) + 250;

    const now = new Date();
    const newTx: Transaction = {
      id: `pay_live_${Date.now().toString().slice(-6)}`,
      orderId: `order_live_${Date.now().toString().slice(-6)}`,
      amount: finalAmount,
      status: 'captured',
      method: finalMethod,
      vpa: finalMethod === 'upi' ? `${finalName.toLowerCase().replace(/\s+/g, '')}@okicici` : undefined,
      customerName: finalName,
      customerPhone: '+91 98112 ' + Math.floor(10000 + Math.random() * 90000),
      customerId: `cust_live_${Date.now().toString().slice(-4)}`,
      items: [
        { id: 'p1', name: 'Fortune Whole Wheat Atta 5kg', category: 'Grocery', price: 265, quantity: 1 },
        { id: 'p2', name: 'Fortune Sunlite Sunflower Oil 1L', category: 'Grocery', price: 145, quantity: 1 }
      ],
      timestamp: now.toISOString(),
      hourOfDay: now.getHours(),
      dayOfWeek: now.getDay(),
      tdrFee: Math.round(finalAmount * 0.018),
      branch: 'Lajpat Nagar Branch'
    };

    transactionsData.unshift(newTx);

    webhookEventsData.unshift({
      id: `evt_${Date.now().toString().slice(-5)}`,
      event: 'payment.captured',
      timestamp: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      amount: finalAmount,
      details: `${finalName} via ${finalMethod.toUpperCase()} (${newTx.id})`,
      status: 'success'
    });

    if (webhookEventsData.length > 20) webhookEventsData = webhookEventsData.slice(0, 20);

    return newTx;
  }

  static processRefund(txId?: string): Transaction | null {
    const tx = txId
      ? transactionsData.find(t => t.id === txId)
      : transactionsData.find(t => t.status === 'captured');

    if (tx) {
      tx.status = 'refunded';

      webhookEventsData.unshift({
        id: `evt_${Date.now().toString().slice(-5)}`,
        event: 'refund.created',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        amount: tx.amount,
        details: `Refund processed for order ${tx.orderId}`,
        status: 'success'
      });

      return tx;
    }
    return null;
  }

  static getBusinessSummary(dateRange: 'today' | '7d' | '30d' = 'today'): BusinessSummary {
    const nowStr = new Date().toISOString().split('T')[0];

    let filteredTxs = transactionsData;
    if (dateRange === 'today') {
      filteredTxs = transactionsData.filter(t => t.timestamp.startsWith(nowStr) || t.id.startsWith('pay_live_'));
    } else if (dateRange === '7d') {
      const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      filteredTxs = transactionsData.filter(t => t.timestamp >= sevenDaysAgo);
    }

    const captured = filteredTxs.filter(t => t.status === 'captured');
    const todayRevenue = captured.reduce((sum, t) => sum + t.amount, 0);
    const todayOrders = captured.length;
    const averageOrderValue = Math.round(todayOrders > 0 ? todayRevenue / todayOrders : 0);

    const successfulPaymentRate = Math.round((captured.length / Math.max(1, filteredTxs.length)) * 100);

    const refundsList = filteredTxs.filter(t => t.status === 'refunded');
    const refundsTotal = refundsList.reduce((sum, t) => sum + t.amount, 0);

    const expectedSettlementTomorrow = settlementsData.find(s => s.id === 'set_tomorrow')?.netAmount || 31200;

    const repeatCustomersCount = customersData.filter(c => c.totalOrders > 1).length;
    const repeatCustomerRate = Math.round((repeatCustomersCount / customersData.length) * 100);

    const supplierTomorrow = expensesData.filter(e => e.id === 'exp_01').reduce((s, e) => s + e.amount, 0);
    const estimatedFreeCash7Days = 30000 + expectedSettlementTomorrow - supplierTomorrow;

    return {
      todayRevenue: todayRevenue > 0 ? todayRevenue : 48320,
      todayOrders: todayOrders > 0 ? todayOrders : 68,
      revenueGrowthPercent: dateRange === 'today' ? 14.2 : dateRange === '7d' ? 18.5 : 22.1,
      averageOrderValue: averageOrderValue > 0 ? averageOrderValue : 710,
      successfulPaymentRate: successfulPaymentRate > 0 ? successfulPaymentRate : 96,
      refundsCount: refundsList.length,
      refundsTotal,
      expectedSettlementTomorrow: expectedSettlementTomorrow + Math.round(todayRevenue * 0.9),
      totalCustomers: customersData.length + Math.floor(todayOrders / 5),
      repeatCustomerRate,
      estimatedFreeCash7Days,
      businessHealthScore: 94,
      merchantId: 'rzp_m_9831a4f8',
      activeBranch: 'Lajpat Nagar Flagship'
    };
  }

  static getSalesTrend(period: 'today' | '7d' | '30d') {
    if (period === 'today') {
      const hoursMap: { [hour: number]: number } = {};
      for (let h = 9; h <= 21; h++) hoursMap[h] = 0;

      const nowStr = new Date().toISOString().split('T')[0];
      transactionsData.forEach(t => {
        if ((t.timestamp.startsWith(nowStr) || t.id.startsWith('pay_live_')) && t.status === 'captured') {
          hoursMap[t.hourOfDay] = (hoursMap[t.hourOfDay] || 0) + t.amount;
        }
      });

      return Object.keys(hoursMap).map(hStr => {
        const h = parseInt(hStr, 10);
        const ampm = h >= 12 ? `${h === 12 ? 12 : h - 12} PM` : `${h} AM`;
        return {
          label: ampm,
          revenue: hoursMap[h],
          orders: Math.round(hoursMap[h] / 710)
        };
      });
    }

    if (period === '7d') {
      const days: { [dateStr: string]: { date: string; dayName: string; revenue: number; orders: number } } = {};
      const now = new Date();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 86400000);
        const dStr = d.toISOString().split('T')[0];
        days[dStr] = {
          date: dStr,
          dayName: dayNames[d.getDay()],
          revenue: 0,
          orders: 0
        };
      }

      transactionsData.forEach(t => {
        const dStr = t.timestamp.split('T')[0];
        if (days[dStr] && t.status === 'captured') {
          days[dStr].revenue += t.amount;
          days[dStr].orders += 1;
        }
      });

      return Object.values(days).map(d => ({
        label: d.dayName,
        revenue: d.revenue,
        orders: d.orders
      }));
    }

    const weeks: { [weekLabel: string]: number } = {
      'Week 1': 245000,
      'Week 2': 282000,
      'Week 3': 268000,
      'Week 4 (Current)': 312000
    };
    return Object.keys(weeks).map(w => ({
      label: w,
      revenue: weeks[w],
      orders: Math.round(weeks[w] / 680)
    }));
  }

  static getProductPerformance(): Product[] {
    const map: { [id: string]: { salesCount: number; revenue: number } } = {};
    transactionsData.forEach(t => {
      if (t.status === 'captured') {
        t.items.forEach(item => {
          if (!map[item.id]) map[item.id] = { salesCount: 0, revenue: 0 };
          map[item.id].salesCount += item.quantity;
          map[item.id].revenue += item.price * item.quantity;
        });
      }
    });

    return PRODUCTS_CATALOG.map(p => {
      const fallbackCount = Math.floor(p.price > 300 ? 140 : 380);
      const stats = map[p.id] || { salesCount: fallbackCount, revenue: p.price * fallbackCount };
      return {
        ...p,
        salesCount: stats.salesCount,
        revenue: stats.revenue,
        trendingScore: p.id === 'p1' || p.id === 'p2' ? 24 : p.id === 'p8' ? 12 : -5
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }

  static getCustomerSegments(minOrders: number = 3, inactiveDays: number = 14, minSpent: number = 500) {
    const total = customersData.length;
    const highValue = customersData.filter(c => c.totalSpent >= minSpent);
    const dormantHighValue = highValue.filter(c => c.totalOrders >= minOrders && c.isDormant);

    return {
      total,
      highValueCount: highValue.length,
      dormantHighValueCount: dormantHighValue.length > 0 ? dormantHighValue.length : 47,
      regularCount: customersData.filter(c => c.tier === 'Regular').length,
      newCount: customersData.filter(c => c.tier === 'New').length,
      occasionalCount: customersData.filter(c => c.tier === 'Occasional').length,
      dormantList: dormantHighValue.length > 0 ? dormantHighValue : customersData.slice(0, 47),
      topSpenders: highValue.map(c => ({
        ...c,
        rfmScore: c.totalSpent > 15000 ? '5-5-4 (VIP)' : c.totalSpent > 8000 ? '4-4-3 (Regular)' : '3-2-2 (Standard)',
        churnRisk: c.isDormant ? 'High' : 'Low'
      })).slice(0, 10)
    };
  }

  static getPaymentMethodBreakdown() {
    const map: { [key: string]: number } = { UPI: 0, Cards: 0, 'Payment Links': 0, Netbanking: 0 };
    transactionsData.forEach(t => {
      if (t.status === 'captured') {
        if (t.method === 'upi') map.UPI += t.amount;
        else if (t.method === 'card') map.Cards += t.amount;
        else if (t.method === 'payment_link') map['Payment Links'] += t.amount;
        else map.Netbanking += t.amount;
      }
    });

    const total = Object.values(map).reduce((a, b) => a + b, 0);
    return Object.keys(map).map(key => ({
      name: key,
      value: map[key],
      percent: Math.round((map[key] / Math.max(1, total)) * 100)
    }));
  }

  static getCashForecast(projectedDailySales: number = 42000, inventoryCommitment: number = 18500) {
    const days = [];
    const now = new Date();
    let runningBalance = 30000;

    for (let i = 0; i < 7; i++) {
      const d = new Date(now.getTime() + i * 86400000);
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short' });
      const dStr = d.toISOString().split('T')[0];

      let cashIn = projectedDailySales;
      let cashOut = 12000;

      if (i === 0) {
        cashIn = transactionsData.filter(t => t.status === 'captured').reduce((s, t) => s + t.amount, 0) || 48320;
        cashOut = 12850;
      } else if (i === 1) {
        cashIn = 31200;
        cashOut = inventoryCommitment;
      } else if (i === 5) {
        cashOut = 25000;
      }

      runningBalance += cashIn - cashOut;

      days.push({
        date: dStr,
        dayName,
        cashIn,
        cashOut,
        balance: runningBalance
      });
    }

    return days;
  }

  static exportTransactionsCSV() {
    const headers = ['Transaction ID', 'Order ID', 'Customer Name', 'Phone', 'Amount (INR)', 'Method', 'Status', 'Timestamp'];
    const rows = transactionsData.slice(0, 50).map(t => [
      t.id,
      t.orderId,
      `"${t.customerName}"`,
      t.customerPhone,
      t.amount,
      t.method,
      t.status,
      t.timestamp
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Razorpay_BAZAAR_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static getOffers(): Offer[] {
    return [
      {
        id: 'off_001',
        title: 'Weekend Kitchen Special',
        code: 'KITCHEN50',
        discountType: 'flat',
        discountValue: 50,
        minOrderValue: 499,
        targetSegment: 'Dormant High-Value Customers (47)',
        expectedUpside: '+12% order volume (Est. +₹8,500)',
        status: 'active'
      },
      {
        id: 'off_002',
        title: 'Atta + Oil Combo Saver',
        code: 'COMBO85',
        discountType: 'flat',
        discountValue: 85,
        minOrderValue: 699,
        targetSegment: 'All Grocery Buyers',
        expectedUpside: '+₹85 AOV increase',
        status: 'draft'
      }
    ];
  }

  static getAuditLogs() {
    return webhookEventsData;
  }
}
