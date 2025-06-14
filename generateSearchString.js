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

import { existsSync, readFileSync, writeFileSync } from 'fs';

if (!existsSync('result.json')) {
  console.log("No 'result.json' file found!")
  process.exit()
}

// Search strings that are not dynamic
const trashSafest = '!TopShadow&!TopMega&!TopType&!TopGym&!legendary&!mythical&!ultrabeast&!shiny&!dynamax&!gigantamax&!xxs&!xxl&!year2016-2018&distance-100&!costume&!eggsonly&!@special&!4*&!favorite&!evolvenew&!purified&!lucky&!background'

// ICEBOX: Create "that one" ST, with a bit margin of error, but that lazy people want to use who don't care much
// ICEBOX: Create "slightly less error prone" ST by not including shadow, megas and other forms, as people can take care of those individually

/**
 * Array of Pokemon that should be considered as exceptions.
 * Example, Slowbro is an F-tier for Water and Psychic attacks. However, Galarian Slowbro is a B-tier in Poison.
 * Unfortunately, there's no way to differentiate between them in search terms (// TODO: are you sure?).
 */
// const exceptions = ['Slowbro']

/**
 * Array of Pokemon whose evolution line should not be considered.
 * Example: '+Mewtwo' also shows Mew, which is not a Top Pokemon. However, they are an exception, as Mew cannot evolve into Mewtwo.
 */
const ignoreEvolutionLine = ['Mewtwo']

const pokemonNames = JSON.parse(readFileSync(`result.json`, 'utf8'));
const allPokemon = { positive: { shadow: [], mega: [], other: [], gym: [] }, negative: { shadow: [], mega: [], other: [], gym: [] } }

// Create organized array of Pokemon names
for (let type in pokemonNames) {
  if (type == 'gym') {
    // Join all gym pokemon
    for (let pokemon of pokemonNames[type]['any']) {
      allPokemon.positive.gym.push(`${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
      allPokemon.negative.gym.push(`!${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
    }
  } else {
    // Join all 'normal' and 'other' forms
    for (let pokemon of pokemonNames[type]['default']) {
      allPokemon.positive.other.push(`${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
      allPokemon.negative.other.push(`!${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
    }
    for (let pokemon of pokemonNames[type]['other']) {
      allPokemon.positive.other.push(`${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
      allPokemon.negative.other.push(`!${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
    }

    // Join all 'shadow' forms
    for (let pokemon of pokemonNames[type]['shadow']) {
      allPokemon.positive.shadow.push(`${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
      allPokemon.negative.shadow.push(`!${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
    }

    // Join all 'mega' forms
    for (let pokemon of pokemonNames[type]['mega']) {
      allPokemon.positive.mega.push(`${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
      allPokemon.negative.mega.push(`!${ignoreEvolutionLine.includes(pokemon) ? '' : '+'}${pokemon}`)
    }
  }
}

const searchStrings = {
  positive: { shadow: 'shadow&', mega: '!shadow&', type: '!shadow,!mega0-&', gym: '!shadow&' },
  negative: { shadow: 'shadow&', mega: '!shadow&', type: '!shadow,!mega0-&', gym: '!shadow&' },
  cleaning: { safest: trashSafest }
}

// Create search strings from arrays
searchStrings.positive.shadow += allPokemon.positive.shadow.join(',')
searchStrings.positive.mega += allPokemon.positive.mega.join(',')
searchStrings.positive.type += allPokemon.positive.other.join(',')
searchStrings.positive.gym += allPokemon.positive.gym.join(',')

searchStrings.negative.shadow += allPokemon.negative.shadow.join('&')
searchStrings.negative.mega += allPokemon.negative.mega.join('&')
searchStrings.negative.type += allPokemon.negative.other.join('&')
searchStrings.negative.gym += allPokemon.negative.gym.join('&')

// Save final search strings result to file
writeFileSync(`searchStrings.json`, JSON.stringify(searchStrings, null, 2))
