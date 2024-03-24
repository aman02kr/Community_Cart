import React from 'react';
import { IconButton } from '@mui/material';
import { Instagram, Facebook, WhatsApp, Twitter } from '@mui/icons-material';
import './footer.css'; // Import your footer CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h3><b>Explore</b></h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3><b>Social</b></h3>
          <ul>
            <li><IconButton><Instagram /></IconButton><a href="#">Instagram</a></li>
            <li><IconButton><Facebook /></IconButton><a href="#">Facebook</a></li>
            <li><IconButton><WhatsApp /></IconButton><a href="#">WhatsApp</a></li>
            <li><IconButton><Twitter /></IconButton><a href="#">Twitter</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3><b>Operating Cities</b></h3>
          <ul>
            <li>Srinagar</li>
            <li>Jammu</li>
            <li>Bengaluru</li>
            <li>Surat</li>
            <li>Mumbai</li>
            <li>...</li>
            {/* Add more cities */}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Community Cart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
