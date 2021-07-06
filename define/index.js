'use strict';
// const React = require('react');
// const { memoize } = require('cerebro-tools');

const LANG = 'en_US';

/**
 *
 * @desc Function that requests a word from Pearson dictionary API
 * @param  {Function} query
 * @return {Promise}
 */
const fetchWord = query => {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/${LANG}/${query}`)
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  });
};

/**
 *
 * @desc Fetch words with caching
 * @type {Function}
 */
// const cachedFetchWord = memoize(fetchWord);
const cachedFetchWord = fetchWord;

// const Result = ({ definitions }) => definitions.map((d, idx) => {
//   <div key={idx} style={{ marginBottom: '2rem', fontSize: '1rem' }}>
//     <div><b>Definition: </b>${d.definition}</div>
//     <div><b>Example: </b>${d.example}</div>
//   </div>
// });

// const Result = ({ definitions }) => definitions.map((d, idx) => {
//   <div key={idx} style={{ marginBottom: '2rem', fontSize: '1rem' }}>
//     <div><b>Definition: </b>${d.definition}</div>
//     <div><b>Example: </b>${d.example}</div>
//   </div>
// });

const renderResult = ({ definitions }) => `
  <div style="min-height: 100%; width: 100%; padding: 10px;">
  ${definitions.map(d => (`
    <div style="margin-top: 2rem; margin-bottom: 1rem; font-size: 1rem; width: 100%;">
      <div><b>Definition: </b>${d.definition}</div>
      <div style="font-size: 0.9rem;font-style: italic;margin-top: 0.5rem;"><b>Example: </b>${d.example}</div>
    </div>
  `)).join('')}
  </div>`;

const cacheRes = {};

const processResult = (items, scope) => {
  if (!items) {
    return;
  }
  cacheRes[items[0].word] = items;
  const id = items[0].word;
  const title = `Define ${id}`;

  // iterate over all meanings
  const response = items[0].meanings.map(item => ({
    id: item.partOfSpeech,
    title: items[0].word,
    subtitle: item.partOfSpeech,
    getPreview: () => renderResult(item),
  }));
  scope.display(response);
}

const fn = (scope) => {
  let match = scope.term.match(/^define\s(.+)/);
  if (match && match[1] && match[1].length > 2) {
      if (cacheRes[match[1]]) {
        processResult(cacheRes[match[1]], scope);
      } else {
        cachedFetchWord(match[1]).then(items => processResult(items, scope));
      }
  }
}

module.exports = {
  fn,
  name: 'Define a word - Mar',
  keyword: 'define'
}
