import React from 'react';
import { render } from '@testing-library/react';
import DefaultBlock from '../../components/DefaultBlock';

describe('DefaultBlock', () => {
	it('renders without crashing', () => {
		const { container } = render(<DefaultBlock />);
		expect(container).toBeTruthy();
	});

	it('renders content via html-react-parser', () => {
		const { container } = render(<DefaultBlock content="<p>Hello</p>" />);
		// Parser mock returns the raw string; just verify something rendered
		expect(container.textContent).toBeTruthy();
	});

	it('renders empty content without errors', () => {
		const { container } = render(<DefaultBlock content="" />);
		expect(container).toBeTruthy();
	});
});
