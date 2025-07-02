import { useState, useEffect } from "react";
import { getRandomDogImage } from "../api";

// Cache for images to avoid loading the same image multiple times
const imageCache = new Map<string, string>();

export const useDogImages = (dogNames: string[]) => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const newImages: Record<string, string> = {};

      // Load images only for dogs that are not in the cache yet
      const dogsToLoad = dogNames.filter((name) => !imageCache.has(name));

      if (dogsToLoad.length > 0) {
        // Load images in parallel for better performance
        const imagePromises = dogsToLoad.map(async (name) => {
          try {
            const imageUrl = await getRandomDogImage();
            imageCache.set(name, imageUrl);
            return { name, imageUrl };
          } catch (error) {
            console.error("Error loading image for", name, error);
            const fallbackImage =
              "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=350&fit=crop&crop=center";
            imageCache.set(name, fallbackImage);
            return { name, imageUrl: fallbackImage };
          }
        });

        const results = await Promise.all(imagePromises);
        results.forEach(({ name, imageUrl }) => {
          newImages[name] = imageUrl;
        });
      }

      // Add images from cache
      dogNames.forEach((name) => {
        if (imageCache.has(name)) {
          newImages[name] = imageCache.get(name)!;
        }
      });

      setImages(newImages);
      setLoading(false);
    };

    if (dogNames.length > 0) {
      loadImages();
    }
  }, [dogNames]);

  return { images, loading };
};

export const useSingleDogImage = (dogName: string) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);

      // Check cache first
      if (imageCache.has(dogName)) {
        setImage(imageCache.get(dogName)!);
        setLoading(false);
        return;
      }

      try {
        const imageUrl = await getRandomDogImage();
        imageCache.set(dogName, imageUrl);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error loading dog image:", error);
        const fallbackImage =
          "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=350&fit=crop&crop=center";
        imageCache.set(dogName, fallbackImage);
        setImage(fallbackImage);
      }

      setLoading(false);
    };

    if (dogName) {
      loadImage();
    }
  }, [dogName]);

  return { image, loading };
};
