import { useEffect, useRef, useState } from 'react'

import Button from '../components/Button'
import { FaHome } from "react-icons/fa"
import Image from 'next/image'
import Jello from '@chngl/jellojs'
import Link from 'next/link'
import { MdClose } from 'react-icons/md'
import ReactGA from 'react-ga'
import { getCompanies } from '../pages/api/getCompanies'

type Company = {
  "id": string,
  "funding": number,
  "company": string,
  "headquarter": string,
  "employees": number,
  "year_founded": number,
  "years_since_founded": number,
  "years_since_founded_category": string,
  "logo": string,
};

type Cloud50Props = {
  companies: Array<Company>,
};

type CardProps = {
  data: Company,
  top: number,
  left: number,
  onClose: () => void,
};

const STORY_SETTINGS = [
  {
    title: 'Forbes Top 50 Private Companies',
    details: `Here are the top 50 private companies in 2021 released by Forbes in August this year.
      Let's take a look at these companies through the lens of this interactive data visaulzation and learn more about them!
    `,
    button: 'Start',
    action: (jello) => {
      jello.sizeBy('rank').clusterBy(null).filterBy(null).render();
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
      jello.clusterBy('headquarter').render();
    }
  },
  {
    title: 'Fintch is Gaining Momentum',
    details: `Now let's take a look at their industries.
      While internet software & services companies are still dominating the list, fintech started to get a lot of traction.
    `,
    button: 'Next',
    action: (jello) => {
      jello.clusterBy('industry').render();
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
      jello.filterBy({ 'industry': ['Fintech'] }).clusterBy('sub_industry').render();
    }
  },
  {
    title: 'Valuation',
    details: `Finally, let's take a look at their valuation (in Billions).
      Among all the companies, Stripe has been doing really well in recent years and it has reached an exceptional 95B in valuation! Scroll to the right to see more.
    `,
    button: 'Next',
    action: (jello) => {
      jello.filterBy(null).sizeBy('valuation').sortBy({ dim: 'valuation', order: 'desc' }).render();
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
  {
    'title': 'Please let me know w',
    'link': '#',
  },
];

const FIELDS = [{
  key: 'year_founded',
  label: 'Year Founded',
}, {
  key: 'valuation',
  label: 'Valuation(B)',
}, {
  key: 'employees',
  label: '#Employees',
}, {
  key: 'industry',
  label: 'Industry',
}, {
  key: 'sub_industry',
  label: 'Sub Industry',
}, {
  key: 'headquarter',
  label: 'Headquarter',
}
];

function CompanyCard({ data, top, left, onClose }: CardProps) {
  if (!data) {
    return null;
  }
  return (
    <div className="shadow absolute bg-white py-6 px-4 flex flex-col" style={{ top, left }}>
      <div className="absolute text-gray-500 cursor-pointer" style={{ top: 20, right: 20 }} onClick={() => {
        onClose();
      }}>
        <MdClose />
      </div>
      <div className="text-l m-auto flex flex-col items-center">
        <Image src={data.logo} alt="profile" width={50} height={50} />
        <div>
          {data.company}
        </div>
      </div>
      <div className="border-t w-full my-2" />
      {FIELDS.map(field => {
        return (
          <div key={field.label} className="flex m-2">
            <div className="w-36 text-gray-300 flex justify-end mx-2">
              {field.label}
            </div>
            <div className="w-48 text-gray-500">{data[field.key]}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Cloud50({ companies }: Cloud50Props) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  let jelloRef = useRef<Jello<Company> | null>(null);
  useEffect(() => {

    // logging
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
    ReactGA.pageview('cloud50');

    const jello = new Jello(
      canvasRef.current,
      companies,
      {
        displayImageByDim: 'logo',
        onClick: (event, data) => {
          event.stopPropagation();
          setShowCard(true);
          setTop(event.pageY);
          setLeft(event.pageX);
          setData(data);
        },
        onCanvasClick: () => setShowCard(false),
      },
    );
    jello.render();
    STORY_SETTINGS[0].action(jello);
    jelloRef.current = jello;
  }, []);

  const [story, setStory] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [data, setData] = useState(null);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center max-w-screen-lg m-auto items-center font-mono overflow-scroll">
      <div className="w-full my-12 md:w-1/3 md:h-screen flex flex-col justify-center items-center">
        <div className="text-xl my-4">
          {STORY_SETTINGS[story].title}
        </div>
        <div className="text-gray-500 my-4">
          {STORY_SETTINGS[story].details}
        </div>
        {
          story === STORY_SETTINGS.length - 1 ? (
            <>
              <Button label="Restart" onClick={() => {
                jelloRef.current && jelloRef.current.reset().render();
                STORY_SETTINGS[0].action && STORY_SETTINGS[0].action(jelloRef.current);
                setStory(0);
              }} />
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
            <Button
              label={STORY_SETTINGS[story].button}
              onClick={() => {
                if (story + 1 < STORY_SETTINGS.length) {
                  STORY_SETTINGS[story + 1].action && STORY_SETTINGS[story + 1].action(jelloRef.current);
                  setStory(story + 1);
                }
              }} />
          )
        }
      </div>
      <div className="w-full flex-grow md:w-2/3 md:h-screen relative overflow-scroll" ref={canvasRef} />
      <Link href="/">
        <div className="absolute top-0 left-0 m-6 flex items-center cursor-pointer">
          <FaHome className="text-gray-400" />
          <div className="m-2">Home</div>
        </div>
      </Link>
      {showCard ? <CompanyCard data={data} top={top} left={left} onClose={() => setShowCard(false)} /> : null}
    </div>
  )
}

export async function getServerSideProps() {
  const companies = await getCompanies();
  return { props: { companies } };
}
