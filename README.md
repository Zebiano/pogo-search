# pogo-search

**WIP - This project is still a work-in-progress. Expect better documentation and search terms in the future!**

Pokemon GO search term strings to clean your storage.

Positive gives you good Pokemon, Negative gives you bad Pokemon. Currently considers the top 30 of each Pokemon Type, and up to and including the A-Tier for the Gym Defenders.

- `shadow`: Top shadow Pokemon
- `mega`: Top mega Pokemon
- `type`: Top Pokemon per type (not shadow and not mega)
- `gym`: Top gym defenders

Dev notes:
- Uses Node v22.
- Due to concurrency reasons, `results.json` will generate in a random order of types, meaning `searchStrings.json` will most likely always get updated, even if the outcome of pokemon is the same.
