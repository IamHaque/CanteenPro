import { CommonService } from '.';
import { TransactionApiResponse } from '../utils/auth.types';
import { ITransaction } from '../utils/table';

async function getAllTransactions(isAdmin: boolean): Promise<ITransaction[]> {
  try {
    const endpoint = isAdmin ? 'transaction/all/' : 'transaction/';
    const response = await fetch(`${CommonService.BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: CommonService.getHeaders(),
    });

    const responseData = (await response.json()) as TransactionApiResponse;

    if (!response.ok && !responseData?.error)
      throw new Error('Failed to fetch data');

    if (responseData?.error || !responseData?.data?.items)
      throw new Error('Failed to fetch data');

    const allTransactions = responseData?.data?.items.map(
      (transaction, index): ITransaction => {
        return {
          id: index,
          name: transaction.user.name,
          quantity: transaction.quantity,
          userId: transaction.user.userId,
          price: transaction.product.price,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          title: transaction.product.title,
          productId: transaction.product.productId,
        };
      }
    );
    return allTransactions;
  } catch (error) {
    return [];
  }
}

export default { getAllTransactions };
