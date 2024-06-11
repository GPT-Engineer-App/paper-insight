import React, { useState } from "react";
import { Container, VStack, Heading, Box, Text, Select, Button, useToast } from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

const Index = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const [file, setFile] = useState(null);
  const toast = useToast();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      toast({
        title: "File uploaded.",
        description: "Your PDF has been uploaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "application/pdf" });

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "No file uploaded.",
        description: "Please upload a PDF file to analyze.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!selectedAction) {
      toast({
        title: "No action selected.",
        description: "Please select an action to perform.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Here you would handle the analysis logic based on the selected action and the uploaded file
    toast({
      title: "Analysis started.",
      description: `Performing ${selectedAction} on the uploaded PDF.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>
          Academic Paper Analyzer
        </Heading>
        <Box {...getRootProps()} border="2px" borderColor="gray.300" borderStyle="dashed" borderRadius="md" p={6} width="100%" textAlign="center" cursor="pointer" bg={isDragActive ? "gray.100" : "white"}>
          <input {...getInputProps()} />
          {file ? (
            <Text>{file.name}</Text>
          ) : (
            <Text>
              <FaFilePdf size="50px" />
              Drag & drop a PDF file here, or click to select one
            </Text>
          )}
        </Box>
        <Select placeholder="Select action" onChange={handleActionChange} value={selectedAction}>
          <option value="summarize">Summarize</option>
          <option value="extract_keywords">Extract Keywords</option>
          <option value="analyze_authors">Analyze Authors</option>
        </Select>
        <Button colorScheme="blue" onClick={handleAnalyze}>
          Analyze
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
