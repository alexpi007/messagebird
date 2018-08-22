import React from 'react';
import logo from './../../assets/images/glyph-white.svg';
import styles from './styles.css';

const PageNotFound = () => (
	<div className={styles.videoContainer}>
		<p className={styles.absurdNotFound}>Page Not Found</p>
    <p className={styles.absurdNotFoundSecond}>Are you lost?</p>
		<img className={styles.logo} alt="logo" src={logo}></img>
  	<iframe 
      title="absurdNotFound"
  		className={styles.iframe}
  		width="1280"
  		height="720"
  		src="https://www.youtube.com/embed/MbXWrmQW-OE?autoplay=1&controls=0&cc_load_policy=1&rel=0&showinfo=0"
  		frameborder="0"
  		allow="autoplay; encrypted-media"
  		autoplay={true}
  		allowfullscreen>
  	</iframe>
  </div>
)

export default PageNotFound;