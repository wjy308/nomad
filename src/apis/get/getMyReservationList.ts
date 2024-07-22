import instance from '../axios';

/* eslint-disable */
interface IMyReservation {
  cursorId?: number;
  size?: number;
  status?: string;
}

const getMyReservationList = async ({ status, cursorId, size = 6 }: IMyReservation) => {
  try {
    const { data } = await instance.get(`/my-reservations`, {
      params: { size, cursorId },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getMyReservationList;
/* eslint-enable */
