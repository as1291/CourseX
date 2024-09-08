import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";

function AddCourse(params) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [imageLink, setimageLink] = useState("");
  return (
    <div>
      <center>
        <div
          style={{
            paddingTop: 150,
            marginBottom: 10,
          }}
        >
          <Typography variant="h4">Add your Course !</Typography>
        </div>
      </center>
      <center>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            id="Title"
            label="Title"
            type="text"
            variant="outlined"
            value={Title}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            id="Description"
            label="Description"
            type="text"
            variant="outlined"
            value={Description}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
                setimageLink(e.target.value);
            }}
            fullWidth={true}
            id="imageLink"
            label="imageLink"
            type="text"
            variant="outlined"
            value={imageLink}
          />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              function callback2(data) {
                localStorage.setItem("token", data.token);
              }

              function callback1(res) {
                res.json().then(callback1);
              }

              fetch("http://localhost:3000/admin/courses", {
                method: "POST",
                body: JSON.stringify({
                  title: Title,
                  description: Description,
                  imageLink: imageLink,
                  published: true,
                }),
                headers: {
                  "Content-type": "application/json",
                  auth: localStorage.getItem("token"),
                },
              }).then(callback1);
            }}
          >
            Add Course
          </Button>
        </Card>
      </center>
    </div>
  );
}

export default AddCourse;
