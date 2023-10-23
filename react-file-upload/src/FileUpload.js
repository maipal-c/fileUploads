import React, { useState } from "react";
import { Button, Card, Grid, Input } from "semantic-ui-react"; // Make sure you have Semantic UI React installed

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Create a FormData object and append the selected file to it
            const formData = new FormData();
            formData.append("file", selectedFile);

            // Send a POST request to your server
            fetch("files", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    // Handle the response from the server
                    if (response.status === 200) {
                        console.log("File uploaded successfully");
                    } else {
                        console.log("File upload failed");
                    }
                })
                .catch((error) => {
                    console.error("File upload error:", error);
                });
        } else {
            console.log("No file selected");
        }
    };

    return (
        <Grid columns={3} doubling stackable>
            <Grid.Row>
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Card.Header>File Upload</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Input
                                type="file"
                                label="Choose File"
                                onChange={handleFileChange}
                                fluid
                            />
                        </Card.Content>
                        <Card.Content>
                            <Button primary onClick={handleUpload}>
                                Upload
                            </Button>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default FileUpload;
