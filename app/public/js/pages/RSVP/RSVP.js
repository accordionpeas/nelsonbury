import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Button from '../../components/Button';
import FoodChoice from './FoodChoice';

const isServer = typeof window === 'undefined';

const getGuestName = ({ index }) => {
  if (!isServer) {
    const input = document.querySelector(`#name-${index + 1}`);
    const value = input && input.value;

    if (value) {
      return value;
    }
  }

  return `Guest ${index + 1}`;
};

const getOnChange = ({ setFormData, formData }) => (e) => {
  const name = e.target.getAttribute('name');
  const value = R.path(['target', 'value'], e);

  setFormData({
    ...formData,
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

  const optionalNames = ['dietary-requirements', 'reg-number'];

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
  const pronoun = noOfGuests === 1 ? 'I' : 'We';
  const isAttendingHartnollLunch = formData['attending-hartnoll-lunch'] === 'yes';

  if (didRSVPSucceed) {
    return (
      <div className="page rsvp">
        <div className="grid-container">
          <div className="grid-x grid-margin-x align-center">
            <p className="rsvp__success-message">Thank you! We look forward to seeing you soon.</p>
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
              <div className="cell">
                <h2 className="text-align-center">Wedding Breakfast</h2>
              </div>
            </div>

            {
              R.compose(
                R.map(index => (
                  <FoodChoice
                    type="wedding-breakfast"
                    key={index}
                    index={index}
                    name={getGuestName({ index })}
                    formData={formData}
                    childMenu="Sausages and mash with peas and ketchup"
                    noMenu="There will be fridge space available if you would like to bring your own food for infants"
                    starters={[
                      {
                        label: 'Fresh Dorset crab with spiced avocado, herb salad and Parmesan tuile',
                        value: 'crab',
                      },
                      {
                        label: 'Caramelised red onion tart with rocket and parmesan salad (V)',
                        value: 'tart',
                      },
                    ]}
                    mains={[
                      {
                        label: 'Rosemary and garlic lamb rump with gremolata, roasted new potatoes, shallots, peppers and red onions',
                        value: 'lamb',
                      },
                      {
                        label: 'Mushroom wellington with butternut squash puree and shredded leeks (V)',
                        value: 'wellington',
                      },
                    ]}
                    showDietaryRequirements
                  />
                )),
                R.range(0),
              )(noOfGuests)
            }

          <div className="grid-x grid-margin-x align-middle rsvp__form-row">
              <div className="cell small-12 large-6">
                <div className="rsvp__label-container">
                  <label className="rsvp__label" htmlFor="attending-hartnoll-lunch-yes">{pronoun} will be attending lunch at Hartnoll Hotel on 4th August*</label>
                </div>
              </div>
              <div className="cell small-12 large-6">
                <div className="rsvp__input-container">
                  <label htmlFor="attending-hartnoll-lunch-yes">Yes</label>
                  <input
                    type="radio"
                    name="attending-hartnoll-lunch"
                    id="attending-hartnoll-lunch-yes"
                    value="yes"
                  />
                  <label htmlFor="attending-hartnoll-lunch-no">No</label>
                  <input
                    type="radio"
                    name="attending-hartnoll-lunch"
                    id="attending-hartnoll-lunch-no"
                    value="no"
                  />
                </div>
              </div>
            </div>

            {isAttendingHartnollLunch && (
              <>
                <div className="grid-x grid-margin-x align-middle rsvp__form-row">
                  <div className="cell">
                    <h2 className="text-align-center">Hartnoll Hotel lunch (£27.50 per person)</h2>
                  </div>
                </div>
                {R.compose(
                  R.map(index => (
                    <FoodChoice
                      type="hartnoll-lunch"
                      key={index}
                      index={index}
                      name={getGuestName({ index })}
                      formData={formData}
                      childMenu="TBC"
                      starters={[
                        {
                          label: 'Roasted Heritage Beetroot and Grilled Goats Cheese Salad, Hazelnuts, Pumpkin Seed and Fennel Dukkah, Baby Leaf Salad',
                          value: 'goats-cheese-salad',
                        },
                        {
                          label: 'Charred Severn and Wye Smoked Mackerel Mousse, Apple and Walnut Salad, Horseradish Mayo, Orange Curd',
                          value: 'mackerel-mousse',
                        },
                        {
                          label: 'Ham Hock Terrine, Baby Pickles, Mustard Mayo, Sour Dough Toast',
                          value: 'ham-hock',
                        },
                      ]}
                      mains={[
                        {
                          label: 'Baked Aubergine, Feta Cheese, Vegetable Ragout, Cous Cous Salad, Balsamic Dressing',
                          value: 'aubergine',
                        },
                        {
                          label: 'West Country Beef Burger, Smoked Bacon, West Country Gruyere Cheese, Spiked BBQ & Maple Sauce, Hartnoll Coleslaw & French Fries',
                          value: 'burger',
                        },
                        {
                          label: 'Beachridge Farm Maze Fed Chicken Breast, Fondant Potato, Green Beans, Thyme Jus',
                          value: 'chicken',
                        },
                      ]}
                      desserts={[
                        {
                          label: 'Summer Berry Eton Mess',
                          value: 'eton-mess',
                        },
                        {
                          label: 'Dark Chocolate Brownie, Chocolate Sauce, Honeycomb Ice Cream',
                          value: 'brownie',
                        },
                        {
                          label: 'Glazed Lemon Tart, Blackcurrant Sorbet',
                          value: 'lemon-tart',
                        },
                      ]}
                    />
                  )),
                  R.range(0),
                )(noOfGuests)}
              </>
            )}

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
