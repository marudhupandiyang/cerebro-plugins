'use strict';

const fn = (scope) => {
  let match = scope.term.match(/^sys\s(.+)/);
  if (match && match[1] && match[1].length > 2) {
    switch (match[1]) {
      case 'Lock':
        break;
    }
  }
}

module.exports = {
  fn,
  name: 'System Commands - Mar',
  keyword: 'sys'
}
