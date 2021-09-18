import React, { CSSProperties, FC, useCallback, useLayoutEffect, useRef } from 'react';
import { drawSlider } from './util';

interface Props {
	width: number;
	height: number;
	bgUrl: string;
	x: number;
	y: number;
	l: number;
	radius: number;
	operation: 'fill' | 'clip';
	className?: string;
	style?: CSSProperties;
}

const CanvasBG: FC<Props> = ({
	width,
	height,
	bgUrl,
	x,
	y,
	l,
	radius,
	className,
	style,
	operation,
}) => {
	const ctx = useRef<CanvasRenderingContext2D | null>(null);

	const addBGImage = useCallback(() => {
		const image = new Image();
		image.onload = () => {
			if (ctx.current) {
				ctx.current.drawImage(image, 0, 0, width, height);
			}
		};
		image.src = bgUrl;
	}, []);

	const hollow = useCallback(() => {
		if (ctx.current) {
			drawSlider(ctx.current, x, y, l, radius, operation);
		}
	}, []);

	useLayoutEffect(() => {
		hollow();
		addBGImage();
	}, [addBGImage]);

	return (
		<canvas
			ref={(node) => {
				ctx.current = node ? node.getContext('2d') : null;
			}}
			className={className}
			style={style}
			width={width}
			height={height}
		/>
	);
};

export default CanvasBG;
