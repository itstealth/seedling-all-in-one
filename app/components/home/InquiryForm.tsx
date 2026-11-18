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

  // id="enquire": target of the phone action bar's "Enquire Now"; scroll-mt-14
  // clears the two-row sticky header on top of the global scroll padding.
  return (
    <div
      id="enquire"
      data-reveal
      data-reveal-bloom
      className="scroll-mt-14 rounded-2xl bg-paper-50 p-6 shadow-2xl shadow-indigo-950/25 sm:p-7"
    >
      <p className="font-display text-xl font-semibold leading-snug text-indigo-950">
        Talk to our admissions team
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        Share a few details and the right campus team will call you back.
      </p>
      <div className="mt-5 h-px bg-indigo-900/10" aria-hidden="true" />
      <p className="mt-4 text-sm text-ink-muted">If the form does not load, <a className="underline" href="tel:+917413012351">call admissions on +91 74130 12351</a>.</p>
      <div
        className="npf_wgts mt-5"
        data-height="1100px"
        data-w={NPF_WIDGET_ID}
      />
    </div>
  );
}
