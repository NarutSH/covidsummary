import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import Header from "./Header";
import TableCountries from "./TableCountries";
import Modal from "react-modal";

const Home = () => {
  let subtitle;
  const [result, setResult] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const totalConfirmed = new Intl.NumberFormat().format(
    selected.TotalConfirmed
  );
  const totalRecovered = new Intl.NumberFormat().format(
    selected.TotalRecovered
  );
  const totalDeaths = new Intl.NumberFormat().format(selected.TotalDeaths);
  const newConfirmed = new Intl.NumberFormat().format(selected.NewConfirmed);
  const newRecovered = new Intl.NumberFormat().format(selected.NewRecovered);
  const newDeaths = new Intl.NumberFormat().format(selected.NewDeaths);
  const totalInHospital = new Intl.NumberFormat().format(
    selected.TotalConfirmed - selected.TotalDeaths - selected.TotalRecovered
  );

  const fetchData = async () => {
    const response = await fetch(
      "https://api.covid19api.com/summary"
    ).then((res) => res.json());

    setResult(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const afterOpenModal = () => {
    subtitle.style.color = "teal";
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const displayConfirmed = (
    <div className="red statistic">
      <div className="value">
        <i className="plus square icon" />
        {totalConfirmed === "0" ? "unreported" : totalConfirmed} (+
        {newConfirmed})
      </div>
      <div className="label">confirmed</div>
    </div>
  );

  const displayRecovered = (
    <div className="green statistic">
      <div className="value">
        <i className="home  icon" />
        {totalRecovered === "0" ? "unreported" : totalRecovered} (+
        {newRecovered})
      </div>
      <div className="label">recovered</div>
    </div>
  );

  const displayInHospital = (
    <div className="yellow statistic">
      <div className="value">
        <i className="hospital icon" />
        {totalInHospital === "0" ? "unreported" : totalInHospital}
      </div>
      <div className="label">In Hospital</div>
    </div>
  );

  const displayDeaths = (
    <div className="red statistic">
      <div className="value">
        <i className="heartbeat icon" />
        {totalDeaths === "0" ? "unreported" : totalDeaths} (+
        {newDeaths})
      </div>
      <div className="label">deaths</div>
    </div>
  );

  const modalWindow = (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="ui blue ribbon label">
        <h3 ref={(_subtitle) => (subtitle = _subtitle)}>
          <i
            className={`${
              selected.CountryCode ? selected.CountryCode.toLowerCase() : ""
            } flag `}
          />
          <span style={{ color: "white" }}>
            {selected.Country ? selected.Country.toUpperCase() : ""}
          </span>
        </h3>
      </div>

      <div className="ui tiny statistics">
        {displayConfirmed}
        {displayRecovered}
        {displayInHospital}
        {displayDeaths}
      </div>
    </Modal>
  );

  return (
    <div>
      <Header />
      <div style={{ marginBlock: 20 }}>
        <Banner result={result.Global} />
      </div>
      <hr />
      <div style={{ marginBlock: 20 }}>
        <TableCountries
          result={result.Countries}
          setModalIsOpen={setModalIsOpen}
          setSelected={setSelected}
        />
      </div>
      {modalWindow}
    </div>
  );
};

export default Home;
