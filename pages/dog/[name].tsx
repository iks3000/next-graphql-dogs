import React from "react";
import { dehydrate, useQuery } from "react-query";
import { Grid, Text, Title, Image, Loader } from "@mantine/core";
import ModalWindow from "../../components/ModalWindow";

import { queryClient, dogByName } from "../../src/api";
import { useSingleDogImage } from "../../src/hooks/useDogImages";

export async function getServerSideProps({ params }) {
  await queryClient.prefetchQuery(["dog"], () =>
    dogByName({ name: params.name })
  );

  return {
    props: {
      name: params.name,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

// Format age in years and weeks
function formatDogAge(weeks) {
  if (weeks >= 52) {
    const years = Math.floor(weeks / 52);
    const restWeeks = weeks % 52;
    if (restWeeks === 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    }
    return `${years} year${years > 1 ? "s" : ""} ${restWeeks} week${
      restWeeks > 1 ? "s" : ""
    }`;
  }
  return `${weeks} week${weeks > 1 ? "s" : ""}`;
}

const DogDetail: React.FunctionComponent<{
  name: string;
}> = ({ name }) => {
  const { data } = useQuery(["dog"], () => dogByName({ name }));
  const { image, loading } = useSingleDogImage(name);

  // Fallback image for dogs
  const fallbackImage =
    "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=350&fit=crop&crop=center";

  if (!data.dog) {
    return <div>No dog found</div>;
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Loader size="lg" />
        <Text ml="md">Loading image for {data.dog.name}...</Text>
      </div>
    );
  }

  return (
    <Grid>
      <Grid.Col xs={12} md={6} lg={4}>
        <Image
          src={image || fallbackImage}
          alt={`${data.dog.name} - ${data.dog.breed}`}
          onError={(e) => {
            const img = e.currentTarget.querySelector("img");
            if (img) img.src = fallbackImage;
          }}
        />
      </Grid.Col>
      <Grid.Col xs={12} md={6} lg={4}>
        <Title order={1}>{data.dog.name}</Title>

        <Grid mt={10}>
          <Grid.Col span={4}>
            <Title order={5}>Age</Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{formatDogAge(data.dog.ageInWeeks)}</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={5}>Breed</Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{data.dog.breed}</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={5}>Sex</Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{data.dog.sex}</Text>
          </Grid.Col>
          {data.dog.color && (
            <>
              <Grid.Col span={4}>
                <Title order={5}>Color</Title>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text>{data.dog.color}</Text>
              </Grid.Col>
            </>
          )}
        </Grid>
      </Grid.Col>

      <Grid.Col xs={12} md={6} lg={4}>
        <ModalWindow name={data.dog.name} />
      </Grid.Col>
    </Grid>
  );
};

export default DogDetail;
