import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ITransaction {
    id:number;
    description: string;
    type: 'income'| 'outcome';
    price:number;
    category:string;
    createdAt:string;
  }

  interface ITransactionContextType {
    transactions:ITransaction[]
  }

  interface ITransactionProviderProps {
        children:ReactNode
  }


export const TransactionContext = createContext({} as ITransactionContextType)
export function TransactionsProvider({children} :ITransactionProviderProps) {
const [transactions, setTransactions] = useState<ITransaction[]>([])
  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()
    setTransactions(data)
  }


  useEffect(() => {
    loadTransactions()
  },[])
return (
   <TransactionContext.Provider value={{transactions}}>
    {children}

   </TransactionContext.Provider>
)
}