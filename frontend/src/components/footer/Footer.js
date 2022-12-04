import React from "react";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "rgb(245 245 245)", marginTop: "30px" }}>
      <div className="w-11/12 m-auto flex grid grid-cols-1 md:grid-cols-3 md:gap-20 py-20">
        <div>
          <p className="text-xl font-bold mb-3 ">Coworking-space</p>
          <p className="mb-3 text-[10pt] text-justify whitespace-pre-line">
            <b>Coworking-space</b> is a platform operating in the field of{" "}
            <b>real estate rentals</b> for medium - long term residential use.
            The portal connects home owners with potential tenants. <br />
            The social mission of Coworking-space is the simplification and
            economic optimization of the process of finding a rental property
            that is currently expensive and complex.
          </p>
          <ul className="child:my-3 child:md:my-0">
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>About us</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>How does it work</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a target="_blank" href="#" rel="noreferrer">
                Blog
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Terms and conditions</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Privacy policy</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Cookie policy</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[15px] font-bold mb-3 my-5">Rent now</p>
          <ul className="mb-8 child:my-3 child:md:my-0">
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/create-listing"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Create a listing</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/rent-privates"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Are you an individual?</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/rent-professionals"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Are you a professional?</span>
              </a>
            </li>
          </ul>
          <p className="text-[15px] font-bold mb-3 my-5">Customer service</p>
          <ul className="child:my-3 child:md:my-0">
            <li className="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/help"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Help</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[15px] font-bold mb-3 my-5">Listings for rent</p>
          <ul className="mb-8 child:my-3 child:md:my-0">
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-milano"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Ha Noi</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-roma"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Da Nang</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-firenze"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Hue</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-torino"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Ho Chi Minh</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-bologna"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Da Lat</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/berlin"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Hoi An</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/munich"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Vung Tau</span>
              </a>
            </li>
            <li className="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/frankfurt"
                className="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Ca Mau</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
