import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const content = (
    <footer className="dash-footer">
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
  return content;
};

export default DashFooter;
