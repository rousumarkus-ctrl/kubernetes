import axios from 'axios';

const makeLink = async () => {
  const response = await axios.get(process.env.WIKI_URL, {
    headers: {
      'User-Agent': 'curl/7.79.1',
    },
    maxRedirects: 0,
    validateStatus: (status) => status === 302,
  });
  const result = await axios.post(process.env.TODO_URL, {
    title: `Read ${response.headers.location}`,
    done: false,
  });
};
makeLink();
