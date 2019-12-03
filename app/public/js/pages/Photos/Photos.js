import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ActivityIndicator from '../../components/ActivityIndicator';

const Photos = ({
  photos,
  fetchPhotos,
  isFetching,
}) => {
  useEffect(() => {
    fetchPhotos();

    const observer = new IntersectionObserver(fetchPhotos, {
      rootMargin: '1000px',
      threshold: 1.0,
    });

    observer.observe(document.querySelector('#photos-bottom'));
  }, [fetchPhotos]);

  return (
    <div className="page page__min-height photos">
      <div className="page__main">
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell">
              <h1>
                <a className="heading__link" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/explore/tags/nelsonbury/">#nelsonbury</a>
              </h1>
              <p className="text-align-center">
                Please share your pictures with us from the weekend using the{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/explore/tags/nelsonbury/">#nelsonbury</a>{' '}
                hashtag on Instagram.
              </p>
              <br />
              <br />
            </div>
          </div>
          <div className="grid-x grid-margin-x">
            {
              photos.map(({ id, thumbnailURL, shortcode }) => (
                <div key={id} className="cell small-12 medium-6 large-4 xlarge-3">
                  <a
                    href={`https://www.instagram.com/p/${shortcode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="photos__image"
                      src={thumbnailURL}
                    />
                  </a>
                </div>
              ))
            }
          </div>
          <div id="photos-bottom" />
          { isFetching && (
            <div className="grid-x align-center">
              <ActivityIndicator />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Photos.propTypes = {
  photos: PropTypes.array,
  fetchPhotos: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default Photos;
