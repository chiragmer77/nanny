import { AppConstant, imageTypes } from '../constants';

export const isEmpty = (obj: any): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const AppLogger = (value: any) => {
  // console.log(`<------------------------------------ ${value} ------------------------------------>`);
};

export const removeBlankValue = (params = {}) => {
  const obj: any = { ...params };
  Object.keys(obj).forEach(
    (key) =>
      ((typeof obj[key] !== 'boolean' && !obj[key]) ||
        (typeof obj[key] === 'string' && !obj[key].trim())) &&
      delete obj[key]
  );
  return obj;
};

export const removeFieldsFromObj = (obj: any, fieldArr: string[] = []): any => {
  const newObj = { ...obj };
  fieldArr.forEach((field) => {
    delete newObj[field];
  });
  return newObj;
};

export function calculateSum(
  array: any,
  property: any,
  shouldConsiderDecimal = true
) {
  const total = array.reduce((accumulator: any, object: any) => {
    return (
      accumulator +
        (shouldConsiderDecimal
          ? object[property]
          : parseInt(object[property] || 0)) || 0
    );
  }, 0);
  return total;
}

export const getInitials = (fromStr: string, upTo = 1): string => {
  const initials = (fromStr && fromStr.match(/\b\w/g)) || [];
  const toStr = (
    (initials.shift() || '') + (initials.pop() || '')
  ).toUpperCase();
  return toStr;
};

export const findPercentage = (
  partialValue: number,
  totalValue: number
): number => {
  return (100 * partialValue) / totalValue;
};

export const isImageType = (type: string): boolean => {
  return imageTypes.indexOf(type) > -1;
};

export const isImageSize = (file: any): boolean => {
  return file.size > AppConstant.TWO_MB_IMAGE_SIZE;
};

export const getCurrentDateWithFirstDateOfMonth = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return firstDay;
};

export const getUserIndex = (userList: any[] = [], userObj: any) => {
  const userIdx = userList.findIndex((e: any) =>
    e.id === 0 ? e.profileNumber === userObj.profileNumber : e.id === userObj.id
  );
  return userIdx;
};
