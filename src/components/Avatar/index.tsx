import Image from 'next/image';
import {IMAGE} from "@/constant/importImages" 

interface AvatarProps {
  profileImageUrl?: string | null;
  type: 'gnb' | 'comment';
}

export default function Avatar({ profileImageUrl = null, type }: AvatarProps) {
  const imageUrl = profileImageUrl || IMAGE.avatar.default.src;
  const size = type === 'gnb' ? 'h-8 w-8' : 'h-11 w-11';

  return (
    <div className={`flex justify-center items-center rounded-full overflow-hidden flex-shrink-0 ${size}`}>
      <Image src={imageUrl} alt='프로필 이미지' height={type === 'gnb' ? 32 : 45} width={type === 'gnb' ? 32 : 45} />
    </div>
  );
}
