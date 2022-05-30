import {readFileSync} from 'fs'
export default function recent_search(_req,res) {
  let rawdata = readFileSync('search.json');
  let history = JSON.parse(rawdata);
  res.status(200).json({status:'OK',history})
}
