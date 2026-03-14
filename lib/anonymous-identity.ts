import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

const ADJECTIVES = [
  "Adorable", "Ancient", "Brave", "Bright", "Calm", "Cheerful", "Clever",
  "Cosmic", "Cozy", "Creative", "Crispy", "Crystal", "Curious", "Daring",
  "Dazzling", "Delicious", "Dreamy", "Electric", "Elegant", "Enchanted",
  "Fancy", "Fearless", "Fluffy", "Flying", "Frosty", "Gentle", "Giddy",
  "Gleaming", "Glowing", "Golden", "Graceful", "Happy", "Humble", "Icy",
  "Jolly", "Joyful", "Kind", "Lofty", "Lovely", "Lucky", "Luminous",
  "Magical", "Majestic", "Mellow", "Mighty", "Misty", "Musical", "Mystic",
  "Noble", "Peaceful", "Playful", "Plucky", "Precious", "Proud", "Quirky",
  "Radiant", "Rapid", "Regal", "Restless", "Roaming", "Royal", "Rustic",
  "Sandy", "Sassy", "Secret", "Serene", "Shiny", "Silent", "Silky",
  "Silver", "Snowy", "Soaring", "Sparkling", "Speedy", "Spirited", "Stellar",
  "Stormy", "Swift", "Tender", "Thoughtful", "Tidal", "Tiny", "Tropical",
  "Twilight", "Velvet", "Vibrant", "Vivid", "Wandering", "Warm", "Whimsical",
  "Wild", "Witty", "Wondrous", "Zany", "Zen", "Zippy",
  "Amber", "Aquatic", "Arctic", "Astral", "Atomic", "Autumn", "Azure",
  "Blazing", "Breezy", "Brisk", "Bronze", "Bubbly", "Burnished",
  "Caramel", "Celestial", "Chilly", "Chromatic", "Cinnamon", "Cobalt", "Copper",
  "Dauntless", "Delicate", "Dewy", "Distant", "Dusky",
  "Ebony", "Effervescent", "Emerald", "Ethereal", "Exuberant",
  "Feisty", "Fervent", "Festive", "Fiery", "Fizzy", "Flaming", "Floral", "Foggy",
  "Galactic", "Gilded", "Glacial", "Glistening", "Grand",
  "Haunted", "Heavenly", "Honeyed", "Hushed",
  "Illustrious", "Immense", "Infinite", "Intrepid", "Iridescent", "Ivory",
  "Jagged", "Jeweled", "Jubilant",
  "Lavender", "Lazy", "Leafy", "Legendary", "Lilac", "Lime",
  "Marble", "Maureen", "Melodic", "Minty", "Moonlit",
  "Neon", "Nimble", "Northern",
  "Obsidian", "Oceanic", "Opulent",
  "Pastel", "Patient", "Pebbled", "Peppy", "Perky", "Pewter", "Plush", "Polished",
  "Quiet",
  "Rosy", "Rugged",
  "Sapphire", "Scarlet", "Shadowy", "Shrouded", "Sizzling", "Sleek", "Smoky", "Solar",
  "Southern", "Spicy", "Sprightly", "Stealthy", "Sunlit", "Supple",
  "Tangy", "Teal", "Timid", "Tinted", "Tranquil", "Turquoise",
  "Unruly", "Upbeat",
  "Valiant", "Velvety", "Verdant",
  "Weathered", "Whispering", "Willowy", "Wintry",
  "Youthful",
];

const NOUNS = [
  "Acorn", "Badger", "Bear", "Biscuit", "Blossom", "Breeze", "Butterfly",
  "Canyon", "Castle", "Cedar", "Cloud", "Comet", "Cookie", "Coral",
  "Cricket", "Crystal", "Dolphin", "Dragon", "Eagle", "Eclipse", "Falcon",
  "Feather", "Firefox", "Flamingo", "Fox", "Galaxy", "Gazelle", "Glacier",
  "Harbor", "Hawk", "Hedgehog", "Horizon", "Hummingbird", "Island", "Jade",
  "Jaguar", "Jasmine", "Kite", "Lagoon", "Lantern", "Lark", "Lemur",
  "Lion", "Lotus", "Lynx", "Maple", "Meadow", "Meteor", "Moon", "Moth",
  "Mountain", "Nebula", "Nightingale", "Nutmeg", "Oak", "Ocelot", "Orchid",
  "Otter", "Owl", "Panther", "Parrot", "Peach", "Pearl", "Penguin",
  "Phoenix", "Pine", "Pixel", "Pony", "Prism", "Pumpkin", "Quail",
  "Rainbow", "Raven", "River", "Robin", "Rocket", "Sage", "Seashell",
  "Sequoia", "Shadow", "Sparrow", "Star", "Sundew", "Sunrise", "Swan",
  "Thunder", "Tiger", "Tulip", "Turtle", "Unicorn", "Violet", "Waffle",
  "Walrus", "Willow", "Wolf", "Wren", "Zebra",
  "Albatross", "Almond", "Alpaca", "Amber", "Anchor", "Antler", "Anvil", "Archipelago",
  "Aurora", "Avocado", "Axolotl",
  "Bamboo", "Basilisk", "Beacon", "Blizzard", "Bonsai", "Bramble", "Brook",
  "Cactus", "Candle", "Capybara", "Caribou", "Cascade", "Cavern", "Cheetah",
  "Cherry", "Chestnut", "Chimera", "Chrysalis", "Cinnamon", "Citrine", "Clover",
  "Condor", "Cosmos", "Cougar", "Coyote", "Crane",
  "Dagger", "Dahlia", "Dandelion", "Dawn", "Dew", "Dingo", "Dragonfly", "Dusk",
  "Egret", "Elderberry", "Elk", "Ember",
  "Fern", "Finch", "Fjord", "Flare", "Flint", "Fog", "Fossil",
  "Garnet", "Geyser", "Giraffe", "Gust",
  "Hazel", "Heather", "Ibis", "Iceberg",
  "Jackal", "Jackdaw", "Juniper",
  "Kelp", "Kingfisher", "Koala",
  "Lapis", "Lava", "Leopard", "Lichen", "Lightning",
  "Mango", "Mangrove", "Mantis", "Marmot", "Mist", "Mongoose", "Moose", "Moss",
  "Narwhal", "Newt", "Nighthawk",
  "Obsidian", "Onyx", "Opal", "Osprey",
  "Panda", "Pansy", "Papaya", "Pebble", "Pelican", "Petal", "Porcupine", "Porpoise",
  "Quartz", "Quokka",
  "Redwood", "Reed", "Reef", "Reindeer",
  "Sable", "Salamander", "Sandpiper", "Savanna", "Scorpion", "Seagull", "Serval",
  "Sloth", "Snail", "Snowflake", "Sparrow", "Spire", "Spring", "Squirrel", "Stork",
  "Talon", "Tapir", "Thorn", "Tide", "Toad", "Torrent", "Toucan", "Treefrog",
  "Viper", "Vole", "Vortex",
  "Warthog", "Weasel", "Wendigo", "Whirlpool", "Wildcat", "Wisteria", "Wolverine",
  "Yak", "Yew",
];

function hashToNumber(hash: string): number {
  let num = 0;
  for (let i = 0; i < hash.length; i++) {
    num = (num * 31 + hash.charCodeAt(i)) >>> 0;
  }
  return num;
}

function generateCandidateName(hash: string): string {
  const num = hashToNumber(hash);
  const adj = ADJECTIVES[num % ADJECTIVES.length];
  const noun = NOUNS[Math.floor(num / ADJECTIVES.length) % NOUNS.length];
  return `${adj} ${noun}`;
}

function generateAvatarDataUri(contextHash: string): string {
  const avatar = createAvatar(lorelei, {
    seed: contextHash,
    size: 40,
    radius: 50,
    eyes: ["variant01", "variant02", "variant04", "variant06", "variant07", "variant08", "variant10", "variant12", "variant14", "variant21"],
    mouth: ["happy01", "happy03", "happy04", "happy06", "happy07", "happy08", "happy10", "happy11", "happy13", "happy14", "happy16", "happy17"],
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],
    randomizeIds: true,
  });
  return avatar.toDataUri();
}

export type AnonymousIdentity = {
  name: string;
  avatarUrl: string;
};

/**
 * Generates collision-free anonymous identities for all context hashes.
 * Hashes are sorted to ensure deterministic collision resolution.
 */
export function generateAnonymousIdentities(
  contextHashes: string[]
): Map<string, AnonymousIdentity> {
  const uniqueHashes = [...new Set(contextHashes)].sort();
  const identityMap = new Map<string, AnonymousIdentity>();
  const usedNames = new Map<string, string>(); // name -> hash that claimed it

  for (const hash of uniqueHashes) {
    let name = generateCandidateName(hash);
    const existingOwner = usedNames.get(name);
    if (existingOwner && existingOwner !== hash) {
      let suffix = 2;
      while (usedNames.has(`${name} ${suffix}`)) {
        suffix++;
      }
      name = `${name} ${suffix}`;
    }
    usedNames.set(name, hash);
    identityMap.set(hash, {
      name,
      avatarUrl: generateAvatarDataUri(hash),
    });
  }

  return identityMap;
}
