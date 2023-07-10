'use client';

import { useLoadedValue } from '@/hooks/useLoadedValue';
import { Instance } from 'mobx-state-tree';
import { ReactNode, createContext, useContext } from 'react';
import { uiModel } from '../(model)/uiModel';
import { loadText } from '../actions';

const TextContext = createContext<Instance<typeof uiModel>>(uiModel.create({ text: '' }));

export interface TextProviderProps {
	initialValue: string | null;
	children: ReactNode;
}

export default function TextProvider({ initialValue, children }: TextProviderProps) {
	console.log('Provider', { initialValue });
	const value = useLoadedValue({ initialValue, loadFunction: () => loadText(true) });

	if (value === null) {
		return null;
	}

	const model = uiModel.create({ text: value });

	return <TextContext.Provider value={model}>{children}</TextContext.Provider>;
}

export function useText() {
	return useContext(TextContext);
}
