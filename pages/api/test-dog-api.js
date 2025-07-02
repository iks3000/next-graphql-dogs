export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get several random dog images
    const imagePromises = [];
    for (let i = 0; i < 5; i++) {
      imagePromises.push(
        fetch("https://dog.ceo/api/breeds/image/random")
          .then((response) => response.json())
          .then((data) => data.message)
      );
    }

    const images = await Promise.all(imagePromises);

    res.status(200).json({
      success: true,
      message: "Dog API is working great!",
      images: images,
      apiInfo: {
        name: "Dog API",
        url: "https://dog.ceo/dog-api/",
        description: "Free API for getting dog images",
      },
    });
  } catch (error) {
    console.error("Error testing Dog API:", error);
    res.status(500).json({
      success: false,
      message: "Error testing Dog API",
      error: error.message,
    });
  }
}
