"use client";

import { baseAPI } from "@/lib/API";
import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(
  url: string,
  options?: RequestInit
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await fetch(baseAPI + url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = (await response.json()) as T;

        setState({
          data: result,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    };

    fetchData();
  }, [url, options]); // Добавьте options в зависимости, если они динамические

  return state;
};

// Пример использования
interface User {
  id: number;
  name: string;
}
