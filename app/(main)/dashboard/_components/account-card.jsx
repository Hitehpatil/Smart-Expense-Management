

"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { updateDefaultAccount } from '@/actions/account';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; // To refresh UI properly

const AccountCard = ({ account }) => {
  if (!account) return null;

  const { name, type = "default", balance, id, isDefault } = account;
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter(); // Refresh UI after update

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent page reload

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return; // Prevent unsetting the only default account
    }

    setIsUpdating(true);
    const response = await updateDefaultAccount(id);
    setIsUpdating(false);

    if (response.success) {
      toast.success("Default account updated successfully");
      router.refresh(); // Refresh UI to reflect changes
    } else {
      toast.error(response.error || "Failed to update default account");
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name || "No Name"}
          </CardTitle>
          <Switch 
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={isUpdating}
          />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${balance ? parseFloat(balance).toFixed(2) : "0.00"}
          </div>
          <p className="text-xs text-muted-foreground">
            {type ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() : "Unknown"} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
