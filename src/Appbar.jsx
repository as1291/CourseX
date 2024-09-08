import {Button, Link, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
    return <div style={{
        display:"flex",
        justifyContent:"space-between",
        padding:4
    }}>
        <div><Typography variant="h6"> CourseX</Typography></div>
        <div style={{
            display:"flex",
        }}>
            <div style={{
                marginRight:10
            }}>
                {/* <Link href={"/register"}> */}
                <Button
            onClick={() => {
                // history.push("/register");
                navigate("/register")
            }}
            >Sign Up</Button>
            {/* </Link> */}
            </div>
            <div>
            
            <Button
            onClick={()=>{
                navigate("/login");
            }}>Sign In</Button>
            </div>
        </div>
    </div>
}

export default Appbar;