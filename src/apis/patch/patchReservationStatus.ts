import instance from '../axios';

const patchReservationStatus = async (activityId: number, reservationId: number, data: unknown) => {
  const res = await instance.patch(`/my-activities/${activityId}/reservations/${reservationId}`, data);
  return res;
};
export default patchReservationStatus