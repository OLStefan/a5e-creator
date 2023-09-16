'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

export default function AntRegistry({ children }: Props) {
	const cache = createCache();
	useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />);
	return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
