"""Queue consumer entrypoint. Do not connect to Redis at import time."""

from __future__ import annotations

import logging
import time

logger = logging.getLogger(__name__)


def run_worker() -> None:
    """Block and consume jobs. Wire Redis/BullMQ in a later task."""
    logger.warning("Worker loop not wired to queue yet")
    while True:
        time.sleep(5)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_worker()
