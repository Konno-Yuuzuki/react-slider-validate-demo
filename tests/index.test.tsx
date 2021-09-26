import React from 'react';
import SliderBar from '../src/components/SliderBar';
import { cleanup, createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('组件单元测试', () => {
	afterEach(cleanup);

	it('快照测试', () => {
		render(<SliderBar targetX={100} />);
		expect(screen).toMatchSnapshot();
	});

	it('slider mouseDown test', () => {
		render(<SliderBar targetX={100} />);

		fireEvent.mouseDown(screen.getByTestId('slider'));

		const sliderStyle = screen.getByTestId('slider').style;

		expect(sliderStyle.getPropertyValue('--backgroundColor')).toContain('blue');
	});

	it('slider validate success', () => {
		render(<SliderBar x={100} targetX={100} />);

		const sliderEle = screen.getByTestId('slider');

		fireEvent.mouseDown(sliderEle);
		fireEvent.mouseMove(sliderEle);
		fireEvent.mouseUp(sliderEle);

		const sliderStyle = screen.getByTestId('slider').style;

		expect(sliderStyle.getPropertyValue('--backgroundColor')).toContain('green');
	});

	it('slider moved distance', async () => {
		let movedX: number = 0;
		const onDrag = (x: number) => {
			console.log('x', x);
			movedX = x;
		};
		render(<SliderBar targetX={100} onDrag={onDrag} />);

		const sliderEle = screen.getByTestId('slider');

		const down = createEvent.mouseDown(sliderEle, {
			clientX: 0,
		});
		fireEvent(sliderEle, down);

		const move = createEvent.mouseMove(window, {
			clientX: 100,
		});
		fireEvent(sliderEle, move);

		const up = createEvent.mouseUp(window, {
			clientX: 100,
		});
		fireEvent(sliderEle, up);

		await waitFor(() => expect(movedX).toEqual(100), { timeout: 5 });
	});
});
