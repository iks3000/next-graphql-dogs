import { Resolver, Query, Arg } from "type-graphql";

import { Dog } from "./dogs";
import dogs from "./dogs.json";
import { getRandomDogImage } from "../../src/api";

@Resolver(Dog)
export class DogsResolver {
  @Query(() => Dog, { nullable: true })
  async dog(@Arg("name", () => String) name: string): Promise<Dog | undefined> {
    const dog = dogs.find((dog) => dog.name === name);
    if (dog === undefined) {
      throw new Error("Dog not found");
    }

    // Get a random dog image from Dog API
    try {
      const randomImage = await getRandomDogImage();
      return {
        ...dog,
        image: randomImage,
      };
    } catch (error) {
      console.error("Error fetching dog image:", error);
      return dog; // Return dog with original image
    }
  }

  @Query(() => [Dog])
  async dogs(): Promise<Dog[]> {
    // Get random images for all dogs
    const dogsWithRandomImages = await Promise.all(
      dogs.map(async (dog) => {
        try {
          const randomImage = await getRandomDogImage();
          return {
            ...dog,
            image: randomImage,
          };
        } catch (error) {
          console.error("Error fetching dog image:", error);
          return dog; // Return dog with original image
        }
      })
    );

    return dogsWithRandomImages;
  }
}
