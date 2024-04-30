import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, Input, Stack, Text, Textarea, useToast, VStack, IconButton, Divider, Heading, InputGroup, InputRightElement, useDisclosure } from "@chakra-ui/react";
import { FaHeart, FaShare, FaComment, FaQuoteRight, FaSearch, FaPlus } from "react-icons/fa";
import StatsCard from "../components/StatsCard";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const handlePost = (anonymous) => {
    if (!postText.trim()) {
      toast({
        title: "Error",
        description: "Post cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newPost = {
      id: posts.length + 1,
      text: postText,
      anonymous,
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredPosts = posts.filter((post) => post.text.toLowerCase().includes(searchQuery.toLowerCase()));
    setPosts(filteredPosts);
  };

  const totalPosts = posts.length;
  const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);
  const totalComments = posts.reduce((acc, post) => acc + post.comments.length, 0);
  const totalShares = posts.reduce((acc, post) => acc + post.shares, 0);

  const reasons = ["It helps others learn from your experience.", "It can inspire others to overcome their own challenges.", "It promotes a culture of transparency and honesty.", "It can help you reflect and learn from your own experiences.", "It can reduce the stigma around failure.", "It encourages a growth mindset.", "It can foster community and support.", "It can lead to unexpected opportunities.", "It helps build resilience.", "It shows that failure is a part of the journey to success."];
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentReasonIndex((prevIndex) => (prevIndex + 1) % reasons.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container maxW="container.md" py={5}>
      <Flex height="80vh" align="center" justify="center" direction="column">
        <Text fontSize="xl" textAlign="center" color="gray.600" mb={4}>
          Here are 10 reasons why you need to share your failure story:
        </Text>
        <Text fontSize="lg" textAlign="center" color="gray.500">
          {reasons[currentReasonIndex]}
        </Text>
        <Button mt={10} onClick={onToggle}>
          I got a failure story to share
        </Button>
      </Flex>
    </Container>
  );
};

export default Index;
