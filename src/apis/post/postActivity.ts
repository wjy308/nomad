import instance from '../axios';

const postActivity = async (data: unknown) => {
  try {
    const res = await instance.post('/activities', data);

    return res;
  } catch (error: any) {
    return alert(error.response?.data.message);
  }
};
export default postActivity