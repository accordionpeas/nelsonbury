import { connect } from 'react-redux';
import * as R from 'ramda';
import Component from './Photos';
import { fetchPhotos } from '../../state/modules/photos';

export const mapStateToProps = ({ photos }) => ({
  photos: R.propOr([], 'photos', photos),
  isFetching: R.prop('isFetching', photos),
});

export const mapDispatchToProps = dispatch => ({
  fetchPhotos: props => dispatch(fetchPhotos(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
