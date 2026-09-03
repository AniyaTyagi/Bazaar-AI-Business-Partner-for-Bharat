import { AnalyticsService } from '../services/analytics';
import { Transaction, Settlement, Customer, BusinessSummary, Product, Expense, Offer } from '../types';

export class ServerDb {
  public static async getSummary(): Promise<BusinessSummary> {
    return AnalyticsService.getBusinessSummary();
  }

  public static async getTransactions(limit?: number): Promise<Transaction[]> {
    const txs = AnalyticsService.getTransactions();
    return limit ? txs.slice(0, limit) : txs;
  }

  public static async getSettlements(): Promise<Settlement[]> {
    return AnalyticsService.getSettlements();
  }

  public static async getCustomers(): Promise<Customer[]> {
    return AnalyticsService.getCustomers();
  }

  public static async getProducts(): Promise<Product[]> {
    return AnalyticsService.getProductPerformance();
  }

  public static async getExpenses(): Promise<Expense[]> {
    return AnalyticsService.getExpenses();
  }

  public static async getOffers(): Promise<Offer[]> {
    return AnalyticsService.getOffers();
  }

  public static async getAuditLogs() {
    return AnalyticsService.getAuditLogs();
  }
}
