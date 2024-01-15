import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserDetails {
  name: string;
  ageRange?: number;
  major?: string;
  profileImg?: string;
  specialties: (keyof Specialty)[];
  interests: (keyof Interest)[];
}

export interface UserCore
  extends Pick<
    FirebaseAuthTypes.User,
    'displayName' | 'email' | 'phoneNumber' | 'uid'
  > {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  uid: string;
}

export interface User extends UserCredentials, UserDetails {
  core: UserCore;
}

export enum Specialty {
  Develop = '개발',
  Business = '경영/비즈니스',
  Marketing = '마케팅/광고',
  Design = '디자인',
  Sales = '영업',
  CsRetail = '고객서비스/리테일',
  Media = '미디어',
  EngineeringArchitect = '엔지니어링/설계',
  Hr = 'HR',
  Gamedevelop = '게임제작',
  Finance = '금융',
  ManufacturingProduction = '제조/생산',
  MedicalPharmaceuticalBio = '의료/제약/바이오',
  Education = '교육',
  LogisticsTrade = '물류/무역',
  FoodDring = '식/음료',
  ConstructionFacility = '건설/시설',
  PublicWellfare = '공공/복지',
  Creator = '크리에이터',
  VideoEdit = '영상편집',
}

export enum Interest {
  Love = '연애',
  Relationships = '인간관계',
  Achievement = '성공',
  WealthManagement = '재태크',
  Automobile = '자동차',
  Gaming = '게임',
  Music = '음악',
  Alcoholic = '주류',
  Performance = '공연',
  Movies = '영화',
  Broadcasting = '인터넷방송',
  Soccer = '축구',
  Baseball = '야구',
  Sports = '스포츠',
  Fitness = '운동',
  Dance = '댄스',
  Webtoon = '웹툰',
  Animation = '애니메이션',
  Wellness = '건강',
  Politics = '정치',
  Travel = '여행',
  Marriage = '결혼',
  RealEstate = '부동산',
}
