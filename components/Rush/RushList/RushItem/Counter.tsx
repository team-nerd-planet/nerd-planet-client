import styled from "@emotion/styled";

type CounterProps = {
    value?: number;
    onClick?: () => void;
}

const Counter = ({
    value = 0,
    onClick
}: CounterProps) => {
    return (<div style={{
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        gap: "4px"
    }}>
        <Box onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_376_160)">
                    <path d="M12.0001 18.75C8.80135 18.75 5.77435 17.3948 3.47485 14.934C3.1921 14.6318 3.2086 14.157 3.51085 13.8743C3.81385 13.5915 4.28785 13.608 4.57135 13.9103C6.5836 16.0643 9.22135 17.25 12.0001 17.25C15.5724 17.25 18.8619 15.2963 20.8801 12C18.8626 8.70375 15.5724 6.75 12.0001 6.75C8.2966 6.75 4.8961 8.85075 2.9026 12.3698C2.6986 12.7305 2.2396 12.858 1.88035 12.6525C1.5196 12.4485 1.3936 11.991 1.5976 11.6302C3.86035 7.635 7.74985 5.25 12.0001 5.25C16.2511 5.25 20.1399 7.635 22.4026 11.6302C22.5324 11.8597 22.5324 12.1403 22.4026 12.369C20.1399 16.3643 16.2511 18.75 12.0001 18.75Z" fill="white" />
                    <path d="M12 15.75C9.93225 15.75 8.25 14.0677 8.25 12C8.25 9.93225 9.93225 8.25 12 8.25C14.0677 8.25 15.75 9.93225 15.75 12C15.75 14.0677 14.0677 15.75 12 15.75ZM12 9.75C10.7595 9.75 9.75 10.7595 9.75 12C9.75 13.2405 10.7595 14.25 12 14.25C13.2405 14.25 14.25 13.2405 14.25 12C14.25 10.7595 13.2405 9.75 12 9.75Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_376_160">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </Box>
        <div style={{
            fontSize: "16px",
            color: "white"
        }}>{value}</div>
    </div>)
}

export default Counter;

const Box = styled.div`
    width: 24px;
    height: 24px;
    fill: white;
    cursor: pointer;
`;