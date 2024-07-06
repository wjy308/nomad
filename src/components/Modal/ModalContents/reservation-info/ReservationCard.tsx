import { useMutation, useQueryClient } from '@tanstack/react-query';
import patchReservationStatus from '@/apis/patch/patchReservationStatus';
import ReservationTag from '@/components/ReservationTag';
import { queryKey } from '@/apis/queryKey';
// 주석 친 곳 버튼 디자인 필요!!
interface ReservationStatusProps {
  selectedStatus: 'pending' | 'declined' | 'confirmed';
  reservationId: number;
  activityId: number;
  onClickCloseModal?: () => void;
}
interface Props extends ReservationStatusProps {
  nickname: string;
  headCount: number;
  status: ReservationStatusProps['selectedStatus'];
}

function ReservationStatus({ selectedStatus, reservationId, activityId, onClickCloseModal }: ReservationStatusProps) {
  const queryClient = useQueryClient();

  const patchStatusMutation = useMutation({
    mutationFn: (data: { status: ReservationStatusProps['selectedStatus'] }) => patchReservationStatus(activityId, reservationId, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(reservationId, selectedStatus) });
      queryClient.invalidateQueries({ queryKey: [`/my-activities/${activityId}`] });
      onClickCloseModal && onClickCloseModal();
    },
  });

  const handleClickConfirmed = () => {
    patchStatusMutation.mutate({ status: 'confirmed' });
  };

  const handleClickDeclined = () => {
    patchStatusMutation.mutate({ status: 'declined' });
  };

  switch (selectedStatus) {
    case 'pending':
      return (
        <>
          {/* <button size='sm' onClick={handleClickConfirmed} text='확정하기' /> */}
          {/* <button size='sm' onClick={handleClickDeclined} variant='outline' text='거절하기' /> */}
        </>
      );
    case 'declined':
      return <ReservationTag status='declined' />;
    case 'confirmed':
      return <ReservationTag status='confirmed' />;
    default:
      return null;
  }
}

export default function ReservationCard({ selectedStatus, nickname, headCount, status, reservationId, activityId, onClickCloseModal }: Props) {
  if (status === selectedStatus) {
    return (
      <li className='flex flex-col justify-between items-stretch rounded-md border border-gray-300 p-6 w-[38.2rem] h-[11.6rem]'>
        <p className='flex items-start gap-4 text-lg font-medium text-gray-600'>
          닉네임<span className='text-black'>{nickname}</span>
        </p>
        <p className='flex items-start gap-4 text-lg font-medium text-gray-600'>
          인원<span className='text-black'>{headCount}명</span>
        </p>
        <div className='flex justify-end items-end gap-2.5'>
          <ReservationStatus onClickCloseModal={onClickCloseModal} activityId={activityId} reservationId={reservationId} selectedStatus={selectedStatus} />
        </div>
      </li>
    );
  } else {
    return <li className='flex flex-col justify-between items-stretch rounded-md border border-gray-300 p-6 w-[38.2rem] h-[11.6rem]'>해당하는 예약 내역이 없습니다</li>;
  }
}
