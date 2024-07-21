import Image from 'next/image';
import { ICON } from '@/constant';
import { GetActivitiesList } from '@/utils/types';
import { useRouter } from 'next/router';
/* eslint-disable */
interface CardResourceProps {
  activitiesData: GetActivitiesList;
  banner: boolean;
}

export default function CardResource({ activitiesData, banner }: CardResourceProps) {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/activityDetail/${id}`);
  };

  return (
    <div
      onClick={() => handleClick(activitiesData.id)}
      className={`flex flex-col gap-4 cursor-pointer bg-gradient-to-b 
		to-[#000000cc] transition-transform duration-300
		${banner ? 'hover:scale-125 relative md:w-[38.4rem] md:h-[38.4rem] w-[18.6rem] h-[18.6rem] from-transparent rounded-[2.4rem] flex-col-reverse' 
			: 'hover:scale-105'}`}
    >
      <div className={`${banner ? 'absolute inset-0 z-[-1] md:w-[38.4rem] md:h-[38.4rem] w-[18.6rem] h-[18.6rem]' 
	  : 'relative lg:w-[28.3rem] lg:h-[28.3rem] md:w-[22.1rem] md:h-[22.1rem] w-[16.8rem] h-[16.8rem] rounded-[1.6rem]'} 
	   overflow-hidden md:w-full md:pt-full md:h-auto `}>
        <Image
          src={activitiesData.bannerImageUrl}
          width={384}
          height={384}
          alt='배너 이미지'
          className=' object-cover transition-transform duration-300 md:absolute md:top-0 md:left-0 md:w-full md:h-full'
        />
      </div>
      <div className={`${banner ? 'absolute text-white' : 'text-black'} flex flex-col gap-4  w-full`}>
        <div className='flex items-center text-lg font-medium'>
          <Image src={ICON.star.active.src} width={20} height={20} alt={ICON.star.active.alt} className='mr-2' />
          {activitiesData.rating}
          &nbsp;
          <span className='text-[#a1a1a1]'>({activitiesData.reviewCount})</span>
        </div>
        <div className='text-2xl font-semibold line-clamp-1 md:text-lg'>{activitiesData.title}</div>
        <div className='flex items-center text-3xl font-bold gap-2 md:text-2xl'>
          {activitiesData.price === 0 ? (
            '무료체험'
          ) : (
            <>
              ￦ {activitiesData.price.toLocaleString()} <span className='text-2xl font-normal text-[#a4a1aa] md:text-lg'>/ 인</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
/* eslint-enable */
