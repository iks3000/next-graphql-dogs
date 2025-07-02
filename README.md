This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## About Dog Images

The application now uses the **Dog API** (https://dog.ceo/dog-api/) to display random, high-quality dog images. This API provides:

- **Random dog images** - Each time you visit the page, you'll see different dog photos
- **High-quality photos** - Professional dog photography from various breeds
- **Reliable service** - Free, stable API with good uptime
- **Fast loading** - Optimized images with proper caching

**Previous solution:**

- Initially used static images from `ohspets.shelterbuddy.com` which became unavailable
- Replaced with Unsplash placeholder images (all showing the same dog)
- Now uses dynamic Dog API for variety and reliability

**Current implementation:**

- Each dog gets a unique random image from Dog API
- Fallback to Unsplash image if Dog API is unavailable
- Error handling ensures images always display
- Images are loaded dynamically on both main page and individual dog pages

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
