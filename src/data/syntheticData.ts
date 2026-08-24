import { Transaction, Customer, Product, Settlement, Expense, PaymentMethod, TransactionStatus } from '../types';

// Deterministic random generator for realistic repeatable data
let seed = 42;
function pseudoRandom() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(pseudoRandom() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(pseudoRandom() * (max - min + 1)) + min;
}

export const PRODUCTS_CATALOG: Omit<Product, 'salesCount' | 'revenue' | 'trendingScore'>[] = [
  { id: 'p1', name: 'Fortune Whole Wheat Atta 5kg', category: 'Grocery', price: 265, cost: 220, stockLevel: 45, marginPercent: 17.0 },
  { id: 'p2', name: 'Fortune Sunlite Sunflower Oil 1L', category: 'Grocery', price: 145, cost: 120, stockLevel: 60, marginPercent: 17.2 },
  { id: 'p3', name: 'Aashirvaad Shudh Chakki Atta 10kg', category: 'Grocery', price: 499, cost: 420, stockLevel: 30, marginPercent: 15.8 },
  { id: 'p4', name: 'Tata Salt Vacuum Evaporated 1kg', category: 'Grocery', price: 28, cost: 22, stockLevel: 120, marginPercent: 21.4 },
  { id: 'p5', name: 'Amul Pasteurised Butter 500g', category: 'Dairy & Cold Storage', price: 275, cost: 250, stockLevel: 25, marginPercent: 9.1 },
  { id: 'p6', name: 'Nescafe Classic Instant Coffee 100g', category: 'Beverages', price: 340, cost: 280, stockLevel: 18, marginPercent: 17.6 },
  { id: 'p7', name: 'Brooke Bond Red Label Tea 500g', category: 'Beverages', price: 290, cost: 240, stockLevel: 40, marginPercent: 17.2 },
  { id: 'p8', name: 'Maggi 2-Minute Masala Noodles 4-Pack', category: 'Snacks & Instant', price: 56, cost: 46, stockLevel: 85, marginPercent: 17.8 },
  { id: 'p9', name: 'Cadbury Dairy Milk Silk 150g', category: 'Snacks & Instant', price: 175, cost: 140, stockLevel: 50, marginPercent: 20.0 },
  { id: 'p10', name: 'Surf Excel Easy Wash Detergent 1kg', category: 'Household Care', price: 155, cost: 125, stockLevel: 35, marginPercent: 19.3 },
  { id: 'p11', name: 'Dettol Antiseptic Liquid 500ml', category: 'Personal Care', price: 215, cost: 175, stockLevel: 22, marginPercent: 18.6 },
  { id: 'p12', name: 'India Gate Basmati Rice Feast Rozzana 5kg', category: 'Grocery', price: 475, cost: 390, stockLevel: 28, marginPercent: 17.9 },
  { id: 'p13', name: 'Haldiram Nagpur Alu Bhujia 400g', category: 'Snacks & Instant', price: 110, cost: 88, stockLevel: 70, marginPercent: 20.0 },
  { id: 'p14', name: 'Britannia Good Day Cashew 600g', category: 'Snacks & Instant', price: 120, cost: 96, stockLevel: 65, marginPercent: 20.0 },
  { id: 'p15', name: 'Bikano Rasgulla 1kg Tin', category: 'Sweets & Festivals', price: 240, cost: 180, stockLevel: 15, marginPercent: 25.0 },
  { id: 'p16', name: 'Catch Super Garam Masala 100g', category: 'Spices & Condiments', price: 92, cost: 70, stockLevel: 50, marginPercent: 23.9 },
  { id: 'p17', name: 'Coca-Cola Soft Drink 1.25L PET', category: 'Beverages', price: 65, cost: 52, stockLevel: 40, marginPercent: 20.0 },
  { id: 'p18', name: 'Colgate Strong Teeth Toothpaste 300g Combo', category: 'Personal Care', price: 195, cost: 155, stockLevel: 30, marginPercent: 20.5 },
  { id: 'p19', name: 'Vim Dishwash Gel Lemon 750ml', category: 'Household Care', price: 170, cost: 135, stockLevel: 42, marginPercent: 20.6 },
  { id: 'p20', name: 'Dabur Honey 500g Squeezy', category: 'Grocery', price: 225, cost: 180, stockLevel: 20, marginPercent: 20.0 }
];

const FIRST_NAMES = [
  'Ramesh', 'Sunita', 'Vikram', 'Ananya', 'Harpreet', 'Deepa', 'Neha', 'Aniyawari',
  'Mohit', 'Pooja', 'Amit', 'Sanjay', 'Preeti', 'Karan', 'Meenakshi', 'Gaurav',
  'Tarun', 'Shweta', 'Pankaj', 'Ritu', 'Manish', 'Suman', 'Alok', 'Bhavna',
  'Vikas', 'Kavita', 'Nitin', 'Divya', 'Ashish', 'Seema', 'Varun', 'Swati'
];

const LAST_NAMES = [
  'Sharma', 'Kumar', 'Devi', 'Malhotra', 'Singh', 'Gupta', 'Verma', 'Nair',
  'Saxena', 'Agarwal', 'Joshi', 'Kapoor', 'Mehta', 'Chawla', 'Bhasin', 'Bhatia',
  'Arora', 'Khurana', 'Seth', 'Tandon', 'Aggarwal', 'Goyal', 'Bansal', 'Rathore'
];

const LOCALITIES = [
  'Lajpat Nagar II', 'Lajpat Nagar IV', 'Amar Colony', 'Vikram Vihar',
  'Defense Colony', 'Kailash Colony', 'Moolchand', 'South Extension'
];

// Generate 500 Indian Customers
export function generateCustomers(): Customer[] {
  seed = 101;
  const customers: Customer[] = [];
  const now = new Date('2026-08-22T19:50:00+05:30');

  for (let i = 1; i <= 500; i++) {
    const fName = randomChoice(FIRST_NAMES);
    const lName = randomChoice(LAST_NAMES);
    const name = `${fName} ${lName}`;
    const phone = `+91 ${randomInt(98000, 99999)} ${randomInt(10000, 99999)}`;
    const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${randomInt(10, 99)}@gmail.com`;
    const location = randomChoice(LOCALITIES);

    // Days ago for first order (between 1 and 90)
    const firstDaysAgo = randomInt(10, 90);
    const firstOrderDate = new Date(now.getTime() - firstDaysAgo * 86400000).toISOString();

    // Determine tier & frequency
    const isHighValueProb = i <= 50; // top 50
    let totalOrders = 1;
    let isDormant = false;
    let daysAgoLastOrder = randomInt(0, 7);

    if (isHighValueProb) {
      totalOrders = randomInt(6, 18);
      // 47 high-value customers become dormant (last order 14-30 days ago) for pattern detection
      if (i <= 47) {
        isDormant = true;
        daysAgoLastOrder = randomInt(14, 32);
      } else {
        daysAgoLastOrder = randomInt(0, 5);
      }
    } else if (i <= 200) {
      totalOrders = randomInt(3, 7);
      daysAgoLastOrder = randomInt(1, 15);
    } else {
      totalOrders = randomInt(1, 3);
      daysAgoLastOrder = randomInt(1, 45);
    }

    const lastOrderDate = new Date(now.getTime() - daysAgoLastOrder * 86400000).toISOString();
    const avgBasket = isHighValueProb ? randomInt(750, 1450) : randomInt(250, 650);
    const totalSpent = totalOrders * avgBasket;

    let tier: Customer['tier'] = 'Occasional';
    if (isHighValueProb) tier = 'High Value';
    else if (totalOrders >= 4) tier = 'Regular';
    else if (daysAgoLastOrder <= 7) tier = 'New';

    customers.push({
      id: `cust_${1000 + i}`,
      name,
      phone,
      email,
      location,
      totalSpent,
      totalOrders,
      firstOrderDate,
      lastOrderDate,
      favoriteCategory: randomChoice(['Grocery', 'Snacks & Instant', 'Dairy & Cold Storage', 'Beverages']),
      tier,
      isDormant
    });
  }

  return customers;
}

// Generate 5,000+ Transactions across 90 days
export function generateTransactions(customers: Customer[]): Transaction[] {
  seed = 2022;
  const transactions: Transaction[] = [];
  const now = new Date('2026-08-22T19:50:00+05:30');
  let txCounter = 100001;

  // We generate day by day for 90 days
  for (let dayOffset = 89; dayOffset >= 0; dayOffset--) {
    const currentDate = new Date(now.getTime() - dayOffset * 86400000);
    const dayOfWeek = currentDate.getDay(); // 0 = Sun, 1 = Mon, etc.
    const isToday = dayOffset === 0;

    // Pattern 1: Monday dip (-18% volume)
    // Pattern 2: Weekend surge (+25% volume)
    let baseTxCount = 55;
    if (dayOfWeek === 1) baseTxCount = 44; // Monday dip
    else if (dayOfWeek === 6 || dayOfWeek === 0) baseTxCount = 72; // Weekend surge

    if (isToday) baseTxCount = 68; // Strong today ₹48,320 target

    const txCountForDay = isToday ? 68 : randomInt(baseTxCount - 5, baseTxCount + 8);

    for (let i = 0; i < txCountForDay; i++) {
      // Hour distribution: Peak 18 (6 PM) to 21 (9 PM) - 31% surge
      let hour = randomInt(9, 21);
      if (pseudoRandom() < 0.42) {
        hour = randomInt(18, 21); // 6-9 PM peak
      }

      const minute = randomInt(0, 59);
      const txDate = new Date(currentDate);
      txDate.setHours(hour, minute, randomInt(0, 59));

      const customer = randomChoice(customers);

      // Select items with Pattern: Atta + Oil bundle affinity
      const itemsCount = randomInt(1, 4);
      const items: Transaction['items'] = [];
      const hasAtta = pseudoRandom() < 0.35;

      if (hasAtta) {
        const attaProd = PRODUCTS_CATALOG.find(p => p.id === 'p1')!;
        items.push({ ...attaProd, quantity: 1 });

        // 2.4x high probability of adding sunflower oil!
        if (pseudoRandom() < 0.68) {
          const oilProd = PRODUCTS_CATALOG.find(p => p.id === 'p2')!;
          items.push({ ...oilProd, quantity: 1 });
        }
      } else {
        const prod = randomChoice(PRODUCTS_CATALOG);
        items.push({ ...prod, quantity: randomInt(1, 2) });
      }

      // Add additional random items
      for (let k = 1; k < itemsCount; k++) {
        const p = randomChoice(PRODUCTS_CATALOG);
        if (!items.some(it => it.id === p.id)) {
          items.push({ ...p, quantity: 1 });
        }
      }

      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Payment method: 78% UPI, 14% Card, 5% Payment Link, 3% Netbanking
      const methodRoll = pseudoRandom();
      let method: PaymentMethod = 'upi';
      let vpa: string | undefined = `${customer.phone.replace(/\D/g, '')}@okaxis`;
      let cardNetwork: string | undefined = undefined;

      if (methodRoll > 0.78 && methodRoll <= 0.92) {
        method = 'card';
        vpa = undefined;
        cardNetwork = randomChoice(['Visa', 'Mastercard', 'RuPay']);
      } else if (methodRoll > 0.92 && methodRoll <= 0.97) {
        method = 'payment_link';
        vpa = undefined;
      } else if (methodRoll > 0.97) {
        method = 'netbanking';
        vpa = undefined;
      }

      // Status: 96% captured, 3% failed, 1% refunded
      const statusRoll = pseudoRandom();
      let status: TransactionStatus = 'captured';
      if (statusRoll > 0.96 && statusRoll <= 0.99) status = 'failed';
      else if (statusRoll > 0.99) status = 'refunded';

      transactions.push({
        id: `pay_${txCounter++}`,
        orderId: `order_${txCounter}`,
        amount: totalAmount,
        status,
        method,
        vpa,
        cardNetwork,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerId: customer.id,
        items,
        timestamp: txDate.toISOString(),
        hourOfDay: hour,
        dayOfWeek
      });
    }
  }

  // Adjust today's transactions so today's revenue equals exactly ₹48,320 for exact prompt alignment!
  const todayDateStr = now.toISOString().split('T')[0];
  const todayCaptured = transactions.filter(t => t.timestamp.startsWith(todayDateStr) && t.status === 'captured');
  const currentTodaySum = todayCaptured.reduce((acc, t) => acc + t.amount, 0);

  if (todayCaptured.length > 0 && currentTodaySum > 0) {
    const factor = 48320 / currentTodaySum;
    todayCaptured.forEach(t => {
      t.amount = Math.round(t.amount * factor);
    });
  }

  return transactions;
}

// Generate Settlements based on transactions
export function generateSettlements(transactions: Transaction[]): Settlement[] {
  const settlements: Settlement[] = [];
  const now = new Date('2026-08-22T19:50:00+05:30');

  // Tomorrow's settlement expected: ₹31,200 net
  settlements.push({
    id: 'set_tomorrow',
    amount: 31837,
    fees: 540,
    tax: 97,
    netAmount: 31200,
    status: 'pending',
    utr: 'AXISCN008912341',
    settlementDate: new Date(now.getTime() + 86400000).toISOString().split('T')[0],
    periodStart: new Date(now.getTime() - 86400000).toISOString(),
    periodEnd: now.toISOString(),
    transactionCount: 42
  });

  // Past 10 settlements
  for (let i = 1; i <= 10; i++) {
    const sDate = new Date(now.getTime() - i * 86400000);
    const gross = randomInt(28000, 45000);
    const fee = Math.round(gross * 0.018);
    const tax = Math.round(fee * 0.18);
    const net = gross - fee - tax;

    settlements.push({
      id: `set_${100 + i}`,
      amount: gross,
      fees: fee,
      tax,
      netAmount: net,
      status: 'settled',
      utr: `HDFCN00${78120 + i}`,
      settlementDate: sDate.toISOString().split('T')[0],
      periodStart: new Date(sDate.getTime() - 86400000).toISOString(),
      periodEnd: sDate.toISOString(),
      transactionCount: randomInt(35, 58)
    });
  }

  return settlements;
}

// Generate Expense Ledger
export function generateExpenses(): Expense[] {
  const now = new Date('2026-08-22T19:50:00+05:30');
  const todayStr = now.toISOString().split('T')[0];
  const tomorrowStr = new Date(now.getTime() + 86400000).toISOString().split('T')[0];
  const nextWeekStr = new Date(now.getTime() + 5 * 86400000).toISOString().split('T')[0];

  return [
    {
      id: 'exp_01',
      category: 'Supplier',
      payee: 'Amul Dairy Distributors Delhi',
      amount: 18500,
      dueDate: tomorrowStr,
      status: 'pending',
      paymentMethod: 'UPI / Bank Transfer',
      notes: 'Weekly milk, butter & cold storage replenishment'
    },
    {
      id: 'exp_02',
      category: 'Inventory',
      payee: 'Metro Cash & Carry Wholesale',
      amount: 12850,
      dueDate: todayStr,
      status: 'paid',
      paymentMethod: 'Razorpay Corporate Card',
      notes: 'Atta 10kg, Cooking Oil 15L tins & FMCG stock'
    },
    {
      id: 'exp_03',
      category: 'Operations',
      payee: 'BSES Rajdhani Power Limited',
      amount: 4800,
      dueDate: nextWeekStr,
      status: 'scheduled',
      paymentMethod: 'Auto-Debit',
      notes: 'Store electricity & refrigeration'
    },
    {
      id: 'exp_04',
      category: 'Rent & Utilities',
      payee: 'Lajpat Nagar Market Traders Assoc.',
      amount: 25000,
      dueDate: new Date(now.getTime() + 10 * 86400000).toISOString().split('T')[0],
      status: 'scheduled',
      paymentMethod: 'Netbanking',
      notes: 'Store monthly rent'
    },
    {
      id: 'exp_05',
      category: 'Marketing',
      payee: 'WhatsApp Business API & Razorpay Offers',
      amount: 1500,
      dueDate: todayStr,
      status: 'paid',
      paymentMethod: 'Razorpay Direct',
      notes: 'SMS broadcast for festival weekend'
    }
  ];
}
