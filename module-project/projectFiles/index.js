var logger = require('my_logger')();

logger.error('Synchronous I/O is being used in the module');
logger.warn('However require cache imports');
logger.info('So it\'s all good');