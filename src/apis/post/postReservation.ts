import instance from '../axios';

const postReservation = async (activityId: number, data: unknown) => {
  const res = await instance.post(`/activities/${activityId}/reservations`, data);
  return res;
};
export default postReservation