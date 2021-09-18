import React, { FC } from 'react';
import bg from './asserts/172912-1509269352c5f8.jpg';
import CanvasBG from './components/CanvasBG';
import useHollowPosition from './hooks/hollowPosition';
import styles from './index.module.css';
import { SliderValidateType } from './types';

const SliderValidate: FC<SliderValidateType> = ({
	width = 320,
	height = 160,
	sliderLength = 42,
	sliderRadius = 9,
	backgroundUrl = bg,
	visible = false,
	text = '',
	refreshIcon,
	onRefresh,
	onSuccess,
	onFail,
}) => {
	const { x, y } = useHollowPosition(width, height, sliderLength, sliderRadius);

	return (
		<div className={styles.sliderValidate}>
			<div className={styles.sliderCanvasContainer}>
				<CanvasBG
					width={width}
					height={height}
					bgUrl={backgroundUrl}
					l={sliderLength}
					radius={sliderRadius}
					x={x}
					y={y}
					operation='fill'
				/>
				<CanvasBG
					className={styles.sliderCanvasSlider}
					style={{
						left: -x,
					}}
					width={width}
					height={height}
					bgUrl={backgroundUrl}
					l={sliderLength}
					radius={sliderRadius}
					x={x}
					y={y}
					operation='clip'
				/>
			</div>
			<div className={styles.sliderContainer}></div>
			<div className={styles.refreshIcon}></div>
		</div>
	);
};

export default SliderValidate;
