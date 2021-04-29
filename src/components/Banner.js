import React from "react";

const Banner = ({ result }) => {
  let displayNewConfirmed;
  let displayDate;
  let displayTotalConfirmed;
  let displayOnAdmitted;
  let displayRecovered;
  let displayDeathCase;

  if (result) {
    displayNewConfirmed = (
      <div className="red statistic">
        <div className="value">
          <i className="plus square icon" />
          {new Intl.NumberFormat().format(result.NewConfirmed)}
        </div>
        <div className="label">New Confirmed today</div>
      </div>
    );

    displayDate = (
      <div className="teal statistic">
        <div className="value">{result.Date.slice(0, 10)}</div>
        <div className="label">Report date</div>
      </div>
    );

    displayTotalConfirmed = (
      <div className="orange statistic">
        <div className="value">
          <i className="plus square icon" />
          {new Intl.NumberFormat().format(result.TotalConfirmed)}
        </div>
        <div className="label">Total Confirmed</div>
      </div>
    );

    displayOnAdmitted = (
      <div className="yellow statistic">
        <div className="value">
          <i className="hospital icon" />
          {new Intl.NumberFormat().format(
            result.TotalConfirmed - result.TotalDeaths - result.TotalRecovered
          )}
        </div>
        <div className="label">Currently Hospitalized</div>
      </div>
    );

    displayRecovered = (
      <div className="green statistic">
        <div className="value">
          <i className="home icon" />
          {new Intl.NumberFormat().format(result.TotalRecovered)}
        </div>
        <div className="label">Total Recovered</div>
      </div>
    );

    displayDeathCase = (
      <div className="red statistic">
        <div className="value">
          <i className="heartbeat icon" />
          {new Intl.NumberFormat().format(result.TotalDeaths)}
        </div>
        <div className="label">Total Deaths</div>
      </div>
    );
  }

  return (
    <div>
      <div className="ui teal ribbon label">
        <h3>GLOBAL REPORT</h3>
      </div>
      <div className="ui two medium statistics" style={{ marginBlock: 20 }}>
        {displayNewConfirmed}
        {displayDate}
      </div>
      <div className="banner-container">
        <div className="ui two column very relaxed grid">
          <div className="column">
            <div className="ui two tiny statistics">
              {displayTotalConfirmed}
              {displayOnAdmitted}
            </div>
          </div>
          <div className="column">
            <div className="ui two tiny statistics">
              {displayRecovered}
              {displayDeathCase}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
