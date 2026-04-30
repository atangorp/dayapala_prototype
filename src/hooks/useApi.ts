import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7071/api';

export const useApiData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(`Gagal mengambil data ${endpoint}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, loading, error, refresh: fetchData };
};

// Specific Hooks
export const useSupplies = () => useApiData<any>('supplies');
export const useDemands = () => useApiData<any>('demands');
export const useMatches = () => useApiData<any>('matches');
export const useScores = () => useApiData<any>('scores');
export const useAudit = () => useApiData<any>('audit');
export const useInflation = () => useApiData<any>('inflation');
export const useNotifications = (role?: string) => useApiData<any>(role ? `notifications?role=${role}` : 'notifications');
