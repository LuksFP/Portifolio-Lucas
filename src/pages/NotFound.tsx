import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import "../styles/NotFound.css";

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:<>?/~`';

const NotFound = () => {
  const location = useLocation();
  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let iteration = 0;
    const target = '404';
    const interval = setInterval(() => {
      setGlitchText(
        target
          .split('')
          .map((char, i) => {
            if (i < iteration) return target[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      if (iteration >= target.length) {
        clearInterval(interval);
        setGlitchText(target);
      }
      iteration += 0.3;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notfound">
      <div className="notfound-orb notfound-orb-1" />
      <div className="notfound-orb notfound-orb-2" />

      <div className="notfound-content">
        <h1 className="notfound-code">{glitchText}</h1>
        <div className="notfound-line" />
        <p className="notfound-message">
          <code>{location.pathname}</code> doesn't exist.
        </p>
        <Link to="/" className="notfound-btn">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
