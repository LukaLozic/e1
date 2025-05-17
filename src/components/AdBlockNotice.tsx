import { useEffect, useState } from 'react';

const AdBlockNotice = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    const bait = document.createElement('div');
    bait.className = 'adsbox'; // class name targeted by AdBlock
    Object.assign(bait.style, {
      width: '1px',
      height: '1px',
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      display: 'block',
    });

    document.body.appendChild(bait);

    setTimeout(() => {
      if (!bait.offsetParent || bait.offsetHeight === 0 || bait.offsetWidth === 0) {
        setAdBlockDetected(true); // AdBlock likely active
      }
      document.body.removeChild(bait);
    }, 100);
  }, []);

  if (!adBlockDetected) return null;

  return (
    <div style={{
      backgroundColor: '#ffe5e5',
      color: '#900',
      padding: '1rem',
      margin: '1rem',
      border: '1px solid #f00',
      borderRadius: '8px',
      textAlign: 'center',
    }}>
      🙈 We noticed you're using an ad blocker.<br />
      Ads help us keep the content free — please consider whitelisting our site 💖
    </div>
  );
};

export default AdBlockNotice;
