import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router không tự scroll tới section khi điều hướng kèm hash (vd Navbar "Giới thiệu" ->
// "/" + hash "about"). Component này bổ sung hành vi đó: có hash thì scroll tới đúng section,
// không thì scroll về đầu trang khi đổi route.
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
