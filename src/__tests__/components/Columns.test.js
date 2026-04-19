import React from 'react';
import { render } from '@testing-library/react';
import Columns from '../../components/Columns';

describe('Columns', () => {
	it('renders with wp-block-columns class', () => {
		const { container } = render(<Columns />);
		expect(container.firstChild).toHaveClass('wp-block-columns');
	});

	it('applies additional className', () => {
		const { container } = render(<Columns className="my-columns" />);
		expect(container.firstChild).toHaveClass('my-columns');
	});

	it('renders children', () => {
		const { getByText } = render(
			<Columns>
				<span>child</span>
			</Columns>
		);
		expect(getByText('child')).toBeTruthy();
	});
});
