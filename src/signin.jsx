import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <center>
        <div
          style={{
            paddingTop: 150,
            marginBottom: 10,
          }}
        >
          <Typography variant="h4">
            welcome back to courseX ! Sign In
          </Typography>
        </div>
      </center>
      <center>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            id="email"
            label="Email"
            type="text"
            variant="outlined"
            value={email}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
          />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              function callback2(data) {
                localStorage.setItem("token", data.token);
                console.log(data.token);
              }

              function callback1(res) {
                res.json().then(callback2);
              }
              // const username = document.getElementById("username").value;
              // const password = document.getElementById("password").value;
              fetch("http://localhost:3000/admin/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: email, password: password }),
              })
                .then(callback1);
            }}
          >
            Sign In
          </Button>
        </Card>
      </center>
    </div>
  );
}

export default Signin;
