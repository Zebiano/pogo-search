/**
 * Disclaimer: I haven't seen such a badly coded file in a long time. My apologies.
 * 
 * Requires a generated 'result.json' file with a structure of:
 * { 
 *   gym: { any: [] },
 *   type: { default: [], shadow: [], mega: [], other: [] }
 * }
 * 
 * I had to join "normal" and "special" forms, as there's no way to distinguish them.
 * For example, a Meloetta has two forms, and both the name and ID are the same.
 * However, only one of the two forms is actually good.
 * 
 * Negative search strings are STs that do not show those pokemon
 * Positive search strings are STs that only show those pokemon
 */

import { writeFileSync, readFileSync, existsSync } from 'fs'

if (!existsSync('result.json')) {
  console.log("No 'result.json' file found!")
  process.exit()
}

// ICEBOX: Create "that one" ST, with a bit margin of error, but that lazy people want to use who don't care much
// ICEBOX: Create "slightly less error prone" ST by not including shadow, megas and other forms, as people can take care of those individually

/**
 * Array of Pokemon that should be considered as exceptions.
 * For example, Slowbro is an F-tier for Water and Psychic attacks. However, Galarian Slowbro is a B-tier in Poison.
 * Unfortunately, there's no way to differentiate between them in search terms (// TODO: are you sure?).
 * Because of this, Pokemon that are part of this list will not // TODO
 */
// const exceptions = ['Slowbro']

const pokemonNames = JSON.parse(readFileSync(`result.json`, 'utf8'));
const allPokemon = { positive: { shadow: [], mega: [], rest: [], gym: [] }, negative: { shadow: [], mega: [], rest: [], gym: [] } }

// Create organized array of Pokemon names
for (let type in pokemonNames) {
  if (type == 'gym') {
    // Join all gym pokemon
    for (let pokemon of pokemonNames[type]['any']) {
      allPokemon.positive.gym.push(`+${pokemon}`)
      allPokemon.negative.gym.push(`!+${pokemon}`)
    }
  } else {
    // Join all 'normal' and 'other' forms
    for (let pokemon of pokemonNames[type]['default']) {
      allPokemon.positive.rest.push(`+${pokemon}`)
      allPokemon.negative.rest.push(`!+${pokemon}`)
    }
    for (let pokemon of pokemonNames[type]['other']) {
      allPokemon.positive.rest.push(`+${pokemon}`)
      allPokemon.negative.rest.push(`!+${pokemon}`)
    }

    // Join all 'shadow' forms
    for (let pokemon of pokemonNames[type]['shadow']) {
      allPokemon.positive.shadow.push(`+${pokemon}`)
      allPokemon.negative.shadow.push(`!+${pokemon}`)
    }

    // Join all 'mega' forms
    for (let pokemon of pokemonNames[type]['mega']) {
      allPokemon.positive.mega.push(`+${pokemon}`)
      allPokemon.negative.mega.push(`!+${pokemon}`)
    }
  }
}

const searchStrings = {
  positive: { shadow: 'shadow&', mega: '!shadow&', rest: '!shadow,!mega0-&', gym: '' },
  negative: { shadow: 'shadow&', mega: '!shadow&', rest: '!shadow,!mega0-&', gym: '' }
}

// Create search strings from arrays
searchStrings.positive.shadow += allPokemon.positive.shadow.join(',')
searchStrings.positive.mega += allPokemon.positive.mega.join(',')
searchStrings.positive.rest += allPokemon.positive.rest.join(',')
searchStrings.positive.gym += allPokemon.positive.gym.join(',')

searchStrings.negative.shadow += allPokemon.negative.shadow.join('&')
searchStrings.negative.mega += allPokemon.negative.mega.join('&')
searchStrings.negative.rest += allPokemon.negative.rest.join('&')
searchStrings.negative.gym += allPokemon.negative.gym.join('&')

// Save final search strings result to file
writeFileSync(`searchStrings.json`, JSON.stringify(searchStrings, null, 2))
