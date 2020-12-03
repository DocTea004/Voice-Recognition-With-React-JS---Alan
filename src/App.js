import React,{useState,useEffect} from "react"
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from "./Components/NewsCards/NewsCards";
import wordsToNumbers from 'words-to-numbers';
import { Card, CardActions,CardActionArea, CardContent, CardMedia,Button,Typography } from '@material-ui/core';

import Modal from "./Components/Modal/Modal"
import useStyles from "./styles.js";


const alanKey ="2f5f3830382c3b6e545dae349e9cbfde2e956eca572e1d8b807a3e2338fdd0dc/stage"

function App() {

  const classes= useStyles();

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  },[])

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/adrian-hajdin/"> Tenkorang Daniel</a> -
            <a className={classes.link} href="http://youtube.com/javascriptmastery"> Tea Code Developers</a>
          </Typography>
          <img className={classes.image} src="https://alan.app/voice/images/previews/preview.jpg" height="50px" alt="JSMastery logo" />
        </div>
      ) : null}
    </div>
  );
}

export default App;
