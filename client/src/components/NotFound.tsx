import { Link } from "react-router-dom";
import "../css/NotFound.css";
import { Button } from "@mui/material";

const NotFound = () => {
    return <>
        <div className="container">
            <div className="copy-container center-xy">
                <p>
                    404, page not found.
                </p>
                <span className="handle"></span>

                <Button variant="contained" color="info" sx={{ marginTop: 3 }}>
                    <Link to={"/home"}>Back to Home</Link>
                </Button>
            </div>

        </div>
    </>
}

export default NotFound