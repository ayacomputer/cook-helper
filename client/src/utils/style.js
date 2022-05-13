export const fontFamily = [
    'Nunito',
    'Comforter',
    'Roboto'
].join(',');

export const styles = {
    mainContainer: {
        background: "rgb(32, 33, 36)",
        height: "100%",
        overFlowX: "scroll"
    },
    cardContainer: {
        maxwidth: "80%",
        margin: "3rem auto",
        background: "inherit",
    },
    wheat: {
        color: "wheat",
        border: "none",
        fontWeight: "bold",
        fontFamily: fontFamily
    },
    green: {
        color: "rgba(150, 202, 27, 0.911)",
        fontFamily: fontFamily,
        fontWeight: "Bold"
    },
    img: {
        background: "rgb(32, 33, 36)",
        width: "50%",
        height: "100px",
        objectFit: "cover top"
    }
};
