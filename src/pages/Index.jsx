import React, { useState } from "react";
import { Box, Button, Container, Flex, Input, Stack, Text, Textarea, useToast, VStack, IconButton, Divider, Heading, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaHeart, FaShare, FaComment, FaQuoteRight, FaSearch } from "react-icons/fa";
import StatsCard from "../components/StatsCard";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4}>
        <StatsCard totalPosts={totalPosts} totalLikes={totalLikes} totalComments={totalComments} totalShares={totalShares} />
        <Heading mb={6}>Share Your Failure Stories</Heading>
        <InputGroup>
          <Input placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <InputRightElement children={<IconButton icon={<FaSearch />} onClick={handleSearch} aria-label="Search posts" />} />
        </InputGroup>
        <Textarea placeholder="What's your failure story?" value={postText} onChange={(e) => setPostText(e.target.value)} />
        <Flex justify="space-between" w="100%">
          <Button colorScheme="blue" onClick={() => handlePost(false)}>
            Post as Me
          </Button>
          <Button colorScheme="teal" onClick={() => handlePost(true)}>
            Post Anonymously
          </Button>
        </Flex>
        <Divider />
        {posts.map((post) => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%">
            <Text mb={2}>{post.anonymous ? "Anonymous" : `User ${post.id}`}</Text>
            <Text mb={2}>{post.text}</Text>
            <Stack direction="row" spacing={4}>
              <IconButton icon={<FaHeart />} onClick={() => handleLike(post.id)} aria-label="Like post" />
              <IconButton icon={<FaComment />} aria-label="Comment on post" />
              <IconButton icon={<FaShare />} aria-label="Share post" />
              <IconButton icon={<FaQuoteRight />} aria-label="Quote post" />
            </Stack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
