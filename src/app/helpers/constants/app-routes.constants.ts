export class RouteConstant {
  public static readonly AUTH = "auth";

  public static LOGIN = "login";
  public static LOGIN_ROUTE = `${RouteConstant.AUTH}/${RouteConstant.LOGIN}`;

  public static REGISTER = "register";
  public static REGISTER_ROUTE = `${RouteConstant.AUTH}/${RouteConstant.REGISTER}`;

  public static CONTACT_US = "contact-us";
  public static CONTACT_US_ROUTE = `${RouteConstant.CONTACT_US}`;

  public static FORGOT_PASSWORD = 'forgot-password';
  public static FORGOT_PASSWORD_ROUTE = `${RouteConstant.AUTH}/${RouteConstant.FORGOT_PASSWORD}`;

  public static RESET_PASSWORD = 'reset-password';
  public static RESET_PASSWORD_ROUTE = `${RouteConstant.AUTH}/${RouteConstant.RESET_PASSWORD}`;

  public static readonly ARTICLE = 'article';

  public static ARTICLE_DETAIL = "detail";
  public static ARTICLE_DETAIL_ROUTE = `${RouteConstant.ARTICLE}/${RouteConstant.ARTICLE_DETAIL}`;

  public static TERMS_DETAIL = 'terms';
  public static TERMS_DETAIL_ROUTE = `${RouteConstant.ARTICLE}/${RouteConstant.TERMS_DETAIL}`;

  public static AUPAIR_INTERVIEWQUESTIONS = 'aupair-interview-questions';
  public static AUPAIR_INTERVIEWQUESTIONS_ROUTE = `${RouteConstant.ARTICLE}/${RouteConstant.AUPAIR_INTERVIEWQUESTIONS}`;

  public static AUPAIR_AVOIDSCAMS = 'aupair-avoid-scams';
  public static AUPAIR_AVOIDSCAMS_ROUTE = `${RouteConstant.ARTICLE}/${RouteConstant.AUPAIR_AVOIDSCAMS}`;

  public static AUPAIR_COUNTRY = 'aupair-bible';
  public static AUPAIR_COUNTRY_ROUTE = `${RouteConstant.ARTICLE}/${RouteConstant.AUPAIR_COUNTRY}`;

  public static FOR_FAMILY = 'host-family';
  public static FOR_FAMILY_ROUTE = `${RouteConstant.ARTICLE}/${RouteConstant.FOR_FAMILY}`;


  public static readonly SEARCH = "search";

  public static AUPAIR_IMPROVE_CHANCES = 'improve';
  
  // complete registration
  public static readonly COMPLETE_REGISTRATION = "complete-registration";
  public static COMPLETE_AUPAIR_REGISTRATION = "aupair";
  public static COMPLETE_AUPAIR_REGISTRATION_ROUTE = `${RouteConstant.COMPLETE_REGISTRATION}/${RouteConstant.COMPLETE_AUPAIR_REGISTRATION}`;
  public static COMPLETE_FAMILY_REGISTRATION = "family";
  public static COMPLETE_FAMILY_REGISTRATION_ROUTE = `${RouteConstant.COMPLETE_REGISTRATION}/${RouteConstant.COMPLETE_FAMILY_REGISTRATION}`;

  // edit profile
  public static readonly EDIT_PROFILE = "edit-profile";
  public static AUPAIR_EDIT_PROFILE = "aupair";
  public static AUPAIR_EDIT_PROFILE_ROUTE = `${RouteConstant.EDIT_PROFILE}/${RouteConstant.AUPAIR_EDIT_PROFILE}`;
  public static FAMILY_EDIT_PROFILE = "family";
  public static FAMILY_EDIT_PROFILE_ROUTE = `${RouteConstant.EDIT_PROFILE}/${RouteConstant.FAMILY_EDIT_PROFILE}`;

  // view profile
  public static readonly VIEW_PROFILE = "view-profile";
  public static AUPAIR_VIEW_PROFILE = "aupair";
  public static AUPAIR_VIEW_PROFILE_ROUTE = `${RouteConstant.VIEW_PROFILE}/${RouteConstant.AUPAIR_VIEW_PROFILE}`;
  public static FAMILY_VIEW_PROFILE = "family";
  public static FAMILY_VIEW_PROFILE_ROUTE = `${RouteConstant.VIEW_PROFILE}/${RouteConstant.FAMILY_VIEW_PROFILE}`;
  public static IMAGE_VIEW_SLIDER = "image-view-slider";

    // welcome profile
    public static readonly WELCOME_PROFILE = "welcome-profile";
    public static AUPAIR_WELCOME_PROFILE = "aupair";
    public static AUPAIR_WELCOME_PROFILE_ROUTE = `${RouteConstant.WELCOME_PROFILE}/${RouteConstant.AUPAIR_WELCOME_PROFILE}`;
    public static FAMILY_WELCOME_PROFILE = "family";
    public static FAMILY_WELCOME_PROFILE_ROUTE = `${RouteConstant.WELCOME_PROFILE}/${RouteConstant.FAMILY_WELCOME_PROFILE}`;

    public static readonly CHAT = "chat";
    public static readonly REMATCH = "rematch";

    public static EMAIL_VERIFY = "confirmemail";
    public static EMAIL_VERIFY_ROUTE = `${RouteConstant.EMAIL_VERIFY}/:id`;
}
