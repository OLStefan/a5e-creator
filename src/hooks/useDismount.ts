import { useEffect } from 'react';

export default function useDismount(callback: () => void) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => callback, []);
}
