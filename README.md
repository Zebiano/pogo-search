# pogo-search <!-- omit in toc -->

Pokemon GO search term strings to ease cleaning your Pokemon storage.

## Why? <!-- omit in toc -->

Because I needed a faster and reliable way of cleaning my Pokemon storage.

## How? <!-- omit in toc -->

By creating a set of tags containing Top Pokemon and using search terms to filter them out.

## Table of contents <!-- omit in toc -->

- [Features](#features)
- [Instructions](#instructions)
  - [Considerations](#considerations)
- [Search term strings](#search-term-strings)
  - [`shadow`](#shadow)
  - [`mega`](#mega)
  - [`type`](#type)
  - [`cleaning.safest`](#cleaningsafest)
- [Exceptions](#exceptions)
- [Feedback](#feedback)
- [Future plans](#future-plans)
- [Development](#development)

## Features

- Various search term strings found in [`searchStrings.json`](https://github.com/Zebiano/pogo-search/blob/main/searchStrings.json):
  - Top 30 Pokemon of each Pokemon type (Tiers `S`, `A+` and `A`).
  - Top gym defenders (Tiers `S`, `A+` and `A`).
  - Tiers are based off of the [Pokemon Go Hub Database website](https://db.pokemongohub.net/).
- Updated manually every now and then.
- Check the [Discussions](https://github.com/Zebiano/pogo-search/discussions) tab out for more information.

## Instructions

My goal was to be able to clean my Pokemon storage without the fear of deleting Top Pokemon. Here's a step-by-step guide on how to achieve this:
1. Create 4 new Pokemon tags: `TopShadow`, `TopMega`, `TopType`, `TopGym`.
   - If you've created them before and it's not your first time using tags from this project, delete and create all tags again. You can also simply untag every Pokemon inside of each tag if you prefer.
2. Copy-paste each `positive` search term string into the game and assign every Pokemon to its respective tag. For example:
   1. Copy the content inside the `""` quotes of the positive `shadow` string.
   2. Paste it into the game's Pokemon search bar.
   3. Long-press any Pokemon to select it, and tap the "SELECT ALL" button on the top right.
   4. Tag every Pokemon with the `TopShadow` tag.
   5. [Make sure to save the search term string as a favourite](https://www.reddit.com/r/pokemongo/comments/p2yivi/til_you_can_save_searches_in_pogo/), to easily re-use it in the future.
   6. Repeat this process for every tag.
3. Copy-paste the `safest` Trash search term string and save it as "Trash safest".

And that's it! Every time you want to clean your Pokemon out, simply make use of the "Trash safest" favourite search term string. You'll have the peace of mind of knowing you will not be transferring any "Good" Pokemon.

**Keep in mind that catching new Pokemon does not tag them as Top Pokemon!** Since it's a manual task (unfortunately), before making use of the "Trash safest" search term string and transferring Pokemon, make sure to re-assign every Pokemon to their respective tags (start from Step `2.3`).

Every now and then I will update the `searchStrings.json` file with new data (for example when a new Pokemon debuts in the game).

### Considerations

- **Obviously, this is all very much subjective**. I've tried to be as unbiased as possible, and picked the "most likely filters" that players generally agree However, not everyone might agree with my choices. If that's your case, you can always remove or add specific filters to any existing search term string before saving it as a favourite if you prefer! A great place to check all possible filters is on [Leidwesen's website](https://leidwesen.github.io/SearchPhrases/).
- **It is highly recommended to not assign Pokemon manually to any "automated" tag**. This way you will always guarantee that deleting or overwriting the Tag is not a problem, as there was no manual process involved in populating it with custom Pokemon.
- If you want to keep custom Pokemon out of the "Trash safest" STS, it's recommended to create a custom Tag and add it manually to the "Trash safest" STS. As an example, I have a `museum` tag with Pokemon I personally like, so I've added `&!museum` to the STS.

## Search term strings

Take a look at this section for more details on each search term string. Here are a few general rules:
- `positive` - Only shows you Pokemon that match it. For example, a positive `shadow` string only shows you ***good*** shadow Pokemon.
- `negative` - Only shows you Pokemon that ***do not*** match it. For example, a negative `shadow` string only shows you ***bad*** shadow Pokemon.
- Different regions of the same Pokemon are considered as individual entries. This means that an Alolan Muc and a Regular Muc will each take one position on the list.

### `shadow`

A list of Shadow Pokemon that are part of the Top 30 Pokemon per Pokemon type. Contains a `positive` version (for all Top Shadow Pokemon), and a `negative` version (for all non-Top Shadow Pokemon).

### `mega`

A list of Mega Pokemon that are part of the Top 30 Pokemon per Pokemon type. Contains a `positive` version (for all Top Mega Pokemon), and a `negative` version (for all non-Top Mega Pokemon).

### `type`

A list of "regular" (not Shadow and not Mega) Pokemon that are part of the Top 30 Pokemon per Pokemon type. Contains a `positive` version (for all Top Type Pokemon), and a `negative` version (for all non-Top Type Pokemon).

### `cleaning.safest`

Shows Pokemon that can "safely be transferred". This is obviously subjective, so please proceed with caution. Relies on and requires 4 custom tags mentioned in the [Instructions](#instructions): `TopShadow`, `TopMega`, `TopType`, `TopGym`.

It filters out Pokemon that:

- Are Legendary, Mythical, Ultrabeast
- Are Shiny
- Are Dynamax, Gigantamax
- Are XXS, XXL
- Were caught in years 2016, 2017 2018
- Were caught at a location that is more than 100km away from your current location
- Have a costume
- Are [baby species](https://bulbapedia.bulbagarden.net/wiki/Baby_Pok%C3%A9mon)
- Learned a special move (moves that cannot be taught with normal TMs)
- Are Hundos (100% IV)
- Are tagged as favourite
- You do not have the next evolution of
- Are purified
- Are lucky
- Have a special background

## Exceptions

The Pokemon world is quite complex, and there are a few exceptions needed, as well as some hand-picked fixes:
- **Mew & Mewtwo** - PoGO shows both Mew and Mewtwo when using `+Mew` or `+Mewtwo`. However, it's not possible to evolve Mew into Mewtwo and Mew isalso  significantly weaker than Mewtwo. Because of this, Mew is being filtered out by hand.
- **Eevees** are a very specific use case, as there are so many evolutions that are all differently strong or weak. The search term strings do not take this into consideration (yet), and will consider any Eevee evolution as a Top Pokemon.
- Frosslass is wrongly being considered a Top Mega Pokemon due to Glalie.
- Many Pokemon that have other "variants", like Alolan or Hisuian, can be wrongly tagged as a top type. Examples include Golem, Typhlosion, etc.
- Probably some more exceptions that I haven't noticed yet. [Please let me know by creating a new Discussion here](https://github.com/Zebiano/pogo-search/discussions/categories/problems).

## Feedback

I've enabled [Discussions](https://github.com/Zebiano/pogo-search/discussions) in this repository, so that the community can share problems and solutions with each other. Please participate and give any feedback there!

## Future plans

- I'd love to create a tool that allows for user customization. The possibilities are probably endless, but an obvious example could be the number of the Top pokemon (change it from 30 to 40 for example). This will take a lot of time though and I will probably never get to it.
- Keep fixing inconsistencies.
- Automate STS updates.

## Development

These are just a few developer notes, ignore them if you're not one:
- Uses Node v22.
- Due to concurrency reasons, `results.json` will generate in a random order of types, meaning `searchStrings.json` will most likely always get updated, even if Pokemon rankings are the same.
