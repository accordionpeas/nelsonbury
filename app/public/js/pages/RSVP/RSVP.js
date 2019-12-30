import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Button from '../../components/Button';

const getGuestName = ({ index }) => {
  const input = document.querySelector(`#name-${index + 1}`);
  const value = input && input.value;

  if (value) {
    return value;
  }

  return `Guest ${index + 1}`;
};

const getOnChange = ({ setFormData, formData }) => (e) => {
  const name = e.target.getAttribute('name');
  const value = R.path(['target', 'value'], e);
  const omitStayAtHunstham = name === 'attending' && value === 'no';
  const data = omitStayAtHunstham ? R.omit(['stay-at-huntsham'], formData) : formData;

  setFormData({
    ...data,
    [name]: value,
  });
};

const getOnSubmit = ({
  setInvalid,
  formData,
  formRef,
  send,
}) => (e) => {
  e.preventDefault();

  const optionalNames = ['additional-info', 'dietary-requirements', 'reg-number'];

  const inputs = [...formRef.current.querySelectorAll('[name]')];

  const valid = inputs.every(input => (
    formData[input.name]
    || optionalNames.some(optionalName => input.name.includes(optionalName))
  ));

  if (valid) {
    setInvalid(false);
    send(formData);
  } else {
    setInvalid(true);
  }
};

const RSVP = ({
  send,
  isFetchingRSVP,
  didRSVPSucceed,
  didRSVPFail,
  noOfGuests,
  addGuest,
  removeGuest,
}) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({});
  const [invalid, setInvalid] = useState(false);

  const isAttending = formData.attending === 'yes';
  const isStayingAtHuntsham = formData['stay-at-huntsham'] === 'yes';
  const isNotStayingAtHuntsham = formData['stay-at-huntsham'] === 'no';

  if (didRSVPSucceed) {
    return (
      <div className="page rsvp">
        <div className="grid-container">
          <div className="grid-x grid-margin-x align-center">
            {
              isAttending ? (
                <p className="rsvp__success-message">Thank you! We&apos;ll be in touch soon.</p>
              ) : (
                <p className="rsvp__success-message">Sorry you can&apos;t make it! Thank you for letting us know.</p>
              )
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page rsvp">
      <div className="page__main">
        <form
          ref={formRef}
          className="rsvp__form"
          onChange={getOnChange({ setFormData, formData })}
          onSubmit={getOnSubmit({
            setInvalid,
            formData,
            formRef,
            send,
          })}
        >
          <div className="grid-container">
            <h1>RSVP</h1>
            <p>
              Before sending this form please have a read of the <a href="/lineup">lineup</a> and <a href="/accommodation">accommodation</a>{' '}
              pages so you&apos;re aware of the itinerary for the weekend.
            </p>

            {
              R.compose(
                R.map(index => (
                  <div
                    key={index}
                    className="grid-x grid-margin-x align-middle rsvp__form-row"
                  >
                    <div className="cell small-12 large-6">
                      <div className="rsvp__label-container">
                        <label
                          className="rsvp__label"
                          htmlFor={`name-${index + 1}`}
                        >
                          Guest {index + 1} name*
                        </label>
                      </div>
                    </div>
                    <div className="cell small-12 large-6">
                      <div className="rsvp__input-container">
                        <input
                          type="text"
                          id={`name-${index + 1}`}
                          name={`name-${index + 1}`}
                        />
                        {index !== 0 && (
                          <a
                            href="#"
                            className="rsvp__guest-button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeGuest();
                            }}
                          >
                            Remove guest
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )),
                R.range(0),
              )(noOfGuests)
            }

            <div className="grid-x grid-margin-x align-middle rsvp__form-row">
              <div className="cell small-12 large-6 large-offset-6 flex-container rsvp__guest-button-cell">
                <a
                  href="#"
                  className="rsvp__guest-button"
                  onClick={(e) => {
                    e.preventDefault();
                    addGuest();
                  }}
                >
                  Add another guest
                </a>
              </div>
            </div>

            <div className="grid-x grid-margin-x align-middle rsvp__form-row">
              <div className="cell small-12 large-6">
                <div className="rsvp__label-container">
                  <label className="rsvp__label" htmlFor="attending-yes">I / we will be attending *</label>
                </div>
              </div>
              <div className="cell small-12 large-6">
                <div className="rsvp__input-container">
                  <label htmlFor="attending-yes">Yes</label>
                  <input
                    type="radio"
                    name="attending"
                    id="attending-yes"
                    value="yes"
                  />
                  <label htmlFor="attending-no">No</label>
                  <input
                    type="radio"
                    name="attending"
                    id="attending-no"
                    value="no"
                  />
                </div>
              </div>
            </div>

            {isAttending && (
              <>
                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="email">Contact email address *</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <input
                        type="email"
                        id="email"
                        name="email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="stay-at-huntsham-yes">I / we would like to stay at Huntsham Court *</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <label htmlFor="stay-at-huntsham-yes">Yes</label>
                      <input
                        type="radio"
                        name="stay-at-huntsham"
                        id="stay-at-huntsham-yes"
                        value="yes"
                      />
                      <label htmlFor="stay-at-huntsham-no">No</label>
                      <input
                        type="radio"
                        name="stay-at-huntsham"
                        id="stay-at-huntsham-no"
                        value="no"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {isStayingAtHuntsham && (
              <>
                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="stay-on-friday-night-yes">I / we would like to stay on Friday night *</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <label htmlFor="stay-on-friday-night-yes">Yes</label>
                      <input
                        type="radio"
                        name="stay-on-friday-night"
                        id="stay-on-friday-night-yes"
                        value="yes"
                      />
                      <label htmlFor="stay-on-friday-night-no">No</label>
                      <input
                        type="radio"
                        name="stay-on-friday-night"
                        id="stay-on-friday-night-no"
                        value="no"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="stay-on-saturday-night-yes">I / we would like to stay on Saturday night *</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <label htmlFor="stay-on-saturday-night-yes">Yes</label>
                      <input
                        type="radio"
                        name="stay-on-saturday-night"
                        id="stay-on-saturday-night-yes"
                        value="yes"
                      />
                      <label htmlFor="stay-on-saturday-night-no">No</label>
                      <input
                        type="radio"
                        name="stay-on-saturday-night"
                        id="stay-on-saturday-night-no"
                        value="no"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="stay-on-sunday-night-yes">I / we would like to stay on Sunday night *</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <label htmlFor="stay-on-sunday-night-yes">Yes</label>
                      <input
                        type="radio"
                        name="stay-on-sunday-night"
                        id="stay-on-sunday-night-yes"
                        value="yes"
                      />
                      <label htmlFor="stay-on-sunday-night-no">No</label>
                      <input
                        type="radio"
                        name="stay-on-sunday-night"
                        id="stay-on-sunday-night-no"
                        value="no"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="reg-number">Registration number (if bringing a car)</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <input
                        type="text"
                        id="reg-number"
                        name="reg-number"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {isNotStayingAtHuntsham && (
              <>
                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="dinner-friday-night-yes">I / we would like to have dinner at Huntsham Court on Friday night *</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <label htmlFor="dinner-friday-night-yes">Yes</label>
                      <input
                        type="radio"
                        name="dinner-friday-night"
                        id="dinner-friday-night-yes"
                        value="yes"
                      />
                      <label htmlFor="dinner-friday-night-no">No</label>
                      <input
                        type="radio"
                        name="dinner-friday-night"
                        id="dinner-friday-night-no"
                        value="no"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="bbq-sunday-yes">I / we would like to attend the BBQ on Sunday *</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <label htmlFor="bbq-sunday-yes">Yes</label>
                      <input
                        type="radio"
                        name="bbq-sunday"
                        id="bbq-sunday-yes"
                        value="yes"
                      />
                      <label htmlFor="bbq-sunday-no">No</label>
                      <input
                        type="radio"
                        name="bbq-sunday"
                        id="bbq-sunday-no"
                        value="no"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {isAttending && (
              <Fragment>
                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <label className="rsvp__label" htmlFor="additional-info">Anything else we should know?</label>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container">
                      <textarea

                        id="additional-info"
                        name="additional-info"
                      />
                    </div>
                  </div>
                </div>

                 <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell">
                    <h2 className="text-align-center">Food choices</h2>
                  </div>
                </div>

                {
                  R.compose(
                    R.map(index => (
                      <div
                        key={index}
                        className="grid-x rsvp__form-group"
                      >
                        <div className="cell small-12">
                          <h3 className="text-align-center">
                            {getGuestName({ index })}
                          </h3>

                          <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                            <div className="cell small-12 large-6">
                              <div className="rsvp__label-container">
                                <label className="rsvp__label" htmlFor={`starter-crab-${index + 1}`}>Starter *</label>
                              </div>
                            </div>
                            <div className="cell small-12 large-6">
                              <div className="rsvp__input-container rsvp__input-container--column">
                                <div className="rsvp__input-container-inner flex-container align-middle">
                                  <input
                                    type="radio"
                                    name={`starter-${index + 1}`}
                                    id={`starter-crab-${index + 1}`}
                                    value="crab"
                                  />
                                  <label htmlFor={`starter-crab-${index + 1}`}>Fresh Dorset crab with spiced avocado, herb salad and Parmesan tuile</label>
                                </div>
                                <div className="flex-container align-middle">
                                  <input
                                    type="radio"
                                    name={`starter-${index + 1}`}
                                    id={`starter-tart-${index + 1}`}
                                    value="tart"
                                  />
                                  <label htmlFor={`starter-tart-${index + 1}`}>Caramelised red onion tart with rocket and parmesan salad (V)</label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                            <div className="cell small-12 large-6">
                              <div className="rsvp__label-container">
                                <label className="rsvp__label" htmlFor={`main-lamb-${index + 1}`}>Main *</label>
                              </div>
                            </div>
                            <div className="cell small-12 large-6">
                              <div className="rsvp__input-container rsvp__input-container--column">
                                <div className="rsvp__input-container-inner flex-container align-middle">
                                  <input
                                    type="radio"
                                    name={`main-${index + 1}`}
                                    id={`main-lamb-${index + 1}`}
                                    value="lamb"
                                  />
                                  <label htmlFor={`main-lamb-${index + 1}`}>Rosemary and garlic lamb rump with dauphinoise potatoes, greens and butternut squash puree</label>
                                </div>
                                <div className="flex-container align-middle">
                                  <input
                                    type="radio"
                                    name={`main-${index + 1}`}
                                    id={`main-wellington-${index + 1}`}
                                    value="wellington"
                                  />
                                  <label htmlFor={`main-wellington-${index + 1}`}>Mushroom wellington with butternut squash puree and shredded leeks (V)</label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                            <div className="cell small-12 large-6">
                              <div className="rsvp__label-container">
                                <label className="rsvp__label" htmlFor={`dietary-requirements-${index + 1}`}>Dietary Requirements</label>
                              </div>
                            </div>
                            <div className="cell small-12 large-6">
                              <div className="rsvp__input-container">
                                <input
                                  type="text"
                                  id={`dietary-requirements-${index + 1}`}
                                  name={`dietary-requirements-${index + 1}`}
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )),
                    R.range(0),
                  )(noOfGuests)
                }
              </Fragment>
            )}

            {invalid && (
              <div className="grid-x grid-margin-x align-center">
                <p className="rsvp__invalid-message">Please fill in all required fields</p>
              </div>
            )}

            {didRSVPFail && (
              <div className="grid-x grid-margin-x align-center">
                <p className="rsvp__invalid-message">Sorry, an error occurred</p>
              </div>
            )}

            <div className="grid-x grid-margin-x align-center">
              <Button
                disabled={isFetchingRSVP}
                showActivityIndicator={isFetchingRSVP}
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

RSVP.propTypes = {
  send: PropTypes.func.isRequired,
  isFetchingRSVP: PropTypes.bool,
  didRSVPSucceed: PropTypes.bool,
  didRSVPFail: PropTypes.bool,
  noOfGuests: PropTypes.number,
  addGuest: PropTypes.func.isRequired,
  removeGuest: PropTypes.func.isRequired,
};

export default RSVP;
