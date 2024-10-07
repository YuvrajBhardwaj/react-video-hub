import {
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Upload from './Upload'; 

const Videos = () => {
  const [videosArr, setVideosArr] = useState([
    'https://assets.mixkit.co/videos/1489/1489-720.mp4',
    'https://assets.mixkit.co/videos/52452/52452-720.mp4',
    'https://assets.mixkit.co/videos/41576/41576-720.mp4',
    'https://assets.mixkit.co/videos/5016/5016-720.mp4',
    'https://assets.mixkit.co/videos/3428/3428-720.mp4',
    'https://assets.mixkit.co/videos/4283/4283-720.mp4',
    'https://assets.mixkit.co/videos/3317/3317-720.mp4',
    'https://assets.mixkit.co/videos/236/236-720.mp4',
    'https://assets.mixkit.co/videos/43935/43935-720.mp4',
    'https://assets.mixkit.co/videos/1538/1538-720.mp4',
    'https://assets.mixkit.co/videos/4806/4806-720.mp4',
  ]);

  const [videoSrc, setVideoSrc] = useState(videosArr[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'f') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          videoRef.current?.requestFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videosArr.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videosArr.length) % videosArr.length);
  };

  useEffect(() => {
    setVideoSrc(videosArr[currentIndex]);
  }, [currentIndex, videosArr]);

  const handleUpload = (newVideoUrl) => {
    setVideosArr((prevVideos) => {
      const updatedVideos = [...prevVideos, newVideoUrl]; // Add new video URL
      setCurrentIndex(updatedVideos.length - 1); // Set to the newly added video
      return updatedVideos; // Return the updated array
    });
  };

  return (
    <Stack direction={['column', 'row']} h={'100vh'}>
      <VStack w={'full'}>
        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          src={videoSrc}
          autoPlay
          style={{ width: '100%' }}
        ></video>

        <VStack alignItems={'flex-start'} p={'8'} w={'full'} overflowY={'auto'}>
          <Heading>Video {currentIndex + 1}</Heading>
          <Text>This is a sample video for testing and demo.</Text>
          <Text>Current Video: {currentIndex + 1}/{videosArr.length}</Text>
        </VStack>
      </VStack>
      <VStack w={['full', 'xl']} alignItems={'stretch'} p="8" spacing={'8'} overflowY={'auto'}>
        <Upload onUpload={handleUpload} />
        <HStack spacing={4}>
          <Button
            variant={'outline'}
            colorScheme={'purple'}
            onClick={handlePrevious}
            isDisabled={currentIndex === 0}
          >
            &#9664; Previous
          </Button>
          <Button
            variant={'outline'}
            colorScheme={'purple'}
            onClick={handleNext}
            isDisabled={currentIndex === videosArr.length - 1}
          >
            Next &#9654;
          </Button>
        </HStack>
        {videosArr.map((item, index) => (
          <Button
            key={item}
            variant={'ghost'}
            colorScheme={'purple'}
            onClick={() => {
              setCurrentIndex(index);
              setVideoSrc(item);
            }}
          >
            Video {index + 1}
          </Button>
        ))}
      </VStack>
    </Stack>
  );
};

export default Videos;
