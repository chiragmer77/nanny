import { environment } from '@env/environment';

const AUTH_BASE_URL = `${environment.apiUrl}/auth`;
const AUPAIR_BASE_URL = `${environment.apiUrl}/Aupair`;
const FAMILY_BASE_URL = `${environment.apiUrl}/Family`;
const PHOTO_BASE_URL = `${environment.apiUrl}/Photo`;
const COMMON_BASE_URL = `${environment.apiUrl}/Common`;
const CHAT_BASE_URL = `${environment.apiUrl}/Chat`;

export class API {
  public static REGISTER = `${AUTH_BASE_URL}/register`;
  public static LOGIN = `${AUTH_BASE_URL}/login`;
  public static SET_USER_LANGUAGE = `${AUTH_BASE_URL}/UpdateLanguage`;

  public static ADD_AUPAIR = `${AUPAIR_BASE_URL}/AddAupair`;
  public static ADD_FAMILY = `${FAMILY_BASE_URL}/AddFamily`;
  public static AUPAIR = `${AUPAIR_BASE_URL}`;
  public static AUPAIR_BY_ID = `${AUPAIR_BASE_URL}/GetAupairById`;
  public static FAMILY = `${FAMILY_BASE_URL}`;
  public static FAMILY_BY_ID = `${FAMILY_BASE_URL}/GetFamilyById`;
  public static FAMILY_WELCOME = `${FAMILY_BASE_URL}/GetFamilyWelcomePage`;
  public static PHOTO_UPLOAD = `${PHOTO_BASE_URL}/UploadPhotos`;
  public static GET_PHOTOS = `${PHOTO_BASE_URL}/GetPhotos`;
  public static DELETE_PHOTO = `${PHOTO_BASE_URL}/DeletePhoto`;
  public static SEARCH_AUPAIR = `${AUPAIR_BASE_URL}/SearchAupairs`;
  public static CRITERIA_SEARCH_OF_AUPAIR = `${AUPAIR_BASE_URL}/GetFamilySearchCriteriaOfAupair`;
  public static SEARCH_FAMILY = `${FAMILY_BASE_URL}/SearchFamilies`;
  public static CRITERIA_SEARCH_OF_FAMILY = `${FAMILY_BASE_URL}/GetAupairSearchCriteriaOfFamily`;
  public static USER_BY_PROFILE_NUMBER = `${COMMON_BASE_URL}/GetUserByProfileNumber`;
  public static GET_HOME_PAGE = `${COMMON_BASE_URL}/GetHomePage`;
  public static ADD_CONTACT = `${COMMON_BASE_URL}/AddContact`;

  public static ADD_FAVORITE = `${COMMON_BASE_URL}/AddFavorite`;
  public static REMOVE_FAVORITE = `${COMMON_BASE_URL}/RemoveFavorite`;
  public static FAVORITE_FAMILY = `${FAMILY_BASE_URL}/GetFamilyFavorites`;
  public static FAVORITE_AUPAIR = `${AUPAIR_BASE_URL}/GetAupairFavorites`;
  public static REMATCH = `${AUPAIR_BASE_URL}/GetRematches`;

  public static GET_CHAT_CONTACTS = `${CHAT_BASE_URL}/GetChatContacts`;
  public static GET_CHAT_CONTACT_BY_SENDER_ID = `${CHAT_BASE_URL}/GetChatContact`;
  public static GET_CHAT_MESSAGES = `${CHAT_BASE_URL}/GetChatMessages`;
  public static GET_CHAT_MESSAGES_UNREAD_COUNT = `${CHAT_BASE_URL}/GetUnreadMessageCount`;
  public static ADD_CHAT_MESSAGES = `${CHAT_BASE_URL}/AddChatMessage`;
  public static UPDATE_CHAT_MESSAGES = `${CHAT_BASE_URL}/UpdateChat`;
  public static BLOCK_UNBLOCK_USER= `${CHAT_BASE_URL}/BlockOrUnblock`;
  public static DELETE_CHAT_MESSAGES = `${CHAT_BASE_URL}/DeleteChat`;
  public static GET_ADD_CONVERSATION = `${CHAT_BASE_URL}/conversation`;
  public static EMAIL_CONFIRMATION=`${AUTH_BASE_URL}/ConfirmEmail`;
}
