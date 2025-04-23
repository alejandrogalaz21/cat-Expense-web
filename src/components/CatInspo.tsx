// src/components/CatInspo.tsx
import { useEffect, useState } from 'react';
import { getCatFact } from '@utils';

const randomGif = () => {
  const gifs = [
    'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
    'https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif',
    'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  ];
  return gifs[Math.floor(Math.random() * gifs.length)];
};

export const CatInspo = () => {
  const [fact, setFact] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  useEffect(() => {
    getCatFact().then(setFact);
    setGifUrl(randomGif());
  }, []);

  return (
    <div style={{ textAlign: 'center', maxWidth: 300 }}>
      <h3>😺 Random Cat Fact</h3>
      <p>{fact}</p>
      {gifUrl && <img src={gifUrl} alt="Random cat gif" style={{ width: '100%', borderRadius: '12px' }} />}
    </div>
  );
};
