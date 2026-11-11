"use client";

import { useLayoutEffect } from "react";

export function StudioDocumentReset() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = {
      chaos: root.getAttribute("data-chaos-mode"),
      burst: root.getAttribute("data-chaos-burst"),
      nav: root.getAttribute("data-chaos-nav-anim"),
    };

    root.setAttribute("data-chaos-mode", "off");
    root.setAttribute("data-chaos-burst", "off");
    root.setAttribute("data-chaos-nav-anim", "off");

    return () => {
      if (previous.chaos) {
        root.setAttribute("data-chaos-mode", previous.chaos);
      }

      if (previous.burst) {
        root.setAttribute("data-chaos-burst", previous.burst);
      }

      if (previous.nav) {
        root.setAttribute("data-chaos-nav-anim", previous.nav);
      }
    };
  }, []);

  return null;
}
