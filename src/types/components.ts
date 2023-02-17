import { CSSProperties } from 'react';
import { Primitive } from 'type-fest';

export type DataAttributes = Record<`data-${string}`, Exclude<Primitive, Symbol>>;

export interface BaseProps extends DataAttributes {
	className?: string;
	style?: CSSProperties;
}
