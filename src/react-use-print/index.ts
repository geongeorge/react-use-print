import { useState, useEffect } from "react";
import { flushSync } from "react-dom";

const usePrint = () => {
  const [isPrint, setIsPrint] = useState(false);

  /**
   * Use instead of window.print because window.print does not wait for react-rerender
   */
  function print() {
    flushSync(() => {
      setIsPrint(true);
      window.print();
    });
  }

  useEffect(() => {
    const beforePrint = () => {
      flushSync(() => {
        setIsPrint(true);
      });
    };
    const afterPrint = () => {
      flushSync(() => {
        setIsPrint(false);
      });
    };

    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia("print");
      const handleMediaChange = (event: MediaQueryListEvent) => {
        event.preventDefault();
        if (event.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      };

      try {
        mediaQueryList.addEventListener("change", handleMediaChange);
      } catch (error) {
        try {
          mediaQueryList.addListener(handleMediaChange);
        } catch (error) {
          console.debug("Error", error);
        }
      }

      setIsPrint(mediaQueryList.matches);

      return () => {
        try {
          mediaQueryList.removeEventListener("change", handleMediaChange);
        } catch (error) {
          try {
            mediaQueryList.removeListener(handleMediaChange);
          } catch (error) {
            console.debug("Error", error);
          }
        }
      };
    }

    // Fallback for browsers that don't support matchMedia
    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;

    // Cleanup function for the fallback
    return () => {
      window.onbeforeprint = null;
      window.onafterprint = null;
    };
  }, [setIsPrint]);

  return { isPrint, print };
};

export { usePrint };
