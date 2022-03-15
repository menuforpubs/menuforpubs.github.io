import get from 'lodash/fp/get';
import { parse, stringify } from 'qs';

export const getQueryParamsObj = (location, options = {}) => {
  const search = get('search', location);
  return parse(search, { ignoreQueryPrefix: true, ...options });
};

export const getQueryParamsStr = (qsObject, options = {}) => {
  return stringify(qsObject, { addQueryPrefix: true, ...options });
};
