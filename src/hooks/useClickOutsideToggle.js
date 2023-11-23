import { useEffect, useRef, useState } from "react";

/**
 * Custom React hook for handling click outside of the navigation dropdowns.
 * Taken form the Code Institutes 'Moments' walkthrough (see README references)
 */
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return {expanded, setExpanded, ref};
};

export default useClickOutsideToggle;