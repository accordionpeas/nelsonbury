import * as R from 'ramda';
import {
  isFetching as isFetchingAction,
  didSucceed as didSucceedAction,
  didFail as didFailAction,
} from './actions';

const hashtag = 'nelsonbury';

const filtered = [
  'B87WTqZgo0K',
  'o8KFFPJAi4',
  '6NMhbeiuDU',
];

// eslint-disable-next-line import/prefer-default-export
export const fetchPhotos = () => async (dispatch, getState) => {
  const state = getState();
  const isFetching = R.path(['photos', 'isFetching'], state);
  const endCursor = R.path(['photos', 'endCursor'], state);

  if (!isFetching) {
    dispatch(isFetchingAction());

    const maxIdParam = endCursor ? `&max_id=${endCursor}` : '';
    const response = await fetch(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1${maxIdParam}`);

    if (response.ok) {
      const data = await response.json();

      const photos = R.compose(
        R.filter(({ shortcode }) => !filtered.includes(shortcode)),
        R.map(edge => ({
          id: R.path(['node', 'id'], edge),
          thumbnailURL: R.path(['node', 'thumbnail_src'], edge),
          displayURL: R.path(['node', 'display_url'], edge),
          shortcode: R.path(['node', 'shortcode'], edge),
        })),
        R.pathOr([], ['graphql', 'hashtag', 'edge_hashtag_to_media', 'edges']),
      )(data);

      const newEndCursor = R.path(['graphql', 'hashtag', 'edge_hashtag_to_media', 'page_info', 'end_cursor'], data);

      dispatch(didSucceedAction({ photos, endCursor: newEndCursor }));
    } else {
      dispatch(didFailAction());
    }
  }
};
