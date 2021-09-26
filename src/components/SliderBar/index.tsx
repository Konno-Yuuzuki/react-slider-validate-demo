/**
 * 滑动条
 */

import React, {
	MouseEvent,
	FC,
	useMemo,
	useState,
	CSSProperties,
	useCallback,
	useRef,
	useLayoutEffect,
	memo,
	useEffect,
} from 'react';
import styles from './index.module.css';

interface Props {
	x?: number;
	targetX: number;
	onDrag?: (x: number, reset?: boolean) => void;
}

const SliderBar: FC<Props> = memo(({ x, targetX, onDrag }) => {
	const [canMoved, setCanMoved] = useState(false);
	const [startX, setStartX] = useState(0);
	const [endX, setEndX] = useState(0);
	const [validated, setValidated] = useState(false);

	const trackRef = useRef<HTMLDivElement | null>(null);
	const sliderRef = useRef<HTMLDivElement | null>(null);

	const trackClientWidth = useRef(0);
	const sliderWidthRef = useRef(0);

	/**
	 * 计算当前移动多少距离
	 */
	useEffect(() => {
		const diff = endX - startX;
		const maxDiff = trackClientWidth.current - sliderWidthRef.current;
		const translateX = diff > 0 ? (diff >= maxDiff ? maxDiff : diff) : 0;
		if (canMoved && onDrag) {
			onDrag(translateX);
		} else if (!validated && onDrag) {
			onDrag(0);
		}
	}, [canMoved, startX, endX, onDrag]);

	/**
	 * 返回当前滑块的样式
	 */
	const transformStyle = useMemo<CSSProperties>(() => {
		if (x) {
			if (canMoved || validated) {
				return {
					transform: `translateX(${x}px)`,
					backgroundColor: validated ? 'green' : canMoved ? 'blue' : '#fff',
				};
			}
		}
		return {
			transform: `translateX(0)`,
			transition: 'transform 0.5s ease',
		};
	}, [startX, endX]);

	/**
	 * 获取滑块的宽度和滑轨的长度
	 */
	useLayoutEffect(() => {
		if (trackRef.current && sliderRef.current) {
			trackClientWidth.current = trackRef.current.clientWidth;
			sliderWidthRef.current = sliderRef.current?.clientWidth;
		}
	}, []);

	/**
	 * 验证拼图是否重叠
	 */
	const handleValidate = useCallback(() => {
		if (x) {
			setValidated(Math.abs(targetX - x) <= 3);
		}
	}, [x, targetX]);

	/**
	 * 鼠标点击
	 */
	const handleMouseDown = useCallback(
		(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			setCanMoved(true);
			setStartX(event.clientX);
		},
		[]
	);

	/**
	 * 鼠标移动
	 */
	const handleMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			if (canMoved) {
				setEndX(event.clientX);
			}
			if (handleValidate) {
				handleValidate();
			}
		},
		[canMoved, handleValidate]
	);

	/**
	 * 鼠标弹起
	 */
	const handleMouseUp = useCallback(() => {
		setCanMoved(false);
		if (!validated) {
			setEndX(0);
			setStartX(0);
		}
	}, [validated]);

	/**
	 * 鼠标滑出滑轨
	 */
	const handleMouseOut = useCallback(() => {
		setCanMoved(false);
		setEndX(0);
		setStartX(0);
	}, []);

	const sliderStyle = useCallback(() => {
		if (sliderRef.current) {
			if (validated) {
				sliderRef.current.style.setProperty('--backgroundColor', 'green');
				sliderRef.current.style.setProperty('--arrow', '#fff');
			} else if (canMoved) {
				sliderRef.current.style.setProperty('--backgroundColor', 'blue');
				sliderRef.current.style.setProperty('--arrow', '#fff');
			} else {
				sliderRef.current.style.setProperty('--backgroundColor', '#fff');
				sliderRef.current.style.setProperty('--arrow', '#000');
			}
		}
	}, [validated, canMoved]);

	useEffect(() => {
		sliderStyle();
	}, [sliderStyle]);

	return (
		<div
			ref={trackRef}
			className={styles.track}
			onMouseMove={canMoved ? handleMouseMove : undefined}
			onMouseUp={canMoved ? handleMouseUp : undefined}
			onMouseLeave={canMoved ? handleMouseOut : undefined}
			data-id='track'
		>
			<div
				id='slider'
				ref={sliderRef}
				className={styles.slider}
				style={transformStyle}
				onMouseDown={handleMouseDown}
				data-testid='slider'
			/>
		</div>
	);
});

export default SliderBar;
