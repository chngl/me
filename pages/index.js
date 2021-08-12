import { FaGithub, FaLinkedinIn } from "react-icons/fa"

import BlogPosts from "../components/BlogPosts"
import Head from 'next/head'
import Image from 'next/image'
import {getPublishedPosts} from '../pages/api/getPosts';

export default function Home({posts}) {
  return (
    <div className="w-full">
      <Head>
        <title>Chang</title>
        <meta name="description" content="Chang Liu, full stack engineer" />
      </Head>
      <div className="flex flex-col h-screen w-full">
        <div className="flex flex-col items-center flex-shrink-0 w-full box-border p-12 bg-blue-50 shadow-sm">
          <div className="bg-gray-100 rounded-full p-2 flex items-center justify-center w-auto flex-shrink-0">
            <Image className="rounded-full" src="/images/profile.jpg" alt="profile" width={100} height={100} />
          </div>
          <div className="text-xl">
            Chang Liu
          </div>
          <div className="flex items-center my-2">
            <a href="https://www.linkedin.com/in/chang-liu-87038691/" className="mx-2">
              <FaLinkedinIn className="text-gray-400" />
            </a>
            <a href="https://github.com/chngl">
              <FaGithub className="text-gray-400" />
            </a>
          </div>
          <div className="text-gray-500 my-4">
            {"Hello world! This is Chang, a full stack software engineer who has a passion to create end to end solution to solve problems at scale."}
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center w-full w-2/3">
          <BlogPosts posts={posts} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const posts = await getPublishedPosts();
  return { props: { posts } };
}
