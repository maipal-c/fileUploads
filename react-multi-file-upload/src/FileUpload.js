import React, { useState } from "react";
import { Button, Card, Input } from "semantic-ui-react"; // Make sure you have Semantic UI React installed

function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...selectedFiles, ...Array.from(files)]);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            // Create a FormData object and append all selected files to it
            const formData = new FormData();
            selectedFiles.forEach((file, index) => {
                formData.append(`files[]`, file);
            });

            // Send a POST request to your server
            fetch("files", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    // Handle the response from the server
                    if (response.status === 200) {
                        console.log("Files uploaded successfully");
                        setSelectedFiles([]);
                    } else {
                        console.log("File upload failed");
                    }
                })
                .catch((error) => {
                    console.error("File upload error:", error);
                });
        } else {
            console.log("No files selected");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                height: "100vh",
            }}
        >
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
                        multiple
                    />
                </Card.Content>
                {selectedFiles.length > 0 && (
                    <Card.Content>
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    margin: "5px",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span>{file.name}</span>
                                <Button
                                    icon="trash"
                                    circular
                                    size="mini"
                                    color="red"
                                    onClick={() => handleRemoveFile(index)}
                                />
                            </div>
                        ))}
                    </Card.Content>
                )}
                <Card.Content>
                    <Button primary onClick={handleUpload} fluid>
                        Upload
                    </Button>
                </Card.Content>
            </Card>
        </div>
    );
}

export default FileUpload;
