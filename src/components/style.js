import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    button: {

    },
    closeButton: {
        position: "relative",
        bottom: "7.5rem",
        left: "19.8rem",
        fontSize: "2rem",
        cursor: "pointer"
    },
    openButton: {
        position: "absolute!important",
        background: "black",
        color: "black",
        zIndex: "1000000",
        left: "1rem",
        top: "13rem",
        width: "17rem"
    },
    addIcon: {

        position: "relative",
        left: "-1rem",
        fontSize: "1.5rem",
        top: "-1px"
    }

});