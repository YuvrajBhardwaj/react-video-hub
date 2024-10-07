import { Button, Container, HStack, Input, VStack, Spinner } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const Upload = ({ onUpload }) => {
  const [videoPreview, setVideoPreview] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Loading state

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      const maxSizeInBytes = 100 * 1024 * 1024; // 100 MB

      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid video file (mp4, webm, ogg).');
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert('File size exceeds the limit of 100 MB.');
        return;
      }

      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl); // Set video preview
      event.target.value = null; // Clear the input
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-input').click(); // Trigger file input
  };

  const handleSubmit = () => {
    setLoading(true); // Set loading to true
    // Simulate upload delay
    setTimeout(() => {
      onUpload(videoPreview); // Call onUpload with the video URL
      setLoading(false); // Reset loading state
      setVideoPreview(''); // Clear video preview after upload
    }, 2000); // Simulate a 2-second upload delay
  };

  return (
    <Container maxW={'container.xl'} p={'16'}>
      <VStack color={'purple.500'} h={'full'} justifyContent={'center'}>
        <AiOutlineCloudUpload size={'10vmax'} />
        {videoPreview && (
          <video width="300" controls src={videoPreview} style={{ marginTop: '20px' }} />
        )}
        <HStack>
          <Input
            id="file-input"
            required
            type={'file'}
            accept="video/*"
            onChange={handleFileChange}
            css={{
              '&::file-selector-button': {
                border: 'none',
                width: 'calc(100% + 36px)',
                height: '100%',
                marginLeft: '-18px',
                color: 'purple',
                backgroundColor: 'white',
                cursor: 'pointer',
              },
            }}
            display="none" // Hide the input
          />
          <Button colorScheme={'purple'} onClick={handleUploadClick}>
            Upload
          </Button>
          <Button 
            colorScheme={'blue'} 
            onClick={handleSubmit} 
            isDisabled={!videoPreview || loading}
          >
            {loading ? <Spinner size="sm" /> : 'Submit'}
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Upload;
