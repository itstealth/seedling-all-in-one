"use client";

import { useEffect } from "react";

const NPF_SCRIPT_URL = "https://ke9zpvp4xn.in4.widgets.nopaperforms.com/vemwgts.js";
const NPF_WIDGET_ID = "1044b64843af99283fc04912e7ad8bec";

export default function InquiryForm() {
  useEffect(() => {
    if (document.querySelector('script[data-npf-loader="true"]')) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = NPF_SCRIPT_URL;
    script.dataset.npfLoader = "true";
    document.body.appendChild(script);
  }, []);

  // id="enquire": target of the phone action bar's "Enquire Now"; the global
  // scroll padding already clears the (now single-row) sticky header.
  return (
    <div
      id="enquire"
      data-reveal
      data-reveal-bloom
      className="rounded-2xl bg-paper-50 px-3 pb-3 pt-5 shadow-2xl shadow-indigo-950/25 sm:p-7 sm:pb-4"
    >
      <p className="text-center font-display text-xl font-semibold leading-snug text-indigo-950">
        Talk to our advisor
      </p>
      {/* Meritto draws the form in an iframe of fixed height (it never
          resizes itself), so the height is ours to set: just above the
          tallest the form gets, so there is little blank space under Submit.
          Measured Nov 2026 (bottom of Submit, error messages showing):
          ~694px on phones from 320px up (the card has only 12px side
          padding on phones so the fields get the width), up to ~677px on
          tablets. Meritto's labels ask for Poppins but never load it, so
          the height varies a little with each device's fallback font.
          On desktop (lg+) the whole form is shown at 88%: Meritto controls
          the field sizes inside the iframe, so scaling is the only way to
          make it smaller. The iframe is drawn 1/0.88 wide and 680px tall
          (form ~673px there), then scaled, and the box is cut to the scaled
          height (680 x 0.88 = 599px). Phones and tablets stay at 100%. */}
      <div
        className="npf_wgts mt-3 [&_iframe]:h-[700px] sm:[&_iframe]:h-[680px] lg:h-[599px] lg:overflow-hidden lg:[&_iframe]:h-[680px] lg:[&_iframe]:w-[113.64%] lg:[&_iframe]:max-w-none lg:[&_iframe]:origin-top-left lg:[&_iframe]:scale-[0.88]"
        data-height="700px"
        data-w={NPF_WIDGET_ID}
      />
    </div>
  );
}
