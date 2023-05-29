import axios, { isAxiosError } from 'axios';

const getImageUrl = async (filename: string) => {
  const path = `/image/${filename}`;
  try {
    const res = await axios.get(path);
    if (!res.data.startsWith('https')) {
      /* Using local filesystem for images.  */
      return path;
    } else {
      /* Using cloud storage for images.  */
      return res.data;
    }
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response?.data);
    } else {
      console.error(err);
    }
  }
};

export { getImageUrl };
