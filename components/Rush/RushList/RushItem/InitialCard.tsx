type InitialCardProps = {
    initial?: string;
    onClick?: () => void;
}

const rainbow = [
    { bgColor: "#FF0000", color: "#FFFFFF" },
    { bgColor: "#FF7F00", color: "#FFFFFF" },
    { bgColor: "#FFFF00", color: "#000000" },
    { bgColor: "#00FF00", color: "#000000" },
    { bgColor: "#0000FF", color: "#FFFFFF" },
    { bgColor: "#4B0082", color: "#FFFFFF" },
    { bgColor: "#9400D3", color: "#FFFFFF" }
];

const InitialCard = ({
    initial = "A",
    onClick
}: InitialCardProps) => {
    const randomColor = rainbow[Math.floor(Math.random() * rainbow.length)];
    return (<div style={{
        cursor: "pointer",
        backgroundColor: "white",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "24px",
        height: "24px",
        borderRadius: "5px"
    }} onClick={onClick}>
        {initial}
    </div>)
}

export default InitialCard;