import instance from '../axios';

const getMyNotifications = async (
  { pageParam }: { pageParam: number | undefined },
  size: number
) => {
  const res = await instance.get(`/my-notifications`, {
    params: { cursorId: pageParam ? pageParam : null, size },
  });

  return res.data;
};
export default getMyNotifications