import { RouteConstant } from './app-routes.constants';

export class APPStorage {
  public static TOKEN = 'at';
  public static USER = 'u';
  public static REGISTER_USER = 'ru';
  public static TIMER_SETTING = 'ts';
}
export class HttpStatus {
  public static SUCCESS = 200;
  public static BAD_REQUEST = 400;
  public static UNAUTHORIZED = 401;
  public static FORBIDDEN = 403;
  public static CONFLICTS = 409;
  public static EXPIRED = 450;
  public static INTERNAL_SERVER = 500;
}

export enum LanguageEnum {
  EN = 'en',
  NL = 'nl',
}

export const translationLanguagesWithTitle = [
  { title: 'EN', value: LanguageEnum.EN },
  { title: 'NL', value: LanguageEnum.NL },
];

export const translationLanguages: string[] = translationLanguagesWithTitle.map(
  (e) => e.value
);

export const defaultLanguage = LanguageEnum.EN;

export class AppConstant {
  public static PAGE_SIZE = 10;
  public static TIMER = 300;
  public static NO_DATA = 'No data found';
  public static PAGINATION_ARRAY: number[] = [10, 25, 50, 100];
  public static TRANSFER_STATUS_TIMER = 5000;
  public static TOAST_TIMER = 3000;
  public static TWO_MB_IMAGE_SIZE = 2000000;
}

export enum HttpMethodsTypeEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PUT_MULTIPART = 'putMultiPart',
  POST_MULTIPART = 'postMultiPart',
}

export const languageList = [
  { id: 1, display: 'FR', value: 'FR' },
  { id: 2, display: 'EN', value: 'EN' },
  { id: 3, display: 'DE', value: 'DE' },
];

export enum UserTypeEnum {
  FAMILY = 'F',
  AU_PAIR = 'A',
}

export const userTypes = [
  {
    type: UserTypeEnum.FAMILY,
    label: 'Register as Family',
  },
  {
    type: UserTypeEnum.AU_PAIR,
    label: 'Register as Au pair',
  },
];

export const MY_MAT_DATE_PICKER_FORMATS = {
  parse: {
    dateInput: 'MMM/YYYY',
  },
  display: {
    dateInput: 'MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export enum UploadPhotoTypeEnum {
  PROFILE_PICTURE = 1,
  OTHER = 2,
}

export const imgExtensions = ['jpg', 'jpeg', 'png', 'svg', 'gif'];

export const imageTypes = imgExtensions.map((e) => `image/${e}`).join(',');

export const publicRoutes = [
  `/auth/${RouteConstant.LOGIN}`,
  `/auth/${RouteConstant.FORGOT_PASSWORD}`,
  `/auth/${RouteConstant.REGISTER}`,
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

export const reasonTypeData = [
  'Question',
  'Rematch',
  'Technical Issue',
  'Report a user',
  'Delete personal data',
  'Others',
];
