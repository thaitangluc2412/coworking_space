import React from "react";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "rgb(245 245 245)" }}>
      <div className="w-11/12 m-auto flex grid grid-cols-1 md:grid-cols-3 md:gap-20 py-20">
        <div>
          <p class="text-xl font-bold mb-3 ">Roomless</p>
          <p className="mb-3 text-[10pt] text-justify whitespace-pre-line">
            <b>Roomless</b> is a platform operating in the field of{" "}
            <b>real estate rentals</b> for medium - long term residential use.
            The portal connects home owners with potential tenants. <br />
            The social mission of Roomless is the simplification and economic
            optimization of the process of finding a rental property that is
            currently expensive and complex.
          </p>
          <ul className="child:my-3 child:md:my-0">
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>About us</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>How does it work</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a target="_blank" href="#" rel="noreferrer">
                Blog
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Terms and conditions</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Privacy policy</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="#"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Cookie policy</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p class="text-[15px] font-bold mb-3 my-5">Rent now</p>
          <ul class="mb-8 child:my-3 child:md:my-0">
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/create-listing"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Create a listing</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/rent-privates"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Are you an individual?</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/rent-professionals"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Are you a professional?</span>
              </a>
            </li>
          </ul>
          <p class="text-[15px] font-bold mb-3 my-5">Customer service</p>
          <ul class="child:my-3 child:md:my-0">
            <li class="hover:text-rmGreen-500 text-sm my-2">
              <a
                href="/help"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Help</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p class="text-[15px] font-bold mb-3 my-5">Listings for rent</p>
          <ul class="mb-8 child:my-3 child:md:my-0">
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-milano"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Milano</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-roma"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Roma</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-firenze"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Firenze</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-torino"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Torino</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/citta-bologna"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Bologna</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/berlin"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Berlin</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/munich"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Munich</span>
              </a>
            </li>
            <li class="hover:text-rmGreen-500 text-sm my-2 cursor-pointer">
              <a
                href="/rent-listings/frankfurt"
                class="linkTo cursor-pointer text-left block undefined"
              >
                <span>Listings in Frankfurt</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
