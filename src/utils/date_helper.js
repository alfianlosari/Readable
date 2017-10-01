import javascriptTimeAgo from 'javascript-time-ago'
javascriptTimeAgo.locale(require('javascript-time-ago/locales/en'))
javascriptTimeAgo.locale(require('javascript-time-ago/locales/ru'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
require('intl-messageformat/dist/locale-data/ru')

const dateFormatter = new javascriptTimeAgo('en-US');

export default dateFormatter