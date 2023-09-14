import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseStyle } from "../../styles/baseStyle";

const Timeout = ({ fetchedAt }: { fetchedAt: number }) => {
    const [data, setData] = useState(getTimeElapsedMessage(fetchedAt));

    useEffect(() => {
        const intervalId = setInterval(() => setData(getTimeElapsedMessage(fetchedAt)), 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [fetchedAt]);

    return <StyledFetchedAt>{data}</StyledFetchedAt>
}

const getTimeElapsedMessage = (fetchedAt: number) => {
    const currentTime = moment();
    const fetchedTime = moment(fetchedAt);
    const elapsedSeconds = currentTime.diff(fetchedTime, 'seconds');

    if (elapsedSeconds < 10) {
        return 'Actual now';
    } else if (elapsedSeconds < 60) {
        return `Actual ${Math.floor(elapsedSeconds / 10) * 10} sec ago`;
    } else {
        const elapsedMinutes = currentTime.diff(fetchedTime, 'minutes');
        if (elapsedMinutes < 60) {
            return `Actual ${Math.floor(elapsedMinutes)} min ago`;
        } else {
            const elapsedHours = currentTime.diff(fetchedTime, 'hours');
            return `Actual ${Math.floor(elapsedHours)} hr ago`;
        }
    }
};

const StyledFetchedAt = styled.span`
  font-size: ${baseStyle.input.timeout.fontSize};
  color: ${(props) => props.theme.type === "light" ? "#222222" : "#ffffff"};
`

export default Timeout;
