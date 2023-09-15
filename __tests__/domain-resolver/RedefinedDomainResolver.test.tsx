import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import RedefinedDomainResolver from "../../src/components/domain-resolver";
import { API_URL, ASSETS_URL } from "../../src/config";
import { Asset, ResolveResponse, ReverseResponse } from "../../src/types";

Date.now = jest.fn().mockReturnValue(new Date(1694694967494));
jest.mock('axios');
jest.mock('lodash/debounce', () => jest.fn((fn) => fn));
jest.mock("react-loading", () => () =>
    <div>Loading...</div>);
jest.mock('moment', () => {
    return () => jest.requireActual('moment')(new Date(1694694967494));
});

describe('RedefinedDomainResolver Component', () => {
    jest.useFakeTimers();

    const resolveResponse: ResolveResponse = {
        data: [
            {
                address: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                network: 'Network1',
                vendor: 'Vendor1',
                fetchedAt: 1694694957494,
            },
        ],
        completeness: 1,
        processedVendors: ['Vendor1'],
    };

    const reverseResponse: ReverseResponse = {
        data: [
            {
                domain: 'example.com',
                vendor: 'Vendor1',
                fetchedAt: 1694694957494,
            },
        ],
        fetchedAt: 1694694957494,
        completeness: 1,
        processedVendors: ['Vendor1'],
    };

    const assets: Asset[] = [
        {
            key: '1',
            logo: 'logo.png',
            name: 'Asset Name',
            symbol: 'AN',
            type: 'crypto',
        },
        {
            key: '2',
            logo: 'logo2.png',
            name: 'Asset Name2',
            symbol: 'AN2',
            type: 'crypto2',
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('SHOULD render RedefinedDomainResolver component', () => {
        const { getByPlaceholderText } = render(<RedefinedDomainResolver onUpdate={() => {}} />);
        const inputElement = getByPlaceholderText('Type to search');
        expect(inputElement).toBeInTheDocument();
    });

    it('SHOULD update input value and trigger debounce', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: assets });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: resolveResponse });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: reverseResponse });

        const { getByPlaceholderText } = render(<RedefinedDomainResolver onUpdate={() => {}} />);
        const inputElement = getByPlaceholderText('Type to search');

        act(() => {
            fireEvent.change(inputElement, { target: { value: 'example.com' } });
        });

        expect(inputElement).toHaveValue("example.com");
        await waitFor(() => expect((axios.get as jest.Mock)).toHaveBeenCalledWith(ASSETS_URL));
        await waitFor(() => expect((axios.get as jest.Mock)).toHaveBeenCalledWith(API_URL + "/resolve?domain=example.com"));
        await waitFor(() => expect((axios.get as jest.Mock)).toHaveBeenCalledWith(API_URL + "/reverse?address=example.com"));

    });

    it('SHOULD fetch assets on component mount', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: assets });
        render(<RedefinedDomainResolver onUpdate={() => {}} />);

        await waitFor(() => expect((axios.get as jest.Mock)).toHaveBeenCalledTimes(1));
        await waitFor(() => expect((axios.get as jest.Mock)).toHaveBeenCalledWith(ASSETS_URL));
    });

    it('SHOULD display error message on failed API request', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));
        const { getByPlaceholderText, findByText } = render(<RedefinedDomainResolver onUpdate={() => {}} />);
        const inputElement = getByPlaceholderText('Type to search');

        fireEvent.change(inputElement, { target: { value: 'example.com' } });

        const errorText = await findByText('Failed to resolve! API Error');
        expect(errorText).toBeInTheDocument();
    });

    it('SHOULD open dropdown IF input click and content already exists', () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: assets });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: resolveResponse });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: reverseResponse });

        const { getByPlaceholderText, container } = render(<RedefinedDomainResolver onUpdate={() => {}} />);
        const inputElement = getByPlaceholderText('Type to search');

        act(() => {
            fireEvent.change(inputElement, { target: { value: 'example.com' } });
        });

        expect(inputElement).toHaveValue("example.com");

        fireEvent.click(inputElement);
        const dropdownElement = container.querySelector(".dropdown");
        expect(dropdownElement).toBeInTheDocument();
    });

    it('SHOULD update loading state during data fetching', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: assets });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: resolveResponse });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: reverseResponse });

        const { getByPlaceholderText, getByText } = render(<RedefinedDomainResolver onUpdate={() => {}} />);
        const inputElement = getByPlaceholderText('Type to search');

        fireEvent.change(inputElement, { target: { value: 'example.com' } });

        const loadingIndicator = await getByText('Loading...');
        expect(loadingIndicator).toBeInTheDocument();
    });

    it('SHOULD trigger onUpdate callback with selected value', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: assets });
        (axios.get as jest.Mock).mockResolvedValue({ data: resolveResponse });

        const mockOnUpdate = jest.fn();
        const { getByPlaceholderText, getByText } = render(<RedefinedDomainResolver type={"resolve"} onUpdate={mockOnUpdate} />);
        const inputElement = getByPlaceholderText('Type to search');

        await act(() => {
            fireEvent.change(inputElement, { target: { value: 'example.com' } });
        });

        await act(() => {
            fireEvent.click(getByText("0xffff ... ffff"));
        });


        await waitFor(() => {
            expect(mockOnUpdate).toHaveBeenNthCalledWith(1, null);
            expect(mockOnUpdate).toHaveBeenNthCalledWith(2, {
                address: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                network: 'Network1',
                vendor: 'Vendor1',
                type: 'resolve',
                fetchedAt: 1694694957494,
            });
        });
    });

    it('SHOULD not open dropdown when input is empty', () => {
        const { getByPlaceholderText, queryByTestId } = render(<RedefinedDomainResolver onUpdate={() => {}} />);
        const inputElement = getByPlaceholderText('Type to search');

        fireEvent.click(inputElement);
        const dropdown = queryByTestId('dropdown');
        expect(dropdown).toBeNull();
    });

});
