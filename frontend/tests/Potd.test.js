import { render, screen } from '@testing-library/react';
import Potd from '../pages/Potd';

describe('Potd component', () => {
    it('renders correctly', () => {
        render(<Potd />);

        // Check if the main header is rendered
        const mainHeader = screen.getByText(/ASTRONOMY/i);
        expect(mainHeader).toBeInTheDocument();

        // Check if the subheader is rendered
        const subHeader = screen.getByText(/PICK OF THE DAY/i);
        expect(subHeader).toBeInTheDocument();

        // Check if the spinner is initially rendered
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();

        // Check if the title is rendered correctly
        const title = screen.getByText(/Loading.../i);
        expect(title).toBeInTheDocument();
    });

    // Add more test cases as needed...
});
