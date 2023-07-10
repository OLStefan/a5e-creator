'use client';

import {
	StaticExportProviderHandler,
	StaticExportProviderHandlerProps,
} from '@/components/StaticExportProviderHandler';
import { Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { uiModel } from '../(model)/uiModel';
import { loadText } from '../actions';

const TextContext = createContext<Instance<typeof uiModel>>(null!);

export interface TextProviderProps
	extends Pick<StaticExportProviderHandlerProps<typeof uiModel>, 'children' | 'initialValue'> {}

export default function TextProvider({ initialValue, children }: TextProviderProps) {
	return (
		<StaticExportProviderHandler
			Context={TextContext}
			initialValue={initialValue}
			model={uiModel}
			loadFunction={() => loadText(true)}>
			{children}
		</StaticExportProviderHandler>
	);
}

export function useText() {
	return useContext(TextContext);
}
