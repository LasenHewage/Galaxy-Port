import { render, screen } from '@testing-library/react';
import Mars from '../pages/Mars';

describe('Mars component', () => {
    it('renders correctly', () => {
        render(<Mars />);

        // Check if the main heading is rendered
        const mainHeading = screen.getByText('MARS');
        expect(mainHeading).toBeInTheDocument();

        // Check if the quote is rendered
        const quote = screen.getByText(/The first human beings to land on Mars should not come back to Earth/i);
        expect(quote).toBeInTheDocument();

        // Check if the rover selection dropdown is rendered
        const roverSelection = screen.getByRole('combobox');
        expect(roverSelection).toBeInTheDocument();
    });

    // Add more test cases as needed...
});
