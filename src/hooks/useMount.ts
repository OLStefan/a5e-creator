import { EffectCallback, useEffect } from 'react';

export default function useMount(callback: EffectCallback) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, []);
}
