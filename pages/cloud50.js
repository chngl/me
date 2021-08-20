import { useEffect, useRef, useState } from 'react'

import { FaHome } from "react-icons/fa"
import Jello from '@chngl/jellojs'
import Link from 'next/link'
import ReactGA from 'react-ga'
import { getCompanies } from '../pages/api/getCompanies'

const STORY_SETTINGS = [
  {
    title: 'Forbes Top 50 Private Companies',
    details: `Here are the top 50 private companies in 2021 released by Forbes in August this year.
      Let's take a look at these companies through the lens of this interactive data visaulzation and learn more about them!
    `,
    button: 'Start',
    action: (jello) => {
      jello.setSizeBy('rank').setClusterBy(null).setFilterBy(null).render();
    },
  },
  {
    title: 'SF, the Hub for Innovations',
    details: `If we group these companies by their headquarter location,
      we can easily see that most of these companies are from SF Bay Area, followed by New York and Seattle.
      SF is no doubt the hub for innovations.
    `,
    button: 'Next',
    action: (jello) => {
      jello.setClusterBy('headquarter').render();
    }
  },
  {
    title: 'Fintch is Gaining Momentum',
    details: `Now let's take a look at their industries.
      While internet software & services companies are still dominating the list, fintech started to get a lot of traction.
    `,
    button: 'Next',
    action: (jello) => {
      jello.setClusterBy('industry').render();
    }
  },
  {
    title: 'A Closer Look into Fintech',
    details: `
      Among these fintech companies,
      they are focusing on different aspects of the industry, ranging from panyment platform, payroll management to banking and restaurant softwares.
    `,
    button: 'Next',
    action: (jello) => {
      jello.setFilterBy({ 'industry': ['Fintech'] }).setClusterBy('sub_industry').render();
    }
  },
  {
    title: 'Valuation',
    details: `Finally, let's take a look at their valuation (in Billions).
      Among all the companies, Stripe has been doing really well in recent years and it has reached an exceptional 95B in valuation! Scroll to the right to see more.
    `,
    button: 'Next',
    action: (jello) => {
      jello.setFilterBy(null).setSizeBy('valuation').setSortBy({ dim: 'valuation', order: 'desc' }).render();
    }
  },
];

const RESOURCES = [
  {
    'title': 'Forbes: The Cloud 100',
    'link': 'https://www.forbes.com/cloud100/#2015acee5f94',
  },
  {
    'title': 'The Complete List Of Unicorn Companies',
    'link': 'https://www.cbinsights.com/research-unicorn-companies',
  },
  {
    'title': 'Create Inteactive Data Stories with Jellojs',
    'link': 'https://www.npmjs.com/package/@chngl/jellojs',
  },
];

export default function Cloud50({ companies }) {
  console.log(companies);
  const canvasRef = useRef(null);
  let jelloRef = useRef(null);
  useEffect(() => {

    // logging
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
    ReactGA.pageview('cloud50');

    const jello = new Jello(canvasRef.current, companies, {});
    jello.setDisplayImageBy('logo');
    STORY_SETTINGS[0].action(jello);
    jelloRef.current = jello;
  }, []);

  const [story, setStory] = useState(0);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center max-w-screen-lg m-auto items-center font-mono">
      <div className="w-full md:w-1/3 md:h-screen flex flex-col justify-center items-center">
        <div className="text-xl my-4">
          {STORY_SETTINGS[story].title}
        </div>
        <div className="text-gray-500 my-4">
          {STORY_SETTINGS[story].details}
        </div>
        {
          story === STORY_SETTINGS.length - 1 ? (
            <>
              <div className="shadow py-2 px-4 bg-blue-50 hover:bg-blue-100 cursor-pointer" onClick={() => {
                STORY_SETTINGS[0].action && STORY_SETTINGS[0].action(jelloRef.current);
                setStory(0);
              }}>
                Restart
              </div>
              <div className="flex flex-col my-8 items-start">
                <div className="text-xl my-4 ">
                  Resources
                </div>
                <div className="text-gray-500 underline">
                  <ul className="list-disc">
                    {RESOURCES.map(resource => {
                      return (
                        <li key={resource.title}>
                          <a href={resource.link}>{resource.title}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="shadow py-2 px-4 bg-blue-50 hover:bg-blue-100 cursor-pointer" onClick={() => {
              if (story + 1 < STORY_SETTINGS.length) {
                STORY_SETTINGS[story + 1].action && STORY_SETTINGS[story + 1].action(jelloRef.current);
                setStory(story + 1);
              }
            }}>
              {STORY_SETTINGS[story].button}
            </div>
          )
        }
      </div>
      <div className="w-full flex-grow md:w-2/3 md:h-screen relative overflow-scroll" ref={canvasRef} />
      <Link href="/">
        <div className="absolute top-0 left-0 m-8 flex items-center cursor-pointer">
          <FaHome className="text-gray-400" />
          <div className="m-2">Home</div>
        </div>
      </Link>
    </div>
  )
}

export async function getServerSideProps() {
  const companies = await getCompanies();
  return { props: { companies } };
}
