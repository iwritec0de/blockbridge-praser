import React from 'react';
import { render } from '@testing-library/react';
import Column from '../../components/Column';

describe('Column', () => {
	it('renders with wp-block-column class', () => {
		const { container } = render(<Column />);
		expect(container.firstChild).toHaveClass('wp-block-column');
	});

	it('applies additional className', () => {
		const { container } = render(<Column className="extra" />);
		expect(container.firstChild).toHaveClass('extra');
	});

	it('renders children', () => {
		const { getByText } = render(
			<Column>
				<p>content</p>
			</Column>
		);
		expect(getByText('content')).toBeTruthy();
	});
});
