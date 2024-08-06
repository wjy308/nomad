// 각종 아이콘, 이미지 가져오는 파일

import IconAccount from '../../public/icons/Icon_account_check.svg';
import IconAccountNoSelect from '../../public/icons/Icon_account_check_noSelect.svg';
import IconBed from '../../public/icons/Icon_bed.svg';
import IconBell from '../../public/icons/Icon_bell.svg';
import IconCalendar from '../../public/icons/Icon_calendar.svg';
import IconCalendarCheck from '../../public/icons/Icon_calendar_check.svg';
import IconCalendarCheckNoSelect from '../../public/icons/Icon_calendar_check_noSelect.svg';
import IconEyeOn from '../../public/icons/Icon_eye_on.svg';
import IconEyeOff from '../../public/icons/Icon_eye_off.svg';
import IconFacebook from '../../public/icons/Icon_facebook.svg';
import IconInstagram from '../../public/icons/Icon_instagram.svg';
import IconTwitter from '../../public/icons/Icon_twitter.svg';
import IconYoutube from '../../public/icons/Icon_youtube.svg';
import IconStarOn from '../../public/icons/Icon_star_on.svg';
import IconStarOff from '../../public/icons/Icon_star_off.svg';
import IconStarOffDark from '../../public/icons/Icon_star_off_dark.svg';
import IconTextBoxCheck from '../../public/icons/Icon_text-box_check.svg';
import IconTextBoxCheckNoSelect from '../../public/icons/Icon_text-box_check_noSelect.svg';
import IconMenu from '../../public/icons/Icon_meatball.svg';
import IconSetting from '../../public/icons/Icon_setting.svg';
import IconSettingNoSelect from '../../public/icons/Icon_setting_noSelect.svg';
import IconCancel from '../../public/icons/Icon_cancel.svg';
import IconX from '../../public/icons/Icon_X.svg';
import IconXBold from '../../public/icons/Icon_X_bold.svg';
import IconXMedium from '../../public/icons/Icon_X_medium.svg';
import IconLeftArrow from '../../public/icons/Icon_left-arrow_default.svg';
import IconLeftArrowActive from '../../public/icons/Icon_left-arrow_active.svg';
import IconRightArrow from '../../public/icons/Icon_right-arrow_default.svg';
import IconRightArrowActive from '../../public/icons/Icon_right-arrow_active.svg';
import IconDownArrow from '../../public/icons/Icon_down-arrow_default.svg';
import IconPlusTime from '../../public/icons/Icon_plus_time.svg';
import IconPlusInput from '../../public/icons/Icon_plus_input.svg';
import IconMinusTime from '../../public/icons/Icon_minus_time.svg';
import IconMinusInput from '../../public/icons/Icon_minus_input.svg';
import IconPlus from '../../public/icons/Icon_plus.svg';
import IconLeftArrowVariant1 from '../../public/icons/Icon_left-arrow_variant1.svg';
import IconRightArrowVariant1 from '../../public/icons/Icon_right-arrow_variant1.svg';
import IconRightArrowWhite from '../../public/icons/Icon_right_arrow-white.svg';
import IconLeftArrowWhite from '../../public/icons/Icon_left_arrow-white.svg';
import IconPen from '../../public/icons/Icon_pen.svg';
import IconEllipse from '../../public/icons/Icon_Ellipse.svg';
import IconEllipse_D from '../../public/icons/Icon_Ellipse_D.svg';
import IconFilter from '../../public/icons/Icon_filter.svg';
import IconCheck from '../../public/icons/Icon_check.svg';
import IconLoading from '../../public/icons/Icon_loading.svg';
import IconNotification from '../../public/icons/Icon_notification.svg';
import IconSubtract from '../../public/icons/Icon_subtract.svg';
import IconAdd from '../../public/icons/Icon_Add.svg';
import IconMapMarker from '../../public/icons/Icon_map_marker.svg';
import IconMapMarkerDarkMode from '../../public/icons/Icon_mapmarker_darkmode.svg';
import IconClose from '../../public/icons/Icon_close.svg';
import IconDarkClose from '../../public/icons/Icon_close_dark_mode.svg';
import IconDarkBell from '../../public/icons/Icon_darkmode_bell.svg';
import IconDownload from '../../public/icons/Icon_download.svg';

import ImageLogoSmall from '../../public/images/Image_logo_small.svg';
import ImageLogo from '../../public/images/Image_logo.svg';
import ImageDarkLogo from '../../public/images/Image_darkmode_logo.svg';
import ImageDefaultProfile from '../../public/images/Image_default_profile_image.png';
import ImageNoData from '../../public/images/Image_no_data.svg';
import ImageStreetDance from '../../public/images/Image_street_dance.jpg';
import ImageHotAirBalloon from '../../public/images/Image_hot_air_balloon.png';
import ImageSteppingStone from '../../public/images/Image_stepping_stone.jpg';

export const ICON = {
  accountCheck: {
    default: {
      src: {
        selected: IconAccount,
        noSelected: IconAccountNoSelect,
      },
      alt: '계정 체크',
    },
    active: {},
  },
  bed: {
    default: {
      src: IconBed,
      alt: '침대',
    },
    active: {},
  },
  bell: {
    default: {
      src: IconBell,
      alt: '종',
    },
    active: {},
  },
  calendar: {
    default: {
      src: IconCalendar,
      alt: '달력',
    },
    active: {},
  },
  calendarCheck: {
    default: {
      src: {
        selected: IconCalendarCheck,
        noSelected: IconCalendarCheckNoSelect,
      },
      alt: '달력 체크',
    },
    active: {},
  },
  eye: {
    on: {
      src: IconEyeOn,
      alt: '뜬 눈',
    },
    off: {
      src: IconEyeOff,
      alt: '감은 눈',
    },
  },
  facebook: {
    default: {
      src: IconFacebook,
      alt: '페이스북 로고',
    },
    active: {},
  },
  instagram: {
    default: {
      src: IconInstagram,
      alt: '인스타그램 로고',
    },
    active: {},
  },
  twitter: {
    default: {
      src: IconTwitter,
      alt: '트위터 로고',
    },
    active: {},
  },
  youtube: {
    default: {
      src: IconYoutube,
      alt: '유튜브 로고',
    },
    active: {},
  },
  star: {
    default: {
      src: IconStarOff,
      alt: '별',
    },
    active: {
      src: IconStarOn,
      alt: '별',
    },
    dark: {
      src: IconStarOffDark,
      alt: '별',
    },
  },

  textBoxCheck: {
    default: {
      src: {
        selected: IconTextBoxCheck,
        noSelected: IconTextBoxCheckNoSelect,
      },
      alt: '메모장 체크',
    },
    active: {},
  },
  menu: {
    default: {
      src: IconMenu,
      alt: '메뉴',
    },
    active: {},
  },
  setting: {
    default: {
      src: {
        selected: IconSetting,
        noSelected: IconSettingNoSelect,
      },
      alt: '세팅',
    },
  },
  cancel: {
    default: {
      src: IconCancel,
      alt: '취소',
    },
    active: {},
  },
  x: {
    default: {
      src: IconX,
      alt: '닫기',
    },
    active: {},
  },
  xBold: {
    default: {
      src: IconXBold,
      alt: '닫기',
    },
    active: {},
  },
  xMedium: {
    default: {
      src: IconXMedium,
      alt: '닫기',
    },
    active: {},
  },
  leftArrow: {
    default: {
      src: IconLeftArrow,
      alt: '이전',
    },
    active: {
      src: IconLeftArrowActive,
      alt: '이전',
    },
    variant1: {
      src: IconLeftArrowVariant1,
      alt: '이전',
    },
    whiteColor: {
      src: IconLeftArrowWhite,
      alt: '네비게이션 닫기',
    },
  },
  rightArrow: {
    default: {
      src: IconRightArrow,
      alt: '다음',
    },
    active: {
      src: IconRightArrowActive,
      alt: '다음',
    },
    variant1: {
      src: IconRightArrowVariant1,
      alt: '다음',
    },
    whiteColor: {
      src: IconRightArrowWhite,
      alt: '네비게이션 닫기',
    },
  },
  downArrow: {
    default: {
      src: IconDownArrow,
      alt: '목록 열기/닫기',
    },
    active: {},
  },
  plus: {
    default: {
      src: IconPlus,
      alt: '추가',
    },
    active: {},
  },
  plusTime: {
    default: {
      src: IconPlusTime,
      alt: '추가',
    },
    active: {},
  },
  plusInput: {
    default: {
      src: IconPlusInput,
      alt: '인원 추가',
    },
    active: {},
  },
  minusTime: {
    default: {
      src: IconMinusTime,
      alt: '삭제',
    },
    active: {},
  },
  minusInput: {
    default: {
      src: IconMinusInput,
      alt: '인원 감소',
    },
    active: {},
  },
  pen: {
    default: {
      src: IconPen,
      alt: '펜',
    },
    active: {},
  },
  ellipse: {
    default: {
      src: IconEllipse,
      alt: '점',
    },
    active: {
      src: IconEllipse_D, // 다크 모드 이미지
      alt: '점 다크 모드',
    },
  },
  filter: {
    default: {
      src: IconFilter,
      alt: '가격 필터 드롭다운',
    },
  },
  check: {
    default: {
      src: IconCheck,
      alt: '체크',
    },
    active: {},
  },
  loading: {
    default: {
      src: IconLoading,
      alt: '로딩',
    },
    active: {},
  },
  notification: {
    default: {
      src: IconNotification,
      alt: '알림',
    },
    active: {},
  },
  subtract: {
    default: {
      src: IconSubtract,
      alt: '빼기',
    },
    active: {},
  },
  add: {
    default: {
      src: IconAdd,
      alt: '더하기',
    },
    active: {},
  },
  mapMarker: {
    default: {
      src: IconMapMarker,
      alt: '마커',
    },
    whiteColor: {
      src: IconMapMarkerDarkMode,
      alt: '맵 마커 다크모드',
    },
    active: {},
  },
  close: {
    default: {
      src: IconClose,
      alt: '닫기',
    },
    active: {},
  },
  darkClose: {
    default: {
      src: IconDarkClose,
      alt: '다크 모드 닫기',
    },
  },
  darkModeBell: {
    default: {
      src: IconDarkBell,
      alt: '다크 모드 알림',
    },
  },
  download: {
    default: {
      src: IconDownload,
      alt: '다운로드',
    },
  },
};

export const IMAGE = {
  logo: {
    auth: {
      src: ImageLogo,
      alt: '로고',
    },
    nav: {
      src: ImageLogoSmall,
      alt: '로고',
    },
  },
  darkLogo: {
    src: ImageDarkLogo,
    alt: '다크 모드 로고',
  },
  avatar: {
    default: {
      src: ImageDefaultProfile,
      alt: '기본 프로필 이미지',
    },
  },
  banner: {
    first: {
      src: ImageSteppingStone,
      alt: '첫 번째 배너 이미지',
    },
    second: {
      src: ImageHotAirBalloon,
      alt: '두 번째 배너 이미지',
    },
    third: {
      src: ImageStreetDance,
      alt: '세 번째 배너 이미지',
    },
  },

  noData: {
    default: {
      src: ImageNoData,
      alt: '데이터없음',
    },
  },
};
