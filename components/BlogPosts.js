import Image from 'next/image'
import React from 'react'

function BlogPost({ post }) {
  const images = post.fields.illustration;
  const thumbnails = images && images.length ? images[0].thumbnails.large : {};
  const { url, width, height } = thumbnails;
  const dt = new Date(post.fields.date);

  return (
    <div className="w-full flex flex-col md:flex-row my-8 cursor-pointer">
      <div className="flex-shrink-0 relative w-full h-48 md:h-auto md:w-1/3">
        <Image src={url} layout="fill" objectFit="cover" alt="cover" />
      </div>
      <div className="flex flex-col justify-center p-8">
        <div className="text-2xl my-8">
          {post.fields.title}
        </div>
        <div className="text-gray-500">
          {post.fields.desc}
        </div>
        <div className="text-gray-300">
          {dt.toDateString()}
        </div>
      </div>
    </div>
  )
}

export default function BlogPosts({ posts }) {
  return (
    <div className="flex flex-col items-center my-8 max-w-screen-lg">
      <div className="text-gray-500">
        ☕️ {' '}blogs & projects ⚒️
      </div>
      <div className="divide-y divide-fuchsia-300">
        {posts.map(post => <BlogPost key={post.id} post={post} />)}
      </div>
    </div>
  )
}
