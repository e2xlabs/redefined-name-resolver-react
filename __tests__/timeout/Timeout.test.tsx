import React from 'react';
import { render, renderHook } from '@testing-library/react';
import moment from 'moment';
import Timeout from "../../src/components/timeout/Timeout";
import { act } from "react-dom/test-utils";

describe('Timeout component', () => {
    it('SHOULD display "Actual now" when less than 10 seconds elapsed', () => {
        const fetchedAt = moment().subtract(5, 'seconds').valueOf();
        const formatSpy = jest.spyOn(moment.prototype, 'format').mockReturnValue('2023-09-11 12:34:56');

        const { getByText } = render(<Timeout fetchedAt={fetchedAt}/>);
        expect(getByText('Actual now')).toBeInTheDocument();

        formatSpy.mockRestore();
    });

    it('SHOULD display "Actual X sec ago" when between 10 and 59 seconds elapsed', () => {
        const fetchedAt = moment().subtract(30, 'seconds').valueOf();
        const formatSpy = jest.spyOn(moment.prototype, 'format').mockReturnValue('2023-09-11 12:34:56');

        const { getByText } = render(<Timeout fetchedAt={fetchedAt}/>);
        expect(getByText('Actual 30 sec ago')).toBeInTheDocument();

        formatSpy.mockRestore();
    });

    it('SHOULD display "Actual X min ago" when between 1 and 59 minutes elapsed', () => {
        const fetchedAt = moment().subtract(45, 'minutes').valueOf();
        const formatSpy = jest.spyOn(moment.prototype, 'format').mockReturnValue('2023-09-11 12:34:56');

        const { getByText } = render(<Timeout fetchedAt={fetchedAt}/>);
        expect(getByText('Actual 45 min ago. Refreshing...')).toBeInTheDocument();

        formatSpy.mockRestore();
    });

    it('SHOULD display "Actual X hr ago" when 60 minutes or more elapsed', () => {
        const fetchedAt = moment().subtract(2, 'hours').valueOf();
        const formatSpy = jest.spyOn(moment.prototype, 'format').mockReturnValue('2023-09-11 12:34:56');

        const { getByText } = render(<Timeout fetchedAt={fetchedAt}/>);
        expect(getByText('Actual 2 hr ago. Refreshing...')).toBeInTheDocument();

        formatSpy.mockRestore();
    });

    it('should update the message every second', () => {
        const fetchedAt = moment().subtract(2, 'seconds').valueOf();
        jest.useFakeTimers();

        const { getByText, container } = render(<Timeout fetchedAt={fetchedAt}/>);

        expect(getByText("Actual now")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(11000);
        })

        console.log(container.textContent);

        expect(getByText("Actual 10 sec ago")).toBeInTheDocument();

        jest.clearAllTimers();
    });

})
