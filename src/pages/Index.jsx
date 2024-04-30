import React, { useState } from "react";
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

  return (
    <Container maxW="container.md" py={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text ml="30px" mt="30px">
          Failure Story
        </Text>
        <Button mr="30px" mt="30px" onClick={onToggle}>
          Share Your Failure Story
        </Button>
      </Flex>
      
    </Container>
  );
};

export default Index;
