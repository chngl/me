import { AiFillPushpin } from 'react-icons/ai';
import Image from 'next/image'
import React from 'react'
import ReactGA from 'react-ga'

function BlogPost({ post }) {
  return (
    <div
      className="w-full flex flex-col md:flex-row cursor-pointer hover:bg-gray-50"
      onClick={() => {
        ReactGA.initialize(
          process.env.NEXT_PUBLIC_GA_TRACKING_ID,
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
          if (post.fields.type === 'page') {
            window.location.replace(post.fields.url);
          } else {
            window.open(post.fields.url, '_blank').focus();
          }
        }
      }}>
      <div className="flex flex-col justify-center p-8">
        <div className="text-2xl my-8">
          {post.fields.title}
        </div>
        <div className="text-gray-500 text-sm">
          {post.fields.desc}
        </div>
        <div className="flex text-gray-300 justify-between my-2 text-sm">
          {(new Date(post.fields.date)).toDateString()}
          {post.fields.pined ? <AiFillPushpin /> : null}
        </div>
      </div>
    </div>
  )
}

export default function BlogPosts({ posts }) {
  const sorted = posts.sort((a, b) => {
    if (a.fields.pined) {
      return -1;
    } else {
      return 1;
    }
  });
  return (
    <div className="mx-2 flex flex-col items-center my-8 max-w-screen-lg w-full w-2/3">
      <div className="text-gray-500 my-4">
        ☕️ blogs & projects ⚒️
      </div>
      <div className="divide-y divide-fuchsia-300">
        {sorted.map(post => <BlogPost key={post.id} post={post} />)}
      </div>
      <div className="text-gray-500 my-4">
        More to come soon ...
      </div>
    </div>
  )
}
