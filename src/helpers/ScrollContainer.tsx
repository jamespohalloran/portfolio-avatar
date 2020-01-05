import React, { useEffect, useState, useRef } from "react";

export const ScrollContainer = ({ children, onActivate, ...props }: any) => {
  const ref = useRef() as any;
  const [hasActivated, setHasActivated] = useState(false);
  useEffect(() => {
    const checkForInView = function() {
      if (ref.current && isInViewPort(ref.current)) {
        ref.current.classList.add("active");
        ref.current.classList.add("activated");

        if (!hasActivated && onActivate) {
          onActivate();
          setHasActivated(true);
        }
      } else {
        ref.current.classList.remove("active");
      }
    };
    checkForInView();
    document.body.addEventListener("scroll", checkForInView, false);

    return () => {
      document.body.removeEventListener("scroll", checkForInView);
    };
  }, [hasActivated]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

function isInViewPort(element: Element) {
  // Get the bounding client rectangle position in the viewport
  var bounding = element.getBoundingClientRect();

  // Checking part. Here the code checks if it's *fully* visible
  // Edit this part if you just want a partial visibility
  if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  ) {
    console.log("In the viewport! :)");
    return true;
  } else {
    console.log("Not in the viewport. :(");
    console.log(JSON.stringify(bounding));
    return false;
  }
}
