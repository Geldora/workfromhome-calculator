
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full max-w-3xl mx-auto py-6 px-4">
      <div className="border-t border-border/50 pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Work From Home Calculator
          </div>
          <nav className="flex gap-6">
            <Link 
              to="/working-days" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Working Days Calculator
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
