import { readFileSync, writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
export default  async function handler(req, res) {
  if (
    req?.query?.value === undefined ||
    req?.query?.value === null ||
    req?.query?.value === ''
  )
    return res.status(200).json({ error: 'Please provide a valid value.' });

  let pages = (parseInt(req.query.page)-1).toString() || '0';
  const newRecord = {
    _id: uuidv4(),
    searchQuery: req?.query?.value,
    timeSearched: new Date(),
  };
  let raw_record = readFileSync('search.json');
  let record_res = JSON.parse(raw_record);
  record_res.push(newRecord);
  let written = JSON.stringify(record_res);
  writeFileSync('search.json', written);
  let rawdata;
  let search_res;
  if (process.env.mode==='test') {
    rawdata = readFileSync('template.json');
    search_res = JSON.parse(rawdata);
  } else {
    if(!process.env.api_key) return res.status(200).json({error:'invalid api key'})
    rawdata = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${req.query.value}&google_domain=google.com&tbm=isch&ijn=${pages}&api_key=${process.env.api_key}`
    );
    search_res = await rawdata.json();
  }
  return res.status(200).json(search_res?.images_results);
}
