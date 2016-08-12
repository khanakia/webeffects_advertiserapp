export const FETCH_TAGS = 'FETCH_TAGS';
export const FILTER_TAGS = 'FILTER_TAGS';

export const SELECT_TAG = 'SELECT_TAG';


export function fetchTags(data) {
  return {
    type: FETCH_TAGS,
    payload: data
  };
}


export function filterTags(data) {
  return {
    type: FILTER_TAGS,
    payload: data
  };
}


export function selectTag(tag) {
  return {
    type: SELECT_TAG,
    payload: tag
  };
}
