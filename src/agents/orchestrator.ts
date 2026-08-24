import { AgentTools } from './tools';
import { AgentMessage, ToolExecutionStep } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class AgentOrchestrator {
  private static apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  public static async processQuery(
    userPrompt: string,
    forcedAgent?: 'bazaar' | 'munim' | 'joint'
  ): Promise<AgentMessage> {
    const promptLower = userPrompt.toLowerCase();

    // Determine agent persona
    let agentType: 'bazaar' | 'munim' | 'joint' = forcedAgent || 'bazaar';
    if (!forcedAgent) {
      if (
        promptLower.includes('afford') ||
        promptLower.includes('cost') ||
        promptLower.includes('campaign') ||
        promptLower.includes('offer this weekend') ||
        promptLower.includes('budget') ||
        promptLower.includes('weekend offer') ||
        (promptLower.includes('run') && promptLower.includes('offer'))
      ) {
        agentType = 'joint';
      } else if (
        promptLower.includes('cash') ||
        promptLower.includes('money') ||
        promptLower.includes('settlement') ||
        promptLower.includes('hisaab') ||
        promptLower.includes('expense') ||
        promptLower.includes('supplier') ||
        promptLower.includes('earn') ||
        promptLower.includes('jama') ||
        promptLower.includes('kharcha')
      ) {
        agentType = 'munim';
      } else {
        agentType = 'bazaar';
      }
    }

    const toolSteps: ToolExecutionStep[] = [];
    const messageId = `msg_${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    toolSteps.push({
      toolName: 'orchestrator_route',
      description: `Routed to ${agentType.toUpperCase()} Agent`,
      status: 'completed'
    });

    // Handle Joint Collaboration Mode
    if (agentType === 'joint' || promptLower.includes('weekend offer') || promptLower.includes('afford')) {
      toolSteps.push({
        toolName: 'bazaar.get_customer_segments',
        description: 'Analyzing customer purchasing frequency and peak demand hours...',
        status: 'completed',
        resultSnippet: 'Found 47 high-value dormant customers. Peak demand: Saturday 6–9 PM.'
      });

      toolSteps.push({
        toolName: 'munim.get_cash_position',
        description: 'Calculating projected cash flow & upcoming settlements...',
        status: 'completed',
        resultSnippet: '₹31,200 settlement expected tomorrow. Free cash projected: ₹42,700.'
      });

      return {
        id: messageId,
        sender: 'joint',
        text: `Joint Recommendation from Bazaar & Munim\n\nYes, Rajesh! You can comfortably run a weekend campaign. Your projected cash position remains healthy while target repeat customer engagement will drive high-margin sales.`,
        timestamp,
        toolSteps,
        structuredData: {
          type: 'joint_recommendation',
          jointDetails: {
            bazaarAnalysis: 'Customer demand peaks Saturday 6:00–9:00 PM. Target 47 dormant high-value customers who haven\'t purchased in 14 days.',
            munimAnalysis: 'Tomorrow\'s settlement brings ₹31,200. After ₹18,500 supplier dues, free cash is ₹42,700. Maximum recommended marketing spend is ₹6,500.',
            recommendation: 'Launch ₹50 OFF on orders above ₹499 (Code: KITCHEN50) active Saturday 6–9 PM.',
            expectedUpside: '+8% to +12% order volume (Est. +₹8,500 gross revenue)',
            budget: '₹4,800 projected redemption cost',
            ctaText: 'Launch Campaign Now'
          }
        }
      };
    }

    // Handle Bazaar Specific Queries
    if (agentType === 'bazaar') {
      if (promptLower.includes('drop') || promptLower.includes('monday') || promptLower.includes('down')) {
        toolSteps.push({
          toolName: 'bazaar.analyze_sales_trend',
          description: 'Analyzing 90-day transaction logs for revenue anomalies...',
          status: 'completed'
        });

        return {
          id: messageId,
          sender: 'bazaar',
          text: `Analysis for Monday Sales Drop\n\nMonday revenue was down 18% (₹36,200 collected vs usual ₹44,000).\n\nMain Causes Identified:\n• Evening (6–9 PM) orders fell 32%\n• Repeat customer visits fell 21%\n• Average order value stayed steady (₹705)\n\nThe drop wasn't caused by lower basket size — fewer returning customers visited your store during evening hours.\n\nSuggested Action: Send a targeted ₹50 WhatsApp voucher to regular buyers who haven't ordered this week.`,
          timestamp,
          toolSteps,
          structuredData: {
            type: 'sales_summary',
            metrics: [
              { label: 'Monday Sales', value: '₹36,200', change: '-18%', isPositive: false },
              { label: 'Evening Orders (6-9 PM)', value: '19 orders', change: '-32%', isPositive: false },
              { label: 'Repeat Customer Visits', value: '14 visits', change: '-21%', isPositive: false },
              { label: 'Avg Order Value', value: '₹705', change: '+0.4%', isPositive: true }
            ]
          }
        };
      }

      if (promptLower.includes('target') || promptLower.includes('customer') || promptLower.includes('best')) {
        toolSteps.push({
          toolName: 'bazaar.get_customer_segments',
          description: 'Filtering 500 customer profiles by purchase recency & monetary value...',
          status: 'completed'
        });

        return {
          id: messageId,
          sender: 'bazaar',
          text: `Target Customer Segment Identified\n\nI recommend targeting your 47 High-Value Dormant Customers.\n\nWhy this group?\n• They have ordered 3+ times at Sharma General Store in the last 60 days.\n• They haven't placed an order in the last 14 days.\n• Their average basket size is ₹940 (32% higher than store average).\n\nSuggested Campaign: Send a personalized payment link offer for "Kitchen Essentials Combo" with ₹100 OFF on orders above ₹999.`,
          timestamp,
          toolSteps,
          structuredData: {
            type: 'customer_segment',
            metrics: [
              { label: 'Target Audience', value: '47 Customers', isPositive: true },
              { label: 'Avg Past Basket', value: '₹940', isPositive: true },
              { label: 'Expected Revival Rate', value: '35 - 40%', isPositive: true },
              { label: 'Estimated Winback Revenue', value: '₹14,800', isPositive: true }
            ]
          }
        };
      }

      // Default Bazaar response
      toolSteps.push({
        toolName: 'bazaar.get_sales_summary',
        description: 'Fetching today\'s transaction performance metrics...',
        status: 'completed'
      });

      return {
        id: messageId,
        sender: 'bazaar',
        text: `Business Overview & Growth Insights\n\nYour business had a strong day today! You collected ₹48,320 across 68 transactions (+14.2% vs your normal Tuesday).\n\nKey Observations:\n1. Evening Surge: 6:00 PM – 9:00 PM accounted for 44% of total daily revenue.\n2. Product Affinity: Customers buying Fortune Wheat Atta 5kg bought Sunflower Oil 1L 68% of the time.\n3. Recommendation: Bundle Atta + Oil into a "Monthly Kitchen Combo" at ₹499 to increase average basket size by ₹85.`,
        timestamp,
        toolSteps,
        structuredData: {
          type: 'sales_summary',
          metrics: [
            { label: "Today's Collection", value: '₹48,320', change: '+14.2%', isPositive: true },
            { label: 'Total Orders', value: '68', change: '+8 orders', isPositive: true },
            { label: 'Average Order Value', value: '₹710', change: '+5.6%', isPositive: true },
            { label: 'UPI Share', value: '78%', change: '+3%', isPositive: true }
          ]
        }
      };
    }

    // Handle Munim Specific Queries
    if (promptLower.includes('cash') || promptLower.includes('settlement') || promptLower.includes('money') || promptLower.includes('hisaab') || promptLower.includes('afford')) {
      toolSteps.push({
        toolName: 'munim.get_cash_position',
        description: 'Extracting bank ledger, Razorpay TDR fees & expected settlements...',
        status: 'completed'
      });

      return {
        id: messageId,
        sender: 'munim',
        text: `Aaj Ka Hisaab — Financial Health & Cash Position\n\nNamaste Rajesh! Here is your clear money summary:\n\n• Today's Collection (Jama): ₹48,320\n• Today's Expenses (Kharcha): ₹12,850 (Metro Wholesale inventory)\n• Expected Settlement Tomorrow: ₹31,200 (Payout expected in Axis Bank by 11:00 AM)\n• Upcoming Supplier Dues: ₹18,500 (Amul Dairy, due tomorrow)\n• Net 7-Day Free Cash (Bachat): ₹42,700\n\nMunim's Financial Advice: Your cash liquidity is healthy. You can easily clear tomorrow's ₹18,500 Amul supplier bill and still maintain a comfortable ₹24,200 cash cushion.`,
        timestamp,
        toolSteps,
        structuredData: {
          type: 'cash_forecast',
          metrics: [
            { label: "Today's Collection", value: '₹48,320', isPositive: true },
            { label: 'Expected Settlement', value: '₹31,200', isPositive: true },
            { label: 'Supplier Dues', value: '₹18,500', isPositive: false },
            { label: 'Net Available Cash', value: '₹42,700', isPositive: true }
          ]
        }
      };
    }

    // Fallback response
    return {
      id: messageId,
      sender: agentType,
      text: `I have analyzed your request against Sharma General Store's dataset. Your current daily sales stand at ₹48,320 (+14.2%) with ₹31,200 in expected settlements tomorrow. How can Bazaar or Munim assist you further?`,
      timestamp,
      toolSteps
    };
  }
}
