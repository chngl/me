import Airtable from 'airtable';
import { __recordsPerPageForIteration } from 'airtable/lib/table';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);
const table = base('cloud 50');

const parseRecord = (record) => {
  const {
    rank,
    funding,
    company,
    employees,
    headquarter,
    year_founded,
    years_since_founded,
    years_since_founded_category,
    valuation,
    industry,
    sub_industry,
    logo,
  } = record.fields;
  return {
    id: record.id,
    rank: 1 / rank,
    funding,
    company,
    headquarter,
    employees,
    year_founded,
    years_since_founded,
    years_since_founded_category,
    valuation,
    industry,
    sub_industry,
    logo: logo != null ? logo[0].url : '',
  };
}

export async function getCompanies() {
  const companies = await table.select({}).firstPage();
  return companies.map(record => parseRecord(record));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const posts = await getCompanies();
  res.statusCode = 200;
  res.json(posts);
};
