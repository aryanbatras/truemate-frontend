import { useState, useCallback } from 'react';

interface ErrorState {
  message: string | null;
  type: 'error' | 'warning' | 'info' | null;
}

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: ErrorState;
}

export const useAsyncState = <T = any>() => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: { message: null, type: null }
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data, error: { message: null, type: null } }));
  }, []);

  const setError = useCallback((message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    setState(prev => ({ ...prev, error: { message, type }, loading: false }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: { message: null, type: null } }));
  }, []);

  const executeAsync = useCallback(async <R = T>(asyncFn: () => Promise<R>): Promise<R | null> => {
    setLoading(true);
    clearError();
    
    try {
      const result = await asyncFn();
      setData(result as T);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setData, setError, clearError]);

  return {
    ...state,
    setLoading,
    setData,
    setError,
    clearError,
    executeAsync
  };
};
