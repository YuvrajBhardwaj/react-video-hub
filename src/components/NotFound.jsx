import React from 'react';
import { Container, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container centerContent h="100vh">
      <Heading as="h1" size="xl" mb="4">
        404 - Page Not Found
      </Heading>
      <Text mb="4">Sorry, the page you are looking for does not exist.</Text>
      <Button colorScheme="purple">
        <Link to="/">Go to Home</Link>
      </Button>
    </Container>
  );
};

export default NotFound;
