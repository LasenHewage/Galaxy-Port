import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Earth from "../src/pages/Earth.jsx"

// Mock fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockData),
    })
);

// Sample mock data for testing
const mockData = {
    element_count: 3,
    near_earth_objects: {
        "2024-05-05": [{ id: 1, name: 'Asteroid 1' }, { id: 2, name: 'Asteroid 2' }, { id: 3, name: 'Asteroid 3' }],
    },
    image: 'earth-image',
    date: '2024-05-05 12:00:00',
};

describe('Earth component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches Earth image and near Earth asteroids on mount', async () => {
        render(<Earth />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/EPIC/api/natural/images'));
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/neo/rest/v1/feed?start_date='));
        });
    });

    it('renders Earth image and near Earth asteroids after data is fetched', async () => {
        const { getByAltText, getByText } = render(<Earth />);

        await waitFor(() => {
            expect(getByAltText('Earth')).toBeInTheDocument();
            expect(getByText('Asteroid 1')).toBeInTheDocument();
            expect(getByText('Asteroid 2')).toBeInTheDocument();
            expect(getByText('Asteroid 3')).toBeInTheDocument();
        });
    });

    it('downloads Earth image when download button is clicked', async () => {
        const { getByText } = render(<Earth />);
        global.URL.createObjectURL = jest.fn(() => 'mock-url');
        global.document.body.appendChild = jest.fn();

        await waitFor(() => {
            fireEvent.click(getByText('Download'));
        });

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/EPIC/api/natural/images'));
        expect(global.URL.createObjectURL).toHaveBeenCalled();
        expect(global.document.body.appendChild).toHaveBeenCalled();
    });
});
