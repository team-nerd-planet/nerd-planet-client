import styled from "@emotion/styled";

type LikeProps = {
    value?: number;
    onClick?: () => void;
}

const Like = ({
    value = 0,
    onClick
}: LikeProps) => {
    return (<div style={{
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        gap: "4px"
    }}>
        <Box onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_376_142)">
                    <path d="M12 22.5C11.8387 22.5 11.6775 22.4482 11.5425 22.3447C11.133 22.029 1.5 14.547 1.5 8.25C1.5 4.94175 4.19175 2.25 7.5 2.25C10.8082 2.25 13.5 4.94175 13.5 8.25C13.5 8.664 13.1648 9 12.75 9C12.336 9 12 8.664 12 8.25C12 5.76825 9.98175 3.75 7.5 3.75C5.01825 3.75 3 5.76825 3 8.25C3 13.1003 10.1077 19.2397 12 20.7892C13.8915 19.2397 21 13.095 21 8.25C21 5.76825 18.9818 3.75 16.5 3.75C15.8287 3.75 15.183 3.894 14.5807 4.1775C14.2057 4.3545 13.758 4.19325 13.5825 3.819C13.4062 3.444 13.5667 2.99775 13.941 2.82075C14.745 2.442 15.606 2.25 16.5 2.25C19.8083 2.25 22.5 4.94175 22.5 8.25C22.5 14.547 12.867 22.029 12.4575 22.3447C12.3225 22.4482 12.1613 22.5 12 22.5Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_376_142">
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

export default Like;

const Box = styled.div`
    width: 24px;
    height: 24px;
    fill: white;
    cursor: pointer;
`;
