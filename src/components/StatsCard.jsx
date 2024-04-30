import React from "react";
import { Box, Text, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react";

const StatsCard = ({ totalPosts, totalLikes, totalComments, totalShares }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <StatGroup>
        <Stat>
          <StatLabel>Total Posts</StatLabel>
          <StatNumber>{totalPosts}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Likes</StatLabel>
          <StatNumber>{totalLikes}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Comments</StatLabel>
          <StatNumber>{totalComments}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Shares</StatLabel>
          <StatNumber>{totalShares}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default StatsCard;
