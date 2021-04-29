import React, { useState, useEffect } from "react";

const TableCountries = ({ result, setModalIsOpen, setSelected }) => {
  const [term, setTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortName, setSortName] = useState("");
  const [page, setPage] = useState(1);
  const resultPerPage = 10;
  let displayData;
  let pagination;

  const openModal = (item) => {
    setModalIsOpen(true);
    setSelected(item);
  };

  const onHandleSorting = (type, name) => {
    setSortName(name);
    setSortType(type);
  };

  useEffect(() => {
    onHandleSorting("ascending", "TotalConfirmed");
  }, []);

  const iconSort = (name) => {
    return (
      <i
        onClick={
          sortType === "descending"
            ? () => onHandleSorting("ascending", name)
            : () => onHandleSorting("descending", name)
        }
        className={`angle ${
          sortType === "descending" && sortName === name ? "up" : "down"
        } icon`}
      />
    );
  };

  if (result) {
    const filteredResult = result.filter((item) => {
      return item.Country.toLowerCase().includes(term.toLowerCase());
    });

    const sortedResult = filteredResult.sort((a, b) => {
      if (sortName) {
        switch (sortType) {
          case "ascending":
            return b[sortName] - a[sortName];

          case "descending":
            return a[sortName] - b[sortName];

          default:
            return filteredResult;
        }
      }
      return filteredResult;
    });

    const sliceResult = (page) => {
      const start = (page - 1) * resultPerPage;
      const end = page * resultPerPage;

      return sortedResult.slice(start, end);
    };

    const dataPerPage = sliceResult(page);
    const numPages = Math.ceil(filteredResult.length / resultPerPage);

    pagination = (
      <div className="ui right floated horizontal divided list">
        {page - 1 > 0 ? (
          <p className="icon item" onClick={() => setPage(page - 1)}>
            <i className="left chevron icon" />
          </p>
        ) : (
          ""
        )}

        {page - 2 > 0 ? (
          <p className="item" onClick={() => setPage(page - 3)}>
            ...
          </p>
        ) : (
          ""
        )}
        {page - 1 > 0 ? (
          <p className="item" onClick={() => setPage(page - 1)}>
            {page - 1}
          </p>
        ) : (
          ""
        )}
        {numPages > 1 ? <p className="item active">{page}</p> : ""}
        {page + 1 < numPages ? (
          <p className="item" onClick={() => setPage(page + 1)}>
            {page + 1}
          </p>
        ) : (
          ""
        )}
        {page + 2 < numPages ? (
          <p className="item" onClick={() => setPage(page + 3)}>
            ...
          </p>
        ) : (
          ""
        )}
        {page + 1 < numPages ? (
          <p className="icon item" onClick={() => setPage(page + 1)}>
            <i className="right chevron icon" />
          </p>
        ) : (
          ""
        )}
      </div>
    );

    displayData = dataPerPage.map((item, index) => {
      const totalConfirmed = new Intl.NumberFormat().format(
        item.TotalConfirmed
      );
      const totalRecovered = new Intl.NumberFormat().format(
        item.TotalRecovered
      );
      const totalDeaths = new Intl.NumberFormat().format(item.TotalDeaths);

      return (
        <tr key={index} onClick={() => openModal(item)}>
          <td width="400">
            <h4 className="ui image header">
              <i className={`${item.CountryCode.toLowerCase()} flag `} />
              <div className="content">{item.Country.toUpperCase()}</div>
            </h4>
          </td>
          <td>{totalConfirmed === "0" ? "Unreported" : totalConfirmed}</td>
          <td>{totalRecovered === "0" ? "Unreported" : totalRecovered}</td>
          <td>{totalDeaths === "0" ? "Unreported" : totalDeaths}</td>
        </tr>
      );
    });
  }

  const onHandleSerch = (ev) => {
    setPage(1);
    setTerm(ev.target.value);
  };

  return (
    <div>
      <div>
        <div className="ui red ribbon label">
          <h3>COUNTRIES REPORT</h3>
        </div>
      </div>

      <div className="ui left icon input  table-input">
        <input
          type="text"
          value={term}
          onChange={onHandleSerch}
          placeholder="Search Country"
        />
        <i className="flag icon" />
      </div>
      <div className="pagination">{pagination}</div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>COUNTRY</th>
              <th>CONFIRMED {iconSort("TotalConfirmed")}</th>
              <th>RECOVERED {iconSort("TotalRecovered")}</th>
              <th>DEATH {iconSort("TotalDeaths")}</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCountries;
