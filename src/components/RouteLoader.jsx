import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200, 
  minimum: 0.1,
});

const RouteLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        NProgress.done();
      });
    }, 1000); 


    return () => clearTimeout(timeoutId);
  }, [location]);

  return null;
};

export default RouteLoader;
