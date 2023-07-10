'use client';

import { useLoadedValue } from '@/hooks/useLoadedValue';
import { ReactNode, createContext, useContext } from 'react';
import { loadText } from './actions';

const TextContext = createContext('');

export interface TextProviderProps {
	initialValue: string | null;
	children: ReactNode;
}

export default function TextProvider({ initialValue, children }: TextProviderProps) {
	const value = useLoadedValue({ initialValue, loadFunction: loadText, defaultValue: '' });

	return <TextContext.Provider value={value}>{children}</TextContext.Provider>;
}

export function useText() {
	return useContext(TextContext);
}
