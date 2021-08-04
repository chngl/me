import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chang</title>
        <meta name="description" content="Chang Liu, full stack engineer" />
      </Head>
      <div className="container flex flex-col md:flex-row mx-auto h-screen justify-center items-center">
        <div className="bg-gray-100 rounded-full p-2 flex items-center justify-center w-auto">
          <Image className="rounded-full" src="/images/profile.jpg" alt="profile" width={150} height={150} />
        </div>
        <div className="mx-2 flex flex-col items-center md:items-start">
          <div className="text-4xl">
            Chang Liu
          </div>
          <div className="text-gray-500 my-8">
            Hello world! This is Chang, a full stack engineer who has a passion to create end to end solution to solve problems at scale.
        </div>
        </div>
      </div>
    </div>
  )
}
