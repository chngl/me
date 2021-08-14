import BlogPosts from "../components/BlogPosts"
import Head from 'next/head'
import Hero from '../components/Hero'
import ReactGA from 'react-ga'
import { getPublishedPosts } from '../pages/api/getPosts'
import { useEffect } from 'react'

export default function Home({ posts }) {

  useEffect(() => {
    // add page view for tracking the usage
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
    ReactGA.pageview('home');
  }, []);

  return (
    <div className="w-full">
      <Head>
        <title>Chang Playground</title>
        <meta name="description" content="Chang Liu, full stack engineer" />
      </Head>
      <div className="flex flex-col h-screen w-full font-mono items-center">
        <Hero />
        <BlogPosts posts={posts} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await getPublishedPosts();
  return { props: { posts } };
}
