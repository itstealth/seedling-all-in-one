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

  return (
    <div
      data-reveal
      data-reveal-bloom
      className="rounded-2xl bg-paper-50 p-6 shadow-2xl shadow-indigo-950/25 sm:p-7"
    >
      <p className="font-display text-xl font-semibold leading-snug text-indigo-950">
        Talk to our admissions team
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        Share a few details and the right campus team will call you back.
      </p>
      <div className="mt-5 h-px bg-indigo-900/10" aria-hidden="true" />
      <div
        className="npf_wgts mt-5"
        data-height="400px"
        data-w={NPF_WIDGET_ID}
      />
    </div>
  );
}
