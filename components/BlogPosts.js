import Image from 'next/image'
import React from 'react'
import ReactGA from 'react-ga'

function BlogPost({ post }) {
  const images = post.fields.illustration;
  const thumbnails = images && images.length ? images[0].thumbnails.large : { url: null };
  const { url: picUrl } = thumbnails;
  const dt = new Date(post.fields.date);

  return (
    <div
      className="w-full flex flex-col md:flex-row cursor-pointer hover:bg-gray-50"
      onClick={() => {
        ReactGA.initialize(
          process.env.GA_TRACKING_ID,
          {
            debug: true,
            gaOptions: {
              siteSpeedSampleRate: 100,
            }
          },
        );
        ReactGA.event({
          category: 'general',
          action: 'view_blog_post',
          label: post.fields.title,
        });
        if (post.fields.url != null) {
          window.open(post.fields.url, '_blank').focus();
        }
      }}>
      <div className="flex-shrink-0 relative w-full h-48 md:h-auto md:w-1/3">
        <Image src={picUrl} layout="fill" objectFit="cover" alt="cover" />
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
    <div className="mx-2 flex flex-col items-center my-8 max-w-screen-lg w-full w-2/3">
      <div className="text-gray-500 my-4">
        ☕️ blogs & projects ⚒️
      </div>
      <div className="divide-y divide-fuchsia-300">
        {posts.map(post => <BlogPost key={post.id} post={post} />)}
      </div>
      <div className="text-gray-500 my-4">
        More to come soon ...
      </div>
    </div>
  )
}
