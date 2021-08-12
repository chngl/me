import Airtable from 'airtable';
import { __recordsPerPageForIteration } from 'airtable/lib/table';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_BLOG_TABLE_NAME);

const parseRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
}

export async function getPublishedPosts() {
  const posts = await table.select({}).firstPage();
  const published = posts.filter(record => {
    return 'status' in record.fields && record.fields.status === 'published';
  });
  return published.map(record => parseRecord(record));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const posts = await getPublishedPosts();
  res.statusCode = 200;
  res.json(posts);
};
