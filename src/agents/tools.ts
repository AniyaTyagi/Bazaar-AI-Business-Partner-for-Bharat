import { AnalyticsService } from '../services/analytics';
import { Offer } from '../types';

export const AgentTools = {
  // --- BAZAAR AGENT TOOLS ---
  get_sales_summary: () => {
    const summary = AnalyticsService.getBusinessSummary();
    return {
      todayRevenue: `₹${summary.todayRevenue.toLocaleString('en-IN')}`,
      todayOrders: summary.todayOrders,
      growthVsNormalTuesday: `+${summary.revenueGrowthPercent}%`,
      averageOrderValue: `₹${summary.averageOrderValue}`,
      refundsTotal: `₹${summary.refundsTotal}`,
      peakHours: '6:00 PM – 9:00 PM (+31% order volume)'
    };
  },

  get_product_performance: () => {
    const products = AnalyticsService.getProductPerformance();
    const top3 = products.slice(0, 3).map(p => `${p.name} (Revenue: ₹${p.revenue.toLocaleString('en-IN')}, Margin: ${p.marginPercent}%)`);
    return {
      topProducts: top3,
      trendingCombination: 'Fortune Atta 5kg + Sunlite Sunflower Oil 1L (2.4x co-purchase multiplier)',
      decliningItem: 'Bikano Rasgulla 1kg (-14% month-over-month volume)'
    };
  },

  get_customer_segments: () => {
    const seg = AnalyticsService.getCustomerSegments();
    return {
      totalCustomers: seg.total,
      highValueCount: seg.highValueCount,
      dormantHighValueCount: seg.dormantHighValueCount,
      repeatCustomerRate: `${Math.round((seg.highValueCount / seg.total) * 100)}%`,
      dormantSegmentDetails: `${seg.dormantHighValueCount} regular customers purchased 3+ times in the last 60 days but have NOT purchased in the last 14 days.`
    };
  },

  analyze_sales_trend: (period: 'today' | '7d' | '30d') => {
    const trend = AnalyticsService.getSalesTrend(period);
    if (period === '7d') {
      return {
        trendSummary: 'Weekly sales reached ₹3,12,000. Peak day was Saturday (₹72,400). Lowest day was Monday (₹36,200).',
        mondayDropReason: 'Monday sales dropped 18%. Root cause: 32% drop in 6-9 PM evening orders from repeat customers.',
        dataPoints: trend
      };
    }
    return { trendSummary: 'Today sales are accelerating (+14.2% vs regular Tuesday).', dataPoints: trend };
  },

  generate_offer: (targetSegment: string = 'dormant_high_value'): Offer => {
    const seg = AnalyticsService.getCustomerSegments();
    const count = targetSegment === 'dormant_high_value' ? seg.dormantHighValueCount : 120;

    return {
      id: `off_${Date.now()}`,
      title: 'Kitchen Combo Special - ₹50 OFF',
      code: 'KITCHEN50',
      discountType: 'flat',
      discountValue: 50,
      minOrderValue: 499,
      targetSegment: '47 Dormant High-Value Customers',
      targetCount: count,
      expectedRevenueBoost: 8500,
      expectedCost: 2350,
      roi: 3.6,
      validityDays: 3,
      suggestedSchedule: 'Saturday 6:00 PM – 9:00 PM'
    };
  },

  estimate_campaign_impact: (campaignCost: number = 4800) => {
    return {
      estimatedRedemptions: '65 - 85 orders',
      projectedNewRevenue: '₹34,000 – ₹42,500',
      totalCampaignCost: `₹${campaignCost.toLocaleString('en-IN')}`,
      netMarginAfterDiscount: '16.4%',
      paybackPeriod: 'Immediate (within weekend)'
    };
  },

  // --- MUNIM AGENT TOOLS ---
  get_cash_position: () => {
    const summary = AnalyticsService.getBusinessSummary();
    const expenses = AnalyticsService.getExpenses();
    const todayExpenses = expenses.filter(e => e.status === 'paid').reduce((s, e) => s + e.amount, 0);

    return {
      todayCollectionGross: `₹${summary.todayRevenue.toLocaleString('en-IN')}`,
      todayPaidExpenses: `₹${todayExpenses.toLocaleString('en-IN')}`,
      expectedSettlementTomorrow: `₹${summary.expectedSettlementTomorrow.toLocaleString('en-IN')}`,
      upcomingSupplierDues: '₹18,500 (Amul Dairy, due tomorrow)',
      estimatedFreeCash7Days: `₹${summary.estimatedFreeCash7Days.toLocaleString('en-IN')}`,
      cashHealthStatus: 'Healthy & Safe'
    };
  },

  get_settlements: () => {
    const settlements = AnalyticsService.getSettlements();
    const next = settlements.find(s => s.status === 'pending');
    return {
      nextSettlementDate: 'Tomorrow (23-Aug-2026)',
      nextSettlementAmount: `₹${next?.netAmount.toLocaleString('en-IN') || '31,200'}`,
      bankUTR: next?.utr || 'AXISCN008912341',
      totalSettledLast7Days: '₹2,45,800',
      razorpayTdrRate: '1.8% + GST'
    };
  },

  get_expenses: () => {
    const expenses = AnalyticsService.getExpenses();
    return {
      totalMonthlyExpenses: '₹62,650',
      upcomingDues: expenses.filter(e => e.status === 'pending' || e.status === 'scheduled'),
      largestCostCenter: 'Inventory & Wholesale Suppliers (68%)',
      paymentCostPercent: '1.9% of total revenue'
    };
  },

  calculate_cash_forecast: () => {
    const forecast = AnalyticsService.getCashForecast();
    const lowestPoint = Math.min(...forecast.map(f => f.balance));
    return {
      sevenDayForecast: forecast,
      lowestProjectedBalance: `₹${lowestPoint.toLocaleString('en-IN')}`,
      cashflowSafetyRating: 'High Buffer (Min balance stays > ₹30,000)'
    };
  },

  calculate_payment_costs: () => {
    return {
      totalRazorpayVolumeThisMonth: '₹11,48,320',
      totalTdrPaid: '₹20,670',
      upiCost: '₹0 (Zero MDR on UPI)',
      cardCost: '1.9% flat',
      netSavingsFromUPI: '₹14,200 saved this month'
    };
  },

  detect_anomalies: () => {
    return {
      detectedAnomalies: [
        { severity: 'medium', title: 'Monday Evening Sales Dip', description: '6-9 PM sales were 32% below seasonal average last Monday.' },
        { severity: 'low', title: 'Dormant High-Value Customers', description: '47 frequent buyers have not ordered in 14+ days.' }
      ]
    };
  }
};
