

// import React, { Suspense } from 'react'
// import { Plus } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
// import AccountCard from './_components/account-card';
// import CreateAccountDrawer from '@/components/create-account-drawer';
// import { getCurrentBudget } from '@/actions/budget';
// import BudgetProgress from './_components/budget-progress';
// import DashboardOverview from './_components/transaction-overview';
// import { transactionSchema } from '@/app/lib/schema';


// async function DashboardPage() {
//   const accounts = await getUserAccounts() || []; // FIX: Ensure accounts is an array
//   const defaultAccount = accounts?.find((account) => account.isDefault);
//  // Get budget for default account
//   let budgetData = null;
//   if (defaultAccount) {
//     budgetData = await getCurrentBudget(defaultAccount.id);
//   }

// const transaction = await getDashboardData();




//   return (
//     <div className='space-y-10'>
// {/* budget progress */}

// {defaultAccount && (
//     <BudgetProgress
//         initialBudget={budgetData?.budget}
//         currentExpenses={budgetData?.currentExpenses || 0}
//       />
// )}

// {/* overview */}

// <Suspense fallback ={"Loading Overview..."}>
//    <DashboardOverview
//         accounts={accounts}
//         transactions={transaction || []}
//       />


// </Suspense>

// {/* account grid */}

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <CreateAccountDrawer> 
//           <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
//             <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
//               <Plus className="h-10 w-10 mb-2" />
//               <p className="text-sm font-medium">Add New Account</p>
//             </CardContent>
//           </Card>
//         </CreateAccountDrawer>

//         {accounts.length > 0 ? (
//           accounts.map((account) => (
//             <AccountCard key={account.id} account={account} />
//           ))
//         ) : (
//           <p className="text-muted-foreground text-sm">No accounts found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

"use client"; // Add this if you're using Next.js App Router

import React, { useState, useEffect, Suspense } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";

// Ensure these are correctly imported (check how they are exported)
import AccountCard from "./_components/account-card";
import CreateAccountDrawer from "@/components/create-account-drawer";
import BudgetProgress from "./_components/budget-progress";
import { DashboardOverview } from "./_components/transaction-overview";


export default function DashboardPage() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedAccounts = await getUserAccounts() || [];
        const fetchedTransactions = await getDashboardData() || [];

        setAccounts(fetchedAccounts);
        setTransactions(fetchedTransactions);

        const defaultAccount = fetchedAccounts.find((acc) => acc.isDefault);
        if (defaultAccount) {
          const budget = await getCurrentBudget(defaultAccount.id);
          setBudgetData(budget);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div className="space-y-10">
      {/* Budget Progress */}
      {budgetData && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Overview */}
      <Suspense fallback={<p>Loading Overview...</p>}>
        <DashboardOverview accounts={accounts} transactions={transactions} />
      </Suspense>

      {/* Account Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <span className="text-sm font-medium">Add New Account</span>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <span className="text-muted-foreground text-sm">No accounts found</span>
        )}
      </div>
    </div>
  );
}
