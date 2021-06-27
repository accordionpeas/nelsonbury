import React from 'react';
import PropTypes from 'prop-types';

const FoodChoice = ({
  type,
  name,
  index,
  formData,
  childMenu,
  noMenu,
  starters,
  mains,
  desserts,
  showDietaryRequirements,
}) => {
  const menuType = formData[`menu-type-${index + 1}-${type}`];

  return (
    <div
      className="grid-x rsvp__form-group"
    >
      <div className="cell small-12">
        <h3 className="text-align-center">{name}</h3>

        <div className="grid-x grid-margin-x align-middle rsvp__form-row">
          <div className="cell small-12 large-6">
            <div className="rsvp__label-container">
              <label className="rsvp__label" htmlFor={`menu-type-main-${index + 1}-${type}`}>Menu type *</label>
            </div>
          </div>
          <div className="cell small-12 large-6">
            <div className="rsvp__input-container">
              <label htmlFor={`menu-type-main-${index + 1}-${type}`}>Main menu</label>
              <input
                type="radio"
                name={`menu-type-${index + 1}-${type}`}
                id={`menu-type-main-${index + 1}-${type}`}
                value="main"
              />
              <label htmlFor={`menu-type-child-${index + 1}-${type}`}>Children&apos;s menu</label>
              <input
                type="radio"
                name={`menu-type-${index + 1}-${type}`}
                id={`menu-type-child-${index + 1}-${type}`}
                value="child"
              />
              <label htmlFor={`menu-type-infant-${index + 1}-${type}`}>None (infant)</label>
              <input
                type="radio"
                name={`menu-type-${index + 1}-${type}`}
                id={`menu-type-infant-${index + 1}-${type}`}
                value="none"
              />
            </div>
          </div>
        </div>

        {menuType === 'main' && (
          <>
            <div className="grid-x grid-margin-x align-middle rsvp__form-row">
              <div className="cell small-12 large-6">
                <div className="rsvp__label-container">
                  <label className="rsvp__label" htmlFor={`starter-${starters[0].value}-${index + 1}-${type}`}>Starter *</label>
                </div>
              </div>
              <div className="cell small-12 large-6">
                <div className="rsvp__input-container rsvp__input-container--column">
                  {starters.map(({ label, value }) => (
                    <div key={value} className="rsvp__input-container-inner flex-container align-middle">
                      <input
                        type="radio"
                        name={`starter-${index + 1}-${type}`}
                        id={`starter-${value}-${index + 1}-${type}`}
                        value={value}
                      />
                      <label htmlFor={`starter-${value}-${index + 1}-${type}`}>{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid-x grid-margin-x align-middle rsvp__form-row">
              <div className="cell small-12 large-6">
                <div className="rsvp__label-container">
                  <label className="rsvp__label" htmlFor={`main-${mains[0].value}-${index + 1}-${type}`}>Main *</label>
                </div>
              </div>
              <div className="cell small-12 large-6">
                <div className="rsvp__input-container rsvp__input-container--column">
                  {mains.map(({ label, value }) => (
                    <div key={value} className="rsvp__input-container-inner flex-container align-middle">
                      <input
                        type="radio"
                        name={`main-${index + 1}-${type}`}
                        id={`main-${value}-${index + 1}-${type}`}
                        value={value}
                      />
                      <label htmlFor={`main-${value}-${index + 1}-${type}`}>{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid-x grid-margin-x align-middle rsvp__form-row">
              {desserts ? (
                <>
                  <div className="cell small-12 large-6">
                  <div className="rsvp__label-container">
                    <label className="rsvp__label" htmlFor={`dessert-${desserts[0].value}-${index + 1}-${type}`}>Dessert *</label>
                  </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__input-container rsvp__input-container--column">
                      {desserts.map(({ label, value }) => (
                        <div key={value} className="rsvp__input-container-inner flex-container align-middle">
                          <input
                            type="radio"
                            name={`dessert-${index + 1}-${type}`}
                            id={`dessert-${value}-${index + 1}-${type}`}
                            value={value}
                          />
                          <label htmlFor={`dessert-${value}-${index + 1}-${type}`}>{label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <p className="rsvp__label">Dessert</p>
                    </div>
                  </div>
                  <div className="cell small-12 large-6">
                    <div className="rsvp__label-container">
                      <p>A trio of desserts will be available</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {menuType === 'child' && childMenu && (
          <p style={{ textAlign: 'center' }}>{childMenu}</p>
        )}

        {menuType === 'none' && noMenu && (
          <p style={{ textAlign: 'center' }}>{noMenu}</p>
        )}

        {showDietaryRequirements && (
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
        )}

      </div>
    </div>
  );
};

FoodChoice.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  formData: PropTypes.any.isRequired,
  childMenu: PropTypes.string,
  noMenu: PropTypes.string,
  starters: PropTypes.array.isRequired,
  mains: PropTypes.array.isRequired,
  desserts: PropTypes.array,
  showDietaryRequirements: PropTypes.bool,
};

export default FoodChoice;
