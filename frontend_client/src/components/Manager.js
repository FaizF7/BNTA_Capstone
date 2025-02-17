import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

const Manager = ({ onButtonClick, listOfAddresses, postAddress, listOfDrivers }) => {

  const [addressToAdd, setAddressToAdd] = useState({})

  const generateListOfAddresses = listOfAddresses.map((address) => {
    return <li>{address.name}</li>;
  });

  const generateListOfDrivers = listOfDrivers.map((driver) => {
    return (driver.isManager ? null : <li>{driver.initials}</li>)
  });


  const navigate = useNavigate();

  const onPlaceSelect = (value) => {
    console.log(value);
  };

  const onSuggestionChange = (value) => {
    console.log(value);
  };
  const postprocessHook = (event) => {
    console.log(event);
    setAddressToAdd({
      longitude: event.properties.lon,
      latitude: event.properties.lat,
      name: event.properties.address_line1 + ", " + event.properties.address_line2,
      warehouseId: 1
    })
    console.log(addressToAdd);
    return (
      event.properties.address_line1 + ", " + event.properties.address_line2
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    postAddress(addressToAdd)
  }

  return (
    <section className="managerPage">
      <form className="addressSearch" onSubmit={(event) => handleSubmit(event)} >
        <GeoapifyContext apiKey="10063a680ab44fbc9c459ea693034b0c">
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter address here"
            // type={"street"}
            lang={"en"}
            position={"relative"}
            filterByCountryCode={["gb"]}
            limit={"5"}
            // value={""}
            placeSelect={onPlaceSelect}
            suggestionsChange={onSuggestionChange}
            postprocessHook={postprocessHook}
            allowNonVerifiedHouseNumber={true}

          />
        </GeoapifyContext>
        <input className="addressSearchSubmit btn-default" type="submit" value={"Add Address"} />
      </form>
      
      <div className="listOnManager">
        <div className="listOfAddresses">
          <h3>All Addresses:</h3>
          <ul>{generateListOfAddresses}</ul>
        </div>
        <div className="listOfDrivers">
          <h3>All drivers:</h3>
          <ul>{generateListOfDrivers}</ul>
        </div>
      </div>

      <button className="btn-default manager-btn" onClick={() => onButtonClick(navigate("/home"))}>
        Generate route
      </button>
    </section>
  );
};

export default Manager;
