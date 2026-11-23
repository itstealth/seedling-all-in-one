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
      className="rounded-2xl bg-paper-50 p-6 shadow-2xl shadow-indigo-950/25 sm:p-7"
    >
      {/* Meritto draws the form in an iframe of fixed height (it never
          resizes itself), so the height is ours to set. Measured Nov 2026
          with every validation message showing: ~710px on a 320px phone,
          ~695px on a 390px phone, 650-695px from tablet up. 1100px left
          a large empty gap under the Submit button.
          On desktop (lg+) the whole form is shown at 88%: Meritto controls
          the field sizes inside the iframe, so scaling is the only way to
          make it smaller. The iframe is drawn 1/0.88 wide and 710px tall,
          then scaled, and the box is cut to the scaled height (710 x 0.88
          = 625px). Phones and tablets keep 100% so text stays easy to tap. */}
      <div
        className="npf_wgts [&_iframe]:h-[740px] sm:[&_iframe]:h-[710px] lg:h-[625px] lg:overflow-hidden lg:[&_iframe]:w-[113.64%] lg:[&_iframe]:max-w-none lg:[&_iframe]:origin-top-left lg:[&_iframe]:scale-[0.88]"
        data-height="710px"
        data-w={NPF_WIDGET_ID}
      />
    </div>
  );
}
