// components/hooks/useRideHistory.js
import { useState, useEffect, useCallback } from "react";
import * as rideStorage from "../storage/rideStorage";

export default function useRideHistory() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load rides on mount
  useEffect(() => {
    load();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setRides(await rideStorage.getRideHistory());
    setLoading(false);
  }, []);

  const add = async (ride) => {
    await rideStorage.addRide(ride);
    await load();
  };

  const clear = async () => {
    await rideStorage.clearRideHistory();
    await load();
  };

  return { rides, loading, add, clear, reload: load };
}
