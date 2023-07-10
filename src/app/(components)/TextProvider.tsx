'use client';

import { StaticExportProviderHandler, StaticExportProviderHandlerProps } from '@/components/StaticExportHandler';
import { Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import loadText from '../(actions)/loadText';
import { uiModel } from '../(model)/uiModel';

const TextContext = createContext<Instance<typeof uiModel>>(null!);

export interface TextProviderProps
	extends Pick<StaticExportProviderHandlerProps<typeof uiModel>, 'children' | 'initialValue'> {}

export default function TextProvider({ initialValue, children }: TextProviderProps) {
	return (
		<StaticExportProviderHandler
			Context={TextContext}
			initialValue={initialValue}
			model={uiModel}
			loadFunction={loadText}>
			{children}
		</StaticExportProviderHandler>
	);
}

export function useTextModel() {
	return useContext(TextContext);
}
