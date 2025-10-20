import React from "react";

export default function Footer() {
  return (
    <footer id="mainFooter" className="bg-dark text-white text-center py-3" data-testid="footer">
       <div className="container d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      
      <span className="text-white">© 2025 Carlos y Diego</span>
    </div>

    <ul className="nav list-unstyled d-flex mb-0">
      <li className="ms-3"><a className="text-white" href="#"><i className="bi bi-twitter"></i></a></li>
<li className="ms-3"><a className="text-white" href="#"><i className="bi bi-instagram"></i></a></li>
<li className="ms-3"><a className="text-white" href="#"><i className="bi bi-facebook"></i></a></li>
    </ul>
  </div>
    </footer>
  );
}