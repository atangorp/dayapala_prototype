import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7071/api';

export interface Supply {
  id: number;
  farmer: string;
  commodity: string;
  volume: string;
  village: string;
  price: string;
  status: string;
}

export const useSupplies = () => {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSupplies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/supplies`);
      setSupplies(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data pasokan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  return { supplies, loading, error, refresh: fetchSupplies };
};
