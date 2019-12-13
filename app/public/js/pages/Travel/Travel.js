import React from 'react';

const Travel = () => (
  <div className="page">
    <div className="page__main">
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell">
            <h1>Travel</h1>
            <div className="page__section">
              <h2>To the venue</h2>
              <p>
                The address is <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/7LPbnWnNvyHWnFoEA">Huntsham Court, Huntsham, Tiverton, Devon, EX16 7NA</a>.{' '}
              </p>
              <h3>By car</h3>
              <p>
                It is about a 4 hour drive from London. Parking is available - please{' '}
                let us know when you RSVP if you are bringing a car.
              </p>
              <h3>By train</h3>
              <p>
                Tiverton Parkway Rail Station is six miles from the house (12mins by{' '}
                car/taxi). There is a regular fast train from London in 1hr 55mins.
              </p>
            </div>
            <div className="page__section">
              <h2>To the church</h2>
              <p>
                The address is <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/sPzxJbt5MutYLV9b7">St George&apos;s Church, Billet St, Taunton, Devon, TA1 3NG</a>.{' '}
              </p>
              <p>
                For guests staying at Huntsham Court, transport will be provided to and from{' '}
                the church. Please be ready to leave Huntsham Court at 12pm.
              </p>
              <p>
                For those not staying with us, parking is available at the church.
              </p>
            </div>
            <div className="page__section">
              <h2>Local taxis</h2>
              <ul>
                <li>Parkway Taxis – <a href="tel:0188438899">01884 388 99</a></li>
                <li>A-2-B Taxis – <a href="tel:01884251252">01884 251 252</a></li>
                <li>Trev&apos;s Taxi – <a href="tel:07592784849">07592 784 849</a></li>
              </ul>
              <p>Taxi fare will be about £15 from the station to Huntsham Court.</p>
              <p>
                Tiverton is a very remote area. If you will need a taxi on Saturday night or{' '}
                Sunday afternoon then we recommend you book it several days in advance. There{' '}
                is no Uber here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Travel;
