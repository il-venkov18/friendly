

import logging


def get_logger():
    yield logging.getLogger('uvicorn.debug')