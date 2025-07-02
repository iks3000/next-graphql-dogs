import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

import { getSdk } from "../src/generated/graphql";

const gqlClient = new GraphQLClient(
  "https://next-graphql-dogs.netlify.app/api/graphql"
);
export const { getDogs, dogByName } = getSdk(gqlClient);

// Function to get a random dog image from Dog API
export const getRandomDogImage = async (): Promise<string> => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching dog image:", error);
    // Fallback image if API is unavailable
    return "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=350&fit=crop&crop=center";
  }
};

// Function to get multiple random dog images
export const getMultipleDogImages = async (
  count: number
): Promise<string[]> => {
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const image = await getRandomDogImage();
    images.push(image);
  }
  return images;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
