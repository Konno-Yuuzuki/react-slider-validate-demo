import React, { FC, useCallback, useLayoutEffect, useRef, useMemo, useEffect } from 'react';
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
	movedX?: number;
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
	operation,
	movedX,
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

	const translateX = useMemo(() => {
		if (operation === 'clip') {
			if (movedX) {
				return {
					transform: `translateX(${movedX}px)`,
				};
			}
			return {
				transform: 'translateX(0)',
				transition: 'transform .5s ease',
			};
		}
		return {};
	}, [movedX]);

	useEffect(() => {}, []);

	return (
		<canvas
			ref={(node) => {
				ctx.current = node ? node.getContext('2d') : null;
			}}
			className={className}
			style={{ left: -x, ...translateX }}
			width={width}
			height={height}
		/>
	);
};

export default CanvasBG;
