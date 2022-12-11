import React from "react";

const HelpPage = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <section class="text-left md:w-8/12 md:px-0 px-3 w-full m-auto">
        <article class="md:grid md:grid-cols-3 gap-4 mb-16">
          <div class="w-full h-full flex items-center justify-center text-[66px]">
            <span class="w-full h-full flex items-center justify-center text-[66px]">
              1.
            </span>
          </div>
          <div class="col-span-2">
            <h2 class="text-[24pt] mb-4 mt-6 font-bold md:text-left text-center">
              Warranty
            </h2>
            <p class="text-justify text-[#7b8389] text-sm">
              "The properties on the Roomless platform are "<b>all verified</b>"
              by our team." <br />
              <br />
              "This means that we guarantee the reality, the authenticity of the
              photos and the accuracy of the information in the listings so that
              you can book online in complete safety. "
            </p>
          </div>
        </article>
        <article class="md:grid md:grid-cols-3 gap-4 mb-16">
          <div class="w-full h-full flex items-center justify-center text-[66px]">
            <span class="w-full h-full flex items-center justify-center text-[66px]">
              2.
            </span>
          </div>
          <div class="col-span-2">
            <h2 class="text-[24pt] mb-4 mt-6 font-bold md:text-left text-center">
              Search
            </h2>
            <p class="text-justify text-[#7b8389] text-sm">
              "Find the perfect house, flat or room to rent from our listings."{" "}
              <br />
              <br />
              "The pictures and detailed descriptions will help you find the
              most interesting properties directly online. If you need more
              information, click on request information and contact our team. "
            </p>
          </div>
        </article>
        <article class="md:grid md:grid-cols-3 gap-4 mb-16">
          <div class="w-full h-full flex items-center justify-center text-[66px]">
            <span class="w-full h-full flex items-center justify-center text-[66px]">
              3.
            </span>
          </div>
          <div class="col-span-2">
            <h2 class="text-[24pt] mb-4 mt-6 font-bold md:text-left text-center">
              Reserve
            </h2>
            <p class="text-justify text-[#7b8389] text-sm">
              "Send a rental request to the property by entering the date of
              entry, the duration of the booking and a personal introduction."{" "}
              <br />
              <br />
              "You will not be charged at this stage. You only have to wait for
              the owner's reply. The property is NOT yet reserved for you. "
            </p>
          </div>
        </article>
        <article class="md:grid md:grid-cols-3 gap-4 mb-16">
          <div class="w-full h-full flex items-center justify-center text-[66px]">
            <span class="w-full h-full flex items-center justify-center text-[66px]">
              4.
            </span>
          </div>
          <div class="col-span-2">
            <h2 class="text-[24pt] mb-4 mt-6 font-bold md:text-left text-center">
              Confirm
            </h2>
            <p class="text-justify text-[#7b8389] text-sm">
              "The owner has accepted your request. Pay the amount indicated,
              including the first month's rent and Roomless commission, and
              confirm your reservation. The property will be reserved for you
              ONLY upon receipt of payment."
            </p>
          </div>
        </article>
        <article class="md:grid md:grid-cols-3 gap-4 mb-16">
          <div class="w-full h-full flex items-center justify-center text-[66px]">
            <span class="w-full h-full flex items-center justify-center text-[66px]">
              5.
            </span>
          </div>
          <div class="col-span-2">
            <h2 class="text-[24pt] mb-4 mt-6 font-bold md:text-left text-center">
              Post confirmation
            </h2>
            <p class="text-justify text-[#7b8389] text-sm">
              "We will put you in touch directly with the property for the steps
              following the booking. We will transfer the amount to the owner 24
              hours after your check in, unless you contact us with any problem.
              "
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default HelpPage;
