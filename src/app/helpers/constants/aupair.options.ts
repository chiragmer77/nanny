
export const languageData = [
  { text: 'Arabic', value: '1' },
  { text: 'Chinese', value: '2' },
  { text: 'Czech', value: '3' },
  { text: 'Danish', value: '4' },
  { text: 'Dutch', value: '5' },
  { text: 'English', value: '6' },
  { text: 'Finnish', value: '7' },
  { text: 'French', value: '8' },
  { text: 'German', value: '9' },
  { text: 'Hindi', value: '10' },
  { text: 'Italian', value: '11' },
  { text: 'Japanese', value: '12' },
  { text: 'Maltese', value: '13' },
  { text: 'Norwegian', value: '14' },
  { text: 'Polish', value: '15' },
  { text: 'Portuguese', value: '16' },
  { text: 'Russian', value: '17' },
  { text: 'Spanish', value: '18' },
  { text: 'Swedish', value: '19' },
  { text: 'Turkish', value: '20' },
  { text: 'Ukrainian', value: '21' },
];

export const monthData = [
  { text: 'January', value: '1' },
  { text: 'February', value: '2' },
  { text: 'March', value: '3' },
  { text: 'April', value: '4' },
  { text: 'May', value: '5' },
  { text: 'June', value: '6' },
  { text: 'July', value: '7' },
  { text: 'August', value: '8' },
  { text: 'September', value: '9' },
  { text: 'October', value: '10' },
  { text: 'November', value: '11' },
  { text: 'December', value: '12' },
];

export const hostKidAgeGroupData = [
  { text: '0-1 years', value: '1' },
  { text: '1-5 years', value: '2' },
  { text: '5-10 years', value: '3' },
  { text: '10-15 years', value: '4' },
  { text: '15+ years', value: '5' },
];

export const educationData = [
  { text: 'High School Diploma', value: 1 },
  { text: 'Bachelor Degree', value: 2 },
  { text: 'Master Degree', value: 3 },
  { text: 'Vocational training', value: 4 },
  { text: 'Others', value: 5 },
];

export const currencyData = [
  { text: 'EUR', value: 1 },
  { text: 'GBP', value: 2 },
  { text: 'USD', value: 3 },
  { text: 'AUD', value: 4 },
  { text: 'CAD', value: 5 },
  { text: 'CHF', value: 6 },
  { text: 'CNY', value: 7 },
  { text: 'CZK', value: 8 },
  { text: 'DKK', value: 9 },
  { text: 'ISK', value: 10 },
  { text: 'NOK', value: 11 },
  { text: 'NZD', value: 12 },
  { text: 'PLN', value: 13 },
  { text: 'SEK', value: 14 },
  { text: 'TRY', value: 15 },
  { text: 'Other', value: 16 },
];












export const durationOfStayData = [
  { text: '1-3 months', value: 1 },
  { text: '3-6 months', value: 2 },
  { text: '6-9 months', value: 3 },
  { text: '1 Year', value: 4 },
  { text: '2 Year', value: 5 },
];

export const religionData = [
  { text: 'Christian', value: 1 },
  { text: 'Muslim', value: 2 },
  { text: 'Jews', value: 3 },
  { text: 'Hindu', value: 4 },
  { text: 'Buddhist', value: 5 },
  { text: 'Atheist', value: 6 },
  { text: 'Other', value: 7 },
];

export enum StatusEnum {
  ACTIVELY_SEARCHING = 1,
  FOUND_FAMILY_NANNYAUPAIR = 2,
  FOUND_FAMILY = 3,
  NOT_SEARCHING = 4,
  REMATCH = 5
}
export enum parentStatusEnum {
  SEARCHING_FOR_AUPAIR = 1,
  FOUND_AUPAIR_NANNYAUPAIR = 2,
  FOUND_AUPAIR = 3,
  NOT_SEARCHING = 4
}

export const statusesData = [
  { text: 'Actively searching', value: StatusEnum.ACTIVELY_SEARCHING },
  { text: 'Found family through NannyAupair.com', value: StatusEnum.FOUND_FAMILY_NANNYAUPAIR },
  { text: 'Found family', value: StatusEnum.FOUND_FAMILY },
  { text: 'Not searching', value: StatusEnum.NOT_SEARCHING },
  { text: 'Rematch', value: StatusEnum.REMATCH },
];

export const familyStatusData = [
  { text: 'Searching for Au pair', value: parentStatusEnum.SEARCHING_FOR_AUPAIR },
  { text: 'Found Au pair through NannyAupair.com', value: parentStatusEnum.FOUND_AUPAIR_NANNYAUPAIR },
  { text: 'Found Au pair', value: parentStatusEnum.FOUND_AUPAIR },
  { text: 'Not searching', value: parentStatusEnum.NOT_SEARCHING },
];

export const genderListData = [
  { text: 'Male', value: 1 },
  { text: 'Female', value: 2 },
  { text: 'Other', value: 3 },
];

export const familyEmailData = [
  { text: 'Receive weekly match email', value: 1 },
  { text: 'No Weekly Email', value: 2 },
];

export function yearData(startYear: number, endYear: number): number[] {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

export function numberData(startNumber: number, endNumber: number): number[] {
  const numbers: number[] = [];
  for (let num = startNumber; num <= endNumber; num++) {
    numbers.push(num);
  }
  return numbers;
}

export const fromAupairAgeListData = numberData(15, 50);
export const toAupairAgeListData = numberData(16, 50);

export const numberOfChildrenData = [1, 2, 3, 4, 5, 6];

export const numberOfChildrenUpToData = numberOfChildrenData.map((e) => {
  return {
    value: e,
    text: e > 1 ? `Upto ${e}` : e,
  };
});

export const familyTypeData = [
  { value: 1, text: 'Both Parents' },
  { value: 2, text: 'Single Parent' },
];

export const rematchMonthData = numberData(1, 24);

export const countryData = [
  {
    text: 'Afghanistan',
    value: 200,
  },
  {
    text: 'Albania',
    value: 401,
  },
  {
    text: 'Algeria',
    value: 100,
  },
  {
    text: 'Andorra',
    value: 402,
  },
  {
    text: 'Angola',
    value: 101,
  },
  {
    text: 'Antigua and Barbuda',
    value: 600,
  },
  {
    text: 'Argentina',
    value: 500,
  },
  {
    text: 'Armenia',
    value: 201,
  },
  {
    text: 'Australia',
    value: 300,
  },
  {
    text: 'Austria',
    value: 403,
  },
  {
    text: 'Azerbaijan',
    value: 202,
  },
  {
    text: 'Bahamas',
    value: 501,
  },
  {
    text: 'Bahrain',
    value: 203,
  },
  {
    text: 'Bangladesh',
    value: 204,
  },
  {
    text: 'Barbados',
    value: 601,
  },
  {
    text: 'Belarus',
    value: 404,
  },
  {
    text: 'Belgium',
    value: 405,
  },
  {
    text: 'Belize',
    value: 602,
  },
  {
    text: 'Benin',
    value: 102,
  },
  {
    text: 'Bhutan',
    value: 205,
  },
  {
    text: 'Bolivia',
    value: 502,
  },
  {
    text: 'Bosnia and Herzegovina',
    value: 406,
  },
  {
    text: 'Botswana',
    value: 103,
  },
  {
    text: 'Brazil',
    value: 503,
  },
  {
    text: 'Brunei',
    value: 206,
  },
  {
    text: 'Bulgaria',
    value: 407,
  },
  {
    text: 'Burkina Faso',
    value: 104,
  },
  {
    text: 'Burundi',
    value: 105,
  },
  {
    text: 'Cabo Verde',
    value: 106,
  },
  {
    text: 'Cambodia',
    value: 207,
  },
  {
    text: 'Cameroon',
    value: 107,
  },
  {
    text: 'Canada',
    value: 603,
  },
  {
    text: 'Central African Republic',
    value: 108,
  },
  {
    text: 'Chad',
    value: 109,
  },
  {
    text: 'Chile',
    value: 504,
  },
  {
    text: 'China',
    value: 208,
  },
  {
    text: 'Colombia',
    value: 505,
  },
  {
    text: 'Comoros',
    value: 110,
  },
  {
    text: 'Congo',
    value: 111,
  },
  {
    text: 'Costa Rica',
    value: 506,
  },
  {
    text: 'Croatia',
    value: 408,
  },
  {
    text: 'Cuba',
    value: 604,
  },
  {
    text: 'Cyprus',
    value: 400,
  },
  {
    text: 'Czech Republic',
    value: 409,
  },
  {
    text: 'Denmark',
    value: 410,
  },
  {
    text: 'Djibouti',
    value: 112,
  },
  {
    text: 'Dominica',
    value: 605,
  },
  {
    text: 'Dominican Republic',
    value: 606,
  },
  {
    text: 'East Timor ',
    value: 209,
  },
  {
    text: 'Ecuador',
    value: 507,
  },
  {
    text: 'Egypt',
    value: 113,
  },
  {
    text: 'El Salvador',
    value: 607,
  },
  {
    text: 'Equatorial Guinea',
    value: 114,
  },
  {
    text: 'Eritrea',
    value: 115,
  },
  {
    text: 'Estonia',
    value: 411,
  },
  {
    text: 'Eswatini',
    value: 116,
  },
  {
    text: 'Ethiopia',
    value: 117,
  },
  {
    text: 'Fiji',
    value: 301,
  },
  {
    text: 'Finland',
    value: 412,
  },
  {
    text: 'France',
    value: 413,
  },
  {
    text: 'Gabon',
    value: 118,
  },
  {
    text: 'Gambia',
    value: 119,
  },
  {
    text: 'Georgia',
    value: 210,
  },
  {
    text: 'Germany',
    value: 414,
  },
  {
    text: 'Ghana',
    value: 120,
  },
  {
    text: 'Greece',
    value: 415,
  },
  {
    text: 'Grenada',
    value: 608,
  },
  {
    text: 'Guatemala',
    value: 609,
  },
  {
    text: 'Guinea',
    value: 121,
  },
  {
    text: 'Guinea-Bissau',
    value: 122,
  },
  {
    text: 'Guyana',
    value: 508,
  },
  {
    text: 'Haiti',
    value: 610,
  },
  {
    text: 'Honduras',
    value: 611,
  },
  {
    text: 'Hungary',
    value: 416,
  },
  {
    text: 'Iceland',
    value: 417,
  },
  {
    text: 'India',
    value: 211,
  },
  {
    text: 'Indonesia',
    value: 212,
  },
  {
    text: 'Iran',
    value: 213,
  },
  {
    text: 'Iraq',
    value: 214,
  },
  {
    text: 'Ireland',
    value: 418,
  },
  {
    text: 'Israel',
    value: 215,
  },
  {
    text: 'Italy',
    value: 419,
  },
  {
    text: 'Jamaica',
    value: 612,
  },
  {
    text: 'Japan',
    value: 216,
  },
  {
    text: 'Jordan',
    value: 217,
  },
  {
    text: 'Kazakhstan',
    value: 218,
  },
  {
    text: 'Kenya',
    value: 123,
  },
  {
    text: 'Kiribati',
    value: 302,
  },
  {
    text: 'Kosovo',
    value: 420,
  },
  {
    text: 'Kuwait',
    value: 219,
  },
  {
    text: 'Kyrgyzstan',
    value: 220,
  },
  {
    text: 'Laos',
    value: 221,
  },
  {
    text: 'Latvia',
    value: 421,
  },
  {
    text: 'Lebanon',
    value: 222,
  },
  {
    text: 'Lesotho',
    value: 124,
  },
  {
    text: 'Liberia',
    value: 125,
  },
  {
    text: 'Libya',
    value: 126,
  },
  {
    text: 'Liechtenstein',
    value: 422,
  },
  {
    text: 'Lithuania',
    value: 423,
  },
  {
    text: 'Luxembourg',
    value: 424,
  },
  {
    text: 'Macedonia ',
    value: 425,
  },
  {
    text: 'Malawi',
    value: 127,
  },
  {
    text: 'Malaysia',
    value: 223,
  },
  {
    text: 'Maldives',
    value: 224,
  },
  {
    text: 'Mali',
    value: 128,
  },
  {
    text: 'Malta',
    value: 426,
  },
  {
    text: 'Marshall Islands',
    value: 303,
  },
  {
    text: 'Mauritania',
    value: 129,
  },
  {
    text: 'Mauritius',
    value: 130,
  },
  {
    text: 'Mexico',
    value: 509,
  },
  {
    text: 'Micronesia',
    value: 304,
  },
  {
    text: 'Moldova',
    value: 427,
  },
  {
    text: 'Monaco',
    value: 428,
  },
  {
    text: 'Mongolia',
    value: 225,
  },
  {
    text: 'Montenegro',
    value: 429,
  },
  {
    text: 'Morocco',
    value: 131,
  },
  {
    text: 'Mozambique',
    value: 132,
  },
  {
    text: 'Myanmar ',
    value: 226,
  },
  {
    text: 'Namibia',
    value: 133,
  },
  {
    text: 'Nauru',
    value: 305,
  },
  {
    text: 'Nepal',
    value: 227,
  },
  {
    text: 'Netherlands',
    value: 430,
  },
  {
    text: 'New Zealand',
    value: 306,
  },
  {
    text: 'Niger',
    value: 134,
  },
  {
    text: 'Nigeria',
    value: 135,
  },
  {
    text: 'North Korea',
    value: 228,
  },
  {
    text: 'Norway',
    value: 431,
  },
  {
    text: 'Oman',
    value: 229,
  },
  {
    text: 'Pakistan',
    value: 230,
  },
  {
    text: 'Palau',
    value: 307,
  },
  {
    text: 'Panama',
    value: 613,
  },
  {
    text: 'Papua New Guinea',
    value: 308,
  },
  {
    text: 'Paraguay',
    value: 510,
  },
  {
    text: 'Peru',
    value: 511,
  },
  {
    text: 'Philippines',
    value: 231,
  },
  {
    text: 'Poland',
    value: 432,
  },
  {
    text: 'Portugal',
    value: 433,
  },
  {
    text: 'Qatar',
    value: 232,
  },
  {
    text: 'Republic of the Congo',
    value: 136,
  },
  {
    text: 'Romania',
    value: 434,
  },
  {
    text: 'Russia',
    value: 442,
  },
  {
    text: 'Rwanda',
    value: 137,
  },
  {
    text: 'Saint Kitts and Nevis',
    value: 614,
  },
  {
    text: 'Saint Lucia',
    value: 615,
  },
  {
    text: 'Samoa',
    value: 309,
  },
  {
    text: 'San Marino',
    value: 435,
  },
  {
    text: 'Saudi Arabia',
    value: 233,
  },
  {
    text: 'Senegal',
    value: 138,
  },
  {
    text: 'Serbia',
    value: 436,
  },
  {
    text: 'Seychelles',
    value: 139,
  },
  {
    text: 'Sierra Leone',
    value: 140,
  },
  {
    text: 'Singapore',
    value: 234,
  },
  {
    text: 'Somalia',
    value: 141,
  },
  {
    text: 'South Africa',
    value: 142,
  },
  {
    text: 'South Korea',
    value: 235,
  },
  {
    text: 'South Sudan',
    value: 143,
  },
  {
    text: 'Spain',
    value: 437,
  },
  {
    text: 'Sri Lanka',
    value: 236,
  },
  {
    text: 'Sudan',
    value: 144,
  },
  {
    text: 'Sweden',
    value: 438,
  },
  {
    text: 'Switzerland',
    value: 439,
  },
  {
    text: 'Syria',
    value: 237,
  },
  {
    text: 'Taiwan',
    value: 238,
  },
  {
    text: 'Tajikistan',
    value: 239,
  },
  {
    text: 'Tanzania',
    value: 145,
  },
  {
    text: 'Thailand',
    value: 240,
  },
  {
    text: 'Togo',
    value: 146,
  },
  {
    text: 'Tunisia',
    value: 147,
  },
  {
    text: 'Turkey',
    value: 246,
  },
  {
    text: 'Turkmenistan',
    value: 241,
  },
  {
    text: 'Tuvalu',
    value: 310,
  },
  {
    text: 'Uganda',
    value: 148,
  },
  {
    text: 'Ukraine',
    value: 440,
  },
  {
    text: 'United Arab Emirates',
    value: 242,
  },
  {
    text: 'United Kingdom',
    value: 441,
  },
  {
    text: 'United States',
    value: 616,
  },
  {
    text: 'Uzbekistan',
    value: 243,
  },
  {
    text: 'Venezuela',
    value: 512,
  },
  {
    text: 'Vietnam',
    value: 244,
  },
  {
    text: 'Yemen',
    value: 245,
  },
  {
    text: 'Zambia',
    value: 149,
  },
  {
    text: 'Zimbabwe',
    value: 150,
  },
];








export const frequentAupairCountryData = [
  {
    text: 'Brazil',
    value: 503,
  },
  {
    text: 'Germany',
    value: 414,
  },
  {
    text: 'Indonesia',
    value: 212,
  },
  {
    text: 'Italy',
    value: 419,
  },
  {
    text: 'Kenya',
    value: 123,
  },
  {
    text: 'Nepal',
    value: 227,
  },
  {
    text: 'Philippines',
    value: 231,
  },
  {
    text: 'South Africa',
    value: 142,
  },
  {
    text: 'Spain',
    value: 437,
  },
  {
    text: 'Thailand',
    value: 240,
  },
  {
    text: 'United Kingdom',
    value: 441,
  }
];  

export const frequentFamilyCountryData = [
  
  {
    text: 'Netherlands',
    value: 430,
  },
  {
    text: 'Austria',
    value: 403,
  },
  {
    text: 'Belgium',
    value: 405,
  },
  {
    text: 'Denmark',
    value: 410,
  },
  {
    text: 'Finland',
    value: 412,
  },
  {
    text: 'France',
    value: 413,
  },
  {
    text: 'Germany',
    value: 414,
  },
  {
    text: 'Ireland',
    value: 418,
  },
  {
    text: 'Italy',
    value: 419,
  },
  {
    text: 'Luxembourg',
    value: 424,
  },
 {
    text: 'Norway',
    value: 431,
  },
  {
    text: 'Spain',
    value: 437,
  },
  {
    text: 'Sweden',
    value: 438,
  },
  {
    text: 'United Kingdom',
    value: 441,
  },
  {
    text: 'United States',
    value: 616,
  },
  
];  

export const professionData = [
  { value: '1', text: 'Au pair' },
  { value: '2', text: 'Care giver' },
  { value: '3', text: 'Finance' },
  { value: '4', text: 'Healthcare' },
  { value: '5', text: 'Nanny' },
  { value: '6', text: 'Teacher' },
  { value: '7', text: 'Other' },
];

export const continentData = [
  {
    text: 'Europe',
    value: 4,
  },
  {
    text: 'Asia',
    value: 2,
  },
  {
    text: 'Africa',
    value: 1,
  },
  {
    text: 'South America',
    value: 5,
  },
  {
    text: 'North America',
    value: 6,
  },
  {
    text: 'Australia',
    value: 3,
  }, 
];

export const rematchContinentData = [
  {
    text: 'Europe',
    value: 4,
  },
  {
    text: 'North America',
    value: 6,
  },
  {
    text: 'Australia',
    value: 3,
  }, 
];


export const continentAndCountriesData = [
  { title: 'Continent', items: continentData },
  { title: 'Countries', items: countryData },
];

export const aupairCountryData = [
  { title: 'Frequent', items: frequentAupairCountryData },
  { title: 'Others', items: countryData },
];

export const familyCountryData = [
  { title: 'Frequent Countries', items: frequentFamilyCountryData },
  { title: 'Others', items: countryData },
];

export const continentAndCountriesAupairData = [
  { title: 'Continent', items: continentData },
  { title: 'Frequent', items: frequentAupairCountryData },
  { title: 'Countries', items: countryData },
];

export const continentAndCountriesFamilyData = [
  { title: 'Continent', items: continentData },
  { title: 'Frequent Countries', items: frequentFamilyCountryData },
  { title: 'Countries', items: countryData },
];

export const continentAndCountriesRematchData = [
  { title: 'Continent', items: rematchContinentData },
  { title: 'Frequent Countries', items: frequentFamilyCountryData }
];