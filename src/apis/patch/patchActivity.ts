import instance from '../axios';

const patchActivity = async (activityId: string | string | undefined, data: unknown) => {
  try {
    const res = await instance.patch(`/my-activities/${activityId}`, data);

    return res;
  } catch (error: any) {
    return console.log(error);
  }
};
export default patchActivity