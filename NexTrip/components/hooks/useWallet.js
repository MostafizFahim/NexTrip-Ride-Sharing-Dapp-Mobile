// components/hooks/useWallet.js
import { useState, useEffect, useCallback } from "react";
import * as walletStorage from "../storage/walletStorage";

export default function useWallet() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load on mount
  useEffect(() => {
    load();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setBalance(await walletStorage.getBalance());
    setLoading(false);
  }, []);

  const add = async (amt) => {
    await walletStorage.addFunds(amt);
    await load();
  };

  const withdraw = async (amt) => {
    const ok = await walletStorage.withdrawFunds(amt);
    await load();
    return ok;
  };

  const reset = async () => {
    await walletStorage.clearWallet();
    await load();
  };

  return { balance, loading, add, withdraw, reset, reload: load };
}
