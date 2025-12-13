import axios from 'axios';

const makeLink = async () => {
  const link = await axios.get(process.env.WIKI_URL);
  console.log(link);
  const result = await axios.post(process.env.TODO_URL, { title: link });
  console.log(result);
};
makeLink();
