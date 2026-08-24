export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'payment_link';
export type TransactionStatus = 'captured' | 'failed' | 'refunded' | 'pending';
export type AgentRole = 'bazaar' | 'munim' | 'joint' | 'user';

export interface TransactionItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: TransactionStatus;
  method: PaymentMethod;
  vpa?: string;
  cardNetwork?: string;
  customerName: string;
  customerPhone: string;
  customerId: string;
  items: TransactionItem[];
  timestamp: string;
  hourOfDay: number;
  dayOfWeek: number;
  tdrFee?: number;
  branch?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  totalSpent: number;
  totalOrders: number;
  firstOrderDate?: string;
  lastOrderDate: string;
  favoriteCategory: string;
  tier: 'VIP' | 'High Value' | 'Regular' | 'Occasional' | 'New';
  isDormant: boolean;
  rfmScore?: string;
  churnRisk?: 'Low' | 'Medium' | 'High';
}

export interface Settlement {
  id: string;
  settlementDate: string;
  amount: number;
  fees: number;
  tax: number;
  netAmount: number;
  utr: string;
  status: 'settled' | 'pending';
  transactionCount: number;
  bankAccount?: string;
  periodStart?: string;
  periodEnd?: string;
}

export interface Expense {
  id: string;
  payee: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'scheduled';
  paymentMethod?: string;
  notes: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  costPrice?: number;
  cost?: number;
  stockLevel?: number;
  salesCount: number;
  revenue: number;
  trendingScore: number;
  marginPercent?: number;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  minOrderValue: number;
  targetCohort?: string;
  targetSegment?: string;
  targetCount?: number;
  expectedUpside?: string;
  expectedRevenueBoost?: number;
  estimatedCost?: number;
  expectedCost?: number;
  roi?: number;
  validityDays?: number;
  suggestedSchedule?: string;
  status?: 'active' | 'draft';
}

export interface BusinessSummary {
  todayRevenue: number;
  todayOrders: number;
  revenueGrowthPercent: number;
  averageOrderValue: number;
  successfulPaymentRate: number;
  refundsCount: number;
  refundsTotal: number;
  expectedSettlementTomorrow: number;
  totalCustomers: number;
  repeatCustomerRate: number;
  estimatedFreeCash7Days: number;
  businessHealthScore: number;
  merchantId?: string;
  activeBranch?: string;
}

export interface ToolExecutionStep {
  toolName: string;
  description: string;
  args?: any;
  resultSnippet?: string;
  latencyMs?: number;
  timestamp?: string;
  status?: string;
}

export interface AgentMessage {
  id: string;
  sender: AgentRole;
  text: string;
  timestamp: string;
  toolSteps?: ToolExecutionStep[];
  structuredData?: {
    type?: string;
    metrics?: { label: string; value: string; change?: string; isPositive?: boolean }[];
    chartData?: any[];
    jointDetails?: {
      bazaarAnalysis: string;
      munimAnalysis: string;
      recommendation?: string;
      budget: string;
      expectedUpside: string;
      ctaText: string;
    };
    rawJsonPayload?: any;
  };
}

export interface WebhookEvent {
  id: string;
  event: 'payment.captured' | 'settlement.processed' | 'refund.created' | 'payout.queued';
  timestamp: string;
  amount: number;
  details: string;
  status: 'success' | 'processing';
}

export interface ScenarioPreset {
  id: string;
  title: string;
  prompt: string;
  targetAgent: 'bazaar' | 'munim' | 'joint';
  description: string;
}

export interface EvalScenario {
  id: string;
  name: string;
  prompt: string;
  expectedAgent: 'bazaar' | 'munim' | 'joint';
  expectedTools: string[];
  evalCriteria: string;
}

export interface EvalResult {
  scenarioId: string;
  name: string;
  passed: boolean;
  actualAgent: AgentRole;
  toolsUsed: string[];
  latencyMs: number;
  factualScore: number;
  notes: string;
}
