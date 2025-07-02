import { dehydrate, useQuery } from "react-query";
import Link from "next/link";
import { Grid, Card, Image, Text, Title, Loader } from "@mantine/core";

import { queryClient, getDogs } from "../src/api";
import { useDogImages } from "../src/hooks/useDogImages";

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["dogs"], () => getDogs());

  return {
    props: {
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

export default function Home() {
  const { data } = useQuery(["dogs"], () => getDogs());
  const dogNames = data?.dogs?.map((dog) => dog.name) || [];
  const { images, loading } = useDogImages(dogNames);

  // Fallback image for dogs
  const fallbackImage =
    "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=350&fit=crop&crop=center";

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
        <Text ml="md">Loading dog images...</Text>
      </div>
    );
  }

  return (
    <div>
      <Grid>
        {data?.dogs.map((f, i) => (
          <Grid.Col
            xs={12}
            md={6}
            lg={4}
            xl={3}
            key={[f.name, i].join(":")}
            p={5}
          >
            <Link href={`/dog/${f.name}`} passHref>
              <Card style={{ cursor: "pointer" }}>
                <Card.Section>
                  <Image
                    height={350}
                    src={images[f.name] || fallbackImage}
                    alt={`${f.name} - ${f.breed}`}
                    onError={(e) => {
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.src = fallbackImage;
                    }}
                  />
                </Card.Section>
                <Title order={3}>{f.name}</Title>
                <Text>
                  {f.weight} pound {formatDogAge(f.ageInWeeks)} old{" "}
                  {f.sex.toLowerCase()} {f.breed.toLowerCase()}
                </Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
