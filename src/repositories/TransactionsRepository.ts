import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (lastBalance, transaction) => {
        const { type, value } = transaction;
        if (type === 'income') {
          return {
            ...lastBalance,
            income: lastBalance.income + value,
          };
        }
        return {
          ...lastBalance,
          outcome: lastBalance.outcome + value,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return {
      ...balance,
      total: balance.income - balance.outcome,
    };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const { title, type, value } = data;

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
