// --- Define Fantasy Elements (Now with Tags) ---
// We'll convert arrays of strings to arrays of objects { text: "...", tags: ["...", "..."] }
// NOTE: Tagging everything thoroughly takes time. This is a small example.
// Add more tags relevant to your keywords! Use lowercase for tags.
// --- Expanded Fantasy Elements (Now with Tags) ---
// (~100 entries per category)

const characterNames = [
    "Aerion", "Anya", "Aris", "Asher", "Astrid", "Alec", "Alden", "Bellatrix", "Borin", "Brynn",
    "Briar", "Bastion", "Cassian", "Cael", "Cedric", "Clara", "Corbin", "Cyrus", "Dara", "Darius",
    "Delilah", "Dorian", "Draco", "Duncan", "Elena", "Erik", "Eamon", "Elara", "Elias", "Evander",
    "Faye", "Felix", "Fiona", "Finnian", "Freya", "Flora", "Gael", "Gareth", "Genevieve", "Gideon",
    "Griffin", "Guinevere", "Helena", "Hugo", "Hawke", "Hazel", "Iris", "Ivan", "Ignatius", "Imogen",
    "Isolde", "Juno", "Jasper", "Jorah", "Julius", "Javier", "Kael", "Kai", "Katrina", "Kenji",
    "Killian", "Kira", "Lachlan", "Leif", "Lysander", "Lyra", "Linus", "Lucian", "Maeve", "Malachi",
    "Marius", "Matilda", "Milo", "Morgana", "Nadia", "Nerys", "Nico", "Nolan", "Noelle", "Octavia",
    "Orion", "Ophelia", "Oscar", "Osric", "Priya", "Peregrine", "Persephone", "Phineas", "Poppy", "Quinn",
    "Quintus", "Ravenna", "Remus", "Rhys", "Roric", "Ronan", "Rosalind", "Rowan", "Sabine", "Sebastian",
    "Seraphina", "Silas", "Soren", "Stella", "Sybella", "Talia", "Tavish", "Thaddeus", "Thea", "Torvin",
    "Tristan", "Ulysses", "Una", "Urien", "Ursula", "Valerius", "Vesper", "Viola", "Viridian", "Willow",
    "Winston", "Xander", "Xavier", "Yara", "Yvette", "Yvonne", "Zain", "Zephyr", "Zia", "Zora"
]; // ~100 names

const characterArchetypes = [
    { text: "a reluctant farmhand", tags: ["commoner", "humble", "reluctant", "chosen"] },
    { text: "a cunning rogue", tags: ["rogue", "thief", "city", "clever", "stealth"] },
    { text: "a disillusioned knight", tags: ["knight", "warrior", "noble", "fallen", "cynical"] },
    { text: "a wise-cracking sorceress", tags: ["magic", "mage", "arcane", "female", "humor"] },
    { text: "a stoic ranger", tags: ["ranger", "wilderness", "forest", "bow", "tracker", "survival"] },
    { text: "a disgraced noble", tags: ["noble", "city", "intrigue", "fallen", "politics"] },
    { text: "an ambitious apprentice", tags: ["magic", "apprentice", "young", "learning", "power"] },
    { text: "a mysterious hermit", tags: ["hermit", "mystery", "wilderness", "magic", "wisdom"] },
    { text: "a cursed prince", tags: ["noble", "curse", "magic", "male", "royalty", "tragic"] },
    { text: "a runaway oracle", tags: ["oracle", "prophecy", "divine", "female", "runaway", "seer"] },
    { text: "a grizzled mercenary captain", tags: ["mercenary", "warrior", "leader", "veteran", "sellsword"] },
    { text: "a cheerful tavern keeper with secrets", tags: ["commoner", "tavern", "secrets", "information", "friendly"] },
    { text: "an ancient golem seeking purpose", tags: ["construct", "golem", "ancient", "magic", "searching"] },
    { text: "a sky-pirate captain", tags: ["pirate", "sky", "airship", "captain", "rogue", "adventure"] },
    { text: "a devout temple healer", tags: ["healer", "cleric", "temple", "divine", "holy", "medicine"] },
    { text: "a beast tamer from the wilds", tags: ["tamer", "beast", "animal", "wilderness", "nature"] },
    { text: "a royal diplomat on a crucial mission", tags: ["diplomat", "noble", "politics", "intrigue", "mission"] },
    { text: "a failed scholar obsessed with forbidden lore", tags: ["scholar", "lore", "forbidden", "magic", "obsessed"] },
    { text: "a gentle giant bodyguard", tags: ["bodyguard", "warrior", "giant", "protector", "loyal"] },
    { text: "a mischievous fey trickster", tags: ["fey", "trickster", "magic", "forest", "chaos"] },
    { text: "an exiled elemental shaman", tags: ["shaman", "elemental", "magic", "exile", "spirit"] },
    { text: "a master poisoner", tags: ["assassin", "poison", "stealth", "rogue", "chemist"] },
    { text: "a dream walker", tags: ["dream", "magic", "psychic", "ethereal", "walker"] },
    { text: "a clockwork inventor", tags: ["inventor", "clockwork", "steampunk", "engineer", "gadgets"] },
    { text: "a hunted shapeshifter", tags: ["shapeshifter", "magic", "curse", "hunted", "transformation"] },
    { text: "a guild artisan seeking mastery", tags: ["artisan", "guild", "craft", "commoner", "mastery"] },
    { text: "a calculating spymaster", tags: ["spy", "intrigue", "secrets", "politics", "mastermind"] },
    { text: "a naive pilgrim on a sacred journey", tags: ["pilgrim", "sacred", "journey", "faith", "naive"] },
    { text: "a haunted spirit medium", tags: ["medium", "spirit", "ghost", "haunted", "supernatural"] },
    { text: "a charismatic cult leader", tags: ["cult", "leader", "charisma", "deception", "religion"] },
    { text: "an undead knight bound by an oath", tags: ["undead", "knight", "oath", "bound", "warrior", "tragic"] },
    { text: "a gladiator seeking freedom", tags: ["gladiator", "arena", "combat", "freedom", "warrior"] },
    { text: "a lonely lighthouse keeper", tags: ["keeper", "lighthouse", "sea", "solitary", "mystery"] },
    { text: "a street urchin with hidden potential", tags: ["urchin", "street", "commoner", "potential", "young"] },
    { text: "a fallen angel seeking redemption", tags: ["angel", "fallen", "divine", "redemption", "exile"] },
    { text: "a bounty hunter tracking a unique quarry", tags: ["bounty hunter", "tracker", "hunter", "quarry"] },
    { text: "a court jester who knows too much", tags: ["jester", "court", "secrets", "fool", "politics"] },
    { text: "a seafaring merchant captain", tags: ["merchant", "sea", "captain", "trade", "ship"] },
    { text: "an alchemist searching for the elixir of life", tags: ["alchemist", "elixir", "immortality", "science", "magic"] },
    { text: "a dragon rider in training", tags: ["dragon", "rider", "training", "young", "flying"] },
    { text: "a wandering storyteller", tags: ["storyteller", "bard", "wanderer", "lore", "traveler"] },
    { text: "a mind-reading inquisitor", tags: ["inquisitor", "mind reader", "psychic", "investigator", "secrets"] },
    { text: "a barbarian chieftain", tags: ["barbarian", "chieftain", "tribe", "wilderness", "warrior"] },
    { text: "a disgraced royal guard", tags: ["guard", "royal", "disgraced", "fallen", "warrior"] },
    { text: "a gemini twin with opposing goals", tags: ["twin", "opposing", "conflict", "family"] },
    { text: "a time-traveling historian", tags: ["time travel", "historian", "scholar", "past", "future"] },
    { text: "a desert nomad guide", tags: ["nomad", "desert", "guide", "survival", "wilderness"] },
    { text: "an enchanted suit of armor", tags: ["enchanted", "armor", "construct", "magic", "guardian"] },
    { text: "a librarian guarding ancient texts", tags: ["librarian", "scholar", "ancient", "books", "guardian"] },
    { text: "a master swordsman seeking a worthy opponent", tags: ["swordsman", "master", "warrior", "duel", "combat"] },
    // ... adding more archetypes ...
    { text: "a goblin merchant with rare wares", tags: ["goblin", "merchant", "trade", "rare", "commoner"] },
    { text: "a druid protecting a sacred grove", tags: ["druid", "nature", "magic", "protector", "forest"] },
    { text: "an artificer building a war machine", tags: ["artificer", "inventor", "war", "machine", "engineer"] },
    { text: "a celestial envoy on a mission", tags: ["celestial", "angel", "envoy", "divine", "mission"] },
    { text: "a vampire hunter", tags: ["hunter", "vampire", "undead", "slayer", "dark"] },
    { text: "a smuggler dealing in forbidden goods", tags: ["smuggler", "rogue", "forbidden", "trade", "crime"] },
    { text: "a pyromancer controlling forbidden flames", tags: ["pyromancer", "mage", "fire", "magic", "forbidden"] },
    { text: "a royal cartographer mapping uncharted lands", tags: ["cartographer", "map", "exploration", "royal", "uncharted"] },
    { text: "a travelling musician with a magical instrument", tags: ["musician", "bard", "magic", "instrument", "traveler"] },
    { text: "a prophet haunted by visions", tags: ["prophet", "seer", "visions", "haunted", "future"] },
    { text: "a retired adventurer", tags: ["adventurer", "retired", "veteran", "commoner", "past"] },
    { text: "a knight errant searching for quests", tags: ["knight", "quest", "errant", "wandering", "honorable"] },
    { text: "a scholar researching planar travel", tags: ["scholar", "plane", "travel", "magic", "research"] },
    { text: "a monk from a hidden monastery", tags: ["monk", "martial arts", "hidden", "monastery", "wisdom"] },
    { text: "a necromancer trying to revive a lost love", tags: ["necromancer", "undead", "magic", "love", "forbidden"] },
    { text: "an illusionist thief", tags: ["illusionist", "mage", "thief", "rogue", "magic"] },
    { text: "a tribal storyteller", tags: ["storyteller", "tribe", "oral history", "lore", "commoner"] },
    { text: "a judge dispensing harsh justice", tags: ["judge", "justice", "law", "city", "authority"] },
    { text: "a runaway royal heir", tags: ["royal", "heir", "runaway", "noble", "identity"] },
    { text: "a master blacksmith forging legendary weapons", tags: ["blacksmith", "artisan", "weapon", "legendary", "forge"] },
    { text: "a gnome tinkerer", tags: ["gnome", "tinker", "inventor", "gadgets", "steampunk"] },
    { text: "an ogre philosopher", tags: ["ogre", "philosopher", "unexpected", "monster", "wisdom"] },
    { text: "a griffon rider courier", tags: ["griffon", "rider", "courier", "flying", "message"] },
    { text: "a siren luring ships to their doom", tags: ["siren", "monster", "sea", "magic", "lure"] },
    { text: "a werewolf trying to control the curse", tags: ["werewolf", "curse", "shapeshifter", "control", "monster"] },
    { text: "a vampire seeking a cure", tags: ["vampire", "undead", "cure", "curse", "seeking"] },
    { text: "a golem graveyard caretaker", tags: ["golem", "graveyard", "caretaker", "construct", "ancient"] },
    { text: "a paladin questioning their faith", tags: ["paladin", "knight", "faith", "divine", "doubt"] },
    { text: "a dryad bound to a dying tree", tags: ["dryad", "fey", "nature", "bound", "dying"] },
    { text: "a goblin king leading a rebellion", tags: ["goblin", "king", "rebellion", "monster", "leader"] },
    { text: "a treasure hunter", tags: ["treasure", "hunter", "adventurer", "ruins", "quest"] },
    { text: "a master of disguise", tags: ["spy", "rogue", "disguise", "intrigue", "secrets"] },
    { text: "a wandering sword instructor", tags: ["swordsman", "instructor", "teacher", "wanderer", "combat"] },
    { text: "a priest exorcising demons", tags: ["priest", "cleric", "exorcist", "demon", "divine"] },
    { text: "a fisherman who caught something magical", tags: ["fisherman", "commoner", "sea", "magic", "luck"] },
    { text: "a beast hunter tracking legendary monsters", tags: ["hunter", "beast", "monster", "legendary", "tracker"] },
    { text: "a royal advisor plotting treason", tags: ["advisor", "royal", "treason", "plot", "intrigue"] },
    { text: "a child with uncontrollable magic", tags: ["child", "magic", "uncontrollable", "power", "young"] },
    { text: "a historian uncovering a conspiracy", tags: ["historian", "scholar", "conspiracy", "secrets", "research"] },
    { text: "a minotaur guarding a labyrinth", tags: ["minotaur", "monster", "guardian", "labyrinth", "maze"] },
    { text: "an architect designing impossible structures", tags: ["architect", "designer", "magic", "impossible", "structure"] },
    { text: "a city watch captain", tags: ["guard", "watch", "captain", "city", "law"] },
    { text: "a former executioner seeking peace", tags: ["executioner", "former", "peace", "redemption", "dark"] },
    { text: "a shadow dancer assassin", tags: ["assassin", "shadow", "dancer", "stealth", "rogue"] },
    { text: "a wind rider nomad", tags: ["nomad", "wind", "rider", "plains", "traveler"] }
]; // ~100 archetypes

const settings = [
    { text: "in the cursed Whisperwood", tags: ["forest", "cursed", "magic", "wilderness", "spooky", "trees"] },
    { text: "atop the treacherous Dragon Peaks", tags: ["mountain", "dragon", "danger", "lair", "peak", "rocky"] },
    { text: "within the ancient Sunken City", tags: ["city", "ruins", "ancient", "water", "mystery", "submerged"] },
    { text: "across the shimmering Glass Desert", tags: ["desert", "wasteland", "heat", "survival", "sand", "glass"] },
    { text: "in the besieged fortress of Stonehaven", tags: ["castle", "fortress", "siege", "war", "stone", "defense"] },
    { text: "beneath the boughs of the Singing Forest", tags: ["forest", "magic", "fey", "song", "nature", "enchanted"] },
    { text: "in the floating markets of Aeridor", tags: ["city", "sky", "magic", "market", "floating", "airship"] },
    { text: "through the haunted ruins of Eldoria", tags: ["ruins", "haunted", "ghost", "ancient", "danger", "undead"] },
    { text: "at the edge of the chaotic Shadowfell", tags: ["shadowfell", "plane", "darkness", "chaos", "undead", "otherworldly"] },
    { text: "within the mystical Crystal Caves", tags: ["cave", "crystal", "magic", "underground", "light", "gemstone"] },
    { text: "on a storm-tossed pirate galleon", tags: ["ship", "sea", "pirate", "storm", "ocean", "galleon"] },
    { text: "in the heart of a steaming jungle", tags: ["jungle", "wilderness", "heat", "ruins", "vines", "humid"] },
    { text: "inside an active volcano's caldera", tags: ["volcano", "fire", "mountain", "danger", "heat", "magma"] },
    { text: "within a library containing all knowledge", tags: ["library", "books", "knowledge", "ancient", "magic", "scholar"] },
    { text: "on the endless plains of the centaur tribes", tags: ["plains", "nomad", "centaur", "tribe", "grassland", "open"] },
    { text: "in a city carved from a giant's bones", tags: ["city", "bone", "giant", "ancient", "unique", "macabre"] },
    { text: "through the shifting corridors of a mad wizard's tower", tags: ["tower", "wizard", "magic", "madness", "shifting", "labyrinth"] },
    { text: "in the frozen wastes of the Frostfell", tags: ["frozen", "ice", "snow", "cold", "wasteland", "arctic"] },
    { text: "among the colossal trees of the Titanwood", tags: ["forest", "giant", "tree", "nature", "colossal", "ancient"] },
    { text: "within a bustling dwarven mountain-city", tags: ["city", "dwarf", "mountain", "underground", "forge", "stone"] },
    { text: "on a sentient, wandering island", tags: ["island", "sentient", "magic", "sea", "wandering", "mystery"] },
    { text: "in the Feywild, a realm of eternal twilight", tags: ["feywild", "plane", "magic", "fey", "twilight", "otherworldly"] },
    { text: "through an M.C. Escher-esque dungeon", tags: ["dungeon", "impossible", "architecture", "magic", "trap", "labyrinth"] },
    { text: "in the opulent, decadent Elven capital", tags: ["city", "elf", "capital", "opulent", "ancient", "forest"] },
    { text: "across a battlefield littered with constructs", tags: ["battlefield", "war", "construct", "golem", "ruins", "metal"] },
    { text: "within a plague-ridden, quarantined city", tags: ["city", "plague", "quarantine", "disease", "despair", "survival"] },
    { text: "on the back of a colossal world-turtle", tags: ["turtle", "world", "colossal", "magic", "traveling", "unique"] },
    { text: "in the Astral Plane, amidst silver clouds", tags: ["astral", "plane", "silver", "magic", "psychic", "otherworldly"] },
    { text: "through tunnels infested with giant insects", tags: ["tunnel", "cave", "insect", "giant", "infested", "underground"] },
    { text: "in a monastery carved into a cliff face", tags: ["monastery", "cliff", "mountain", "remote", "sacred", "heights"] },
    { text: "within the royal palace during a coup", tags: ["palace", "royal", "coup", "intrigue", "politics", "city"] },
    { text: "on an airship navigating a storm", tags: ["airship", "sky", "storm", "danger", "travel", "steampunk"] },
    { text: "in a forgotten underwater temple", tags: ["temple", "underwater", "sea", "ancient", "ruins", "magic"] },
    { text: "across a landscape scarred by magical war", tags: ["scarred", "wasteland", "magic", "war", "ruins", "desolate"] },
    { text: "in a hidden village populated by monsters", tags: ["village", "hidden", "monster", "community", "secret", "peaceful"] },
    { text: "within a giant's garden", tags: ["garden", "giant", "nature", "oversized", "magic", "danger"] },
    { text: "on a pilgrimage route through dangerous mountains", tags: ["pilgrimage", "route", "mountain", "danger", "sacred", "travel"] },
    { text: "inside a mechanical, clockwork city", tags: ["city", "mechanical", "clockwork", "steampunk", "gears", "construct"] },
    { text: "through the sewers of a major metropolis", tags: ["sewer", "city", "underground", "dark", "filth", "hidden"] },
    { text: "in a tavern where dimensions meet", tags: ["tavern", "dimension", "portal", "magic", "meeting place", "planar"] },
    // ... adding more settings ...
    { text: "within a dreamscape made real", tags: ["dream", "magic", "surreal", "mindscape", "psychic", "illusion"] },
    { text: "on a chain of floating islands", tags: ["island", "floating", "sky", "magic", "chain", "heights"] },
    { text: "inside a colossal, petrified beast", tags: ["beast", "petrified", "colossal", "stone", "inside", "unique"] },
    { text: "in a marketplace selling illegal magic items", tags: ["market", "city", "illegal", "magic item", "black market", "rogue"] },
    { text: "through a swamp filled with illusions", tags: ["swamp", "illusion", "magic", "wilderness", "treacherous", "fey"] },
    { text: "within the archives of a forgotten god", tags: ["archive", "library", "god", "forgotten", "divine", "ancient"] },
    { text: "on a bridge spanning a bottomless chasm", tags: ["bridge", "chasm", "heights", "danger", "crossing", "ancient"] },
    { text: "in a city where music powers magic", tags: ["city", "music", "magic", "bard", "song", "unique"] },
    { text: "across tundra where mammoths roam", tags: ["tundra", "cold", "mammoth", "prehistoric", "wilderness", "nomad"] },
    { text: "inside a malfunctioning teleportation network", tags: ["teleport", "network", "magic", "danger", "malfunction", "travel"] },
    { text: "within a gladiatorial arena complex", tags: ["arena", "gladiator", "combat", "city", "entertainment", "prison"] },
    { text: "in a village cursed with eternal night", tags: ["village", "curse", "night", "darkness", "undead", "spooky"] },
    { text: "on the salt flats under twin moons", tags: ["salt flat", "desert", "moon", "alien", "wasteland", "night"] },
    { text: "inside a dragon's hoard while it sleeps", tags: ["hoard", "dragon", "treasure", "gold", "stealth", "danger"] },
    { text: "through a forest where trees whisper secrets", tags: ["forest", "whisper", "secrets", "magic", "ancient", "sentient"] },
    { text: "in a city built around a celestial gate", tags: ["city", "celestial", "gate", "portal", "divine", "magic"] },
    { text: "across a sea of liquid metal", tags: ["sea", "metal", "liquid", "alien", "wasteland", "toxic"] },
    { text: "within a giant, hollowed-out meteor", tags: ["meteor", "space", "rock", "hollow", "unique", "alien"] },
    { text: "in a town where everyone has a secret identity", tags: ["town", "secret", "identity", "mystery", "intrigue", "spy"] },
    { text: "through a valley haunted by wind spirits", tags: ["valley", "haunted", "spirit", "wind", "ghost", "elemental"] },
    { text: "inside the tomb of a legendary hero", tags: ["tomb", "hero", "legendary", "ancient", "undead", "dungeon"] },
    { text: "on a ship sailing the Astral Sea", tags: ["ship", "astral", "sea", "plane", "magic", "travel"] },
    { text: "in a city ruled by clockwork automatons", tags: ["city", "clockwork", "automaton", "construct", "rule", "steampunk"] },
    { text: "through a maze made of living thorns", tags: ["maze", "labyrinth", "thorn", "living", "nature", "trap"] },
    { text: "within a volcano inhabited by fire giants", tags: ["volcano", "fire", "giant", "inhabited", "danger", "mountain"] },
    { text: "in a sanctuary for retired monsters", tags: ["sanctuary", "monster", "retired", "hidden", "peaceful", "community"] },
    { text: "across a desert where storms rain sand", tags: ["desert", "storm", "sand", "wasteland", "survival", "unique"] },
    { text: "inside a castle that rearranges itself", tags: ["castle", "magic", "shifting", "rearrange", "labyrinth", "enchanted"] },
    { text: "in the fungal forests of the underdark", tags: ["underdark", "forest", "fungus", "mushroom", "cave", "dark"] },
    { text: "within the ruins of a sky-fallen city", tags: ["ruins", "sky", "fallen", "city", "ancient", "mystery"] },
    { text: "on a pilgrimage to a mountain peak that touches the stars", tags: ["pilgrimage", "mountain", "peak", "stars", "sacred", "celestial"] },
    { text: "inside a giant mimic pretending to be a tavern", tags: ["mimic", "monster", "tavern", "trap", "disguise", "danger"] },
    { text: "through a dimension made entirely of glass", tags: ["dimension", "plane", "glass", "fragile", "unique", "otherworldly"] },
    { text: "in a city where gravity shifts unpredictably", tags: ["city", "gravity", "shift", "magic", "danger", "unique"] },
    { text: "across a poisoned wasteland", tags: ["wasteland", "poison", "toxic", "danger", "survival", "desolate"] },
    { text: "within a temporal rift, witnessing past and future", tags: ["temporal", "time", "rift", "past", "future", "magic"] },
    { text: "inside a massive, ancient library carved into a canyon", tags: ["library", "ancient", "canyon", "books", "knowledge", "scholar"] },
    { text: "on a journey through the elemental plane of fire", tags: ["plane", "elemental", "fire", "danger", "heat", "otherworldly"] },
    { text: "in a hidden market where memories are traded", tags: ["market", "hidden", "memory", "trade", "magic", "unique"] },
    { text: "through a forest petrified by a basilisk", tags: ["forest", "petrified", "stone", "basilisk", "monster", "cursed"] },
    { text: "within the collapsing mind of a dying god", tags: ["mindscape", "god", "dying", "collapsing", "surreal", "psychic"] },
    { text: "in a city powered by captured lightning elementals", tags: ["city", "power", "lightning", "elemental", "captured", "magic"] },
    { text: "across the rooftops of a sprawling metropolis", tags: ["rooftop", "city", "sprawling", "stealth", "urban", "heights"] },
    { text: "inside a vault built to contain a world-ending artifact", tags: ["vault", "artifact", "containment", "danger", "world-ending", "secure"] },
    { text: "through a battlefield where illusions fight real soldiers", tags: ["battlefield", "illusion", "war", "magic", "deception", "combat"] },
    { text: "in a garden where emotions grow as plants", tags: ["garden", "emotion", "plant", "magic", "fey", "unique"] },
    { text: "within a colossal hive of intelligent insects", tags: ["hive", "insect", "intelligent", "colony", "underground", "alien"] },
    { text: "on a quest across a continent perpetually shrouded in mist", tags: ["continent", "mist", "shrouded", "mystery", "travel", "obscured"] },
    { text: "inside a magical painting", tags: ["painting", "magic", "art", "trapped", "dimension", "illusion"] },
    { text: "through the skeletal remains of a dead titan", tags: ["skeleton", "remains", "titan", "giant", "bone", "ancient"] },
    { text: "in a city where the dead walk among the living", tags: ["city", "dead", "undead", "ghost", "coexist", "necromancy"] }
]; // ~100 settings

const plotGoals = [
    { text: "must find the legendary Sunstone", tags: ["artifact", "quest", "legendary", "magic", "stone", "find"] },
    { text: "needs to break a generations-old curse", tags: ["curse", "magic", "family", "quest", "break", "generational"] },
    { text: "must deliver a secret message to the resistance", tags: ["message", "secret", "resistance", "war", "intrigue", "deliver"] },
    { text: "has to rescue a captured diplomat", tags: ["rescue", "diplomat", "noble", "prison", "quest", "capture"] },
    { text: "needs to defeat the tyrannical Shadow Lord", tags: ["defeat", "villain", "evil", "lord", "shadow", "combat"] },
    { text: "must learn the truth about their forgotten past", tags: ["past", "truth", "mystery", "identity", "quest", "learn"] },
    { text: "has to unite the warring clans", tags: ["unite", "clans", "war", "politics", "diplomacy", "tribe"] },
    { text: "needs to close a portal to a dangerous realm", tags: ["portal", "magic", "danger", "plane", "close", "otherworldly"] },
    { text: "must protect the last dragon egg", tags: ["protect", "dragon", "egg", "rare", "magic", "guardian"] },
    { text: "has to reclaim their stolen birthright", tags: ["reclaim", "birthright", "noble", "throne", "inheritance", "stolen"] },
    { text: "must assassinate a corrupt high priest", tags: ["assassinate", "priest", "corrupt", "religion", "stealth", "kill"] },
    { text: "needs to find a cure for a magical plague", tags: ["cure", "plague", "magic", "disease", "find", "healing"] },
    { text: "must steal a powerful artifact from a dragon's hoard", tags: ["steal", "artifact", "dragon", "hoard", "rogue", "heist"] },
    { text: "has to survive a deadly tournament", tags: ["survive", "tournament", "combat", "arena", "gladiator", "deadly"] },
    { text: "needs to map an uncharted continent", tags: ["map", "uncharted", "continent", "exploration", "discovery", "cartographer"] },
    { text: "must negotiate peace between humans and elves", tags: ["negotiate", "peace", "human", "elf", "diplomacy", "politics"] },
    { text: "has to awaken an ancient guardian", tags: ["awaken", "ancient", "guardian", "magic", "construct", "ritual"] },
    { text: "needs to expose a conspiracy within the royal court", tags: ["expose", "conspiracy", "royal", "court", "intrigue", "secrets"] },
    { text: "must retrieve a lost family heirloom", tags: ["retrieve", "lost", "family", "heirloom", "quest", "find"] },
    { text: "has to destroy a lich's phylactery", tags: ["destroy", "lich", "phylactery", "undead", "magic", "soul"] },
    { text: "must prevent a catastrophic prophecy from coming true", tags: ["prevent", "prophecy", "catastrophe", "future", "fate", "oracle"] },
    { text: "needs to master a forbidden school of magic", tags: ["master", "forbidden", "magic", "school", "power", "learning"] },
    { text: "has to defend a village from monstrous invaders", tags: ["defend", "village", "monster", "invader", "combat", "protection"] },
    { text: "must seek forgiveness from a vengeful god", tags: ["seek", "forgiveness", "god", "vengeful", "divine", "quest"] },
    { text: "needs to guide refugees through dangerous territory", tags: ["guide", "refugee", "danger", "territory", "survival", "travel"] },
    { text: "has to infiltrate a secret society", tags: ["infiltrate", "secret society", "spy", "intrigue", "stealth", "cult"] },
    { text: "must find the mythical Fountain of Youth", tags: ["find", "mythical", "fountain", "youth", "immortality", "legend"] },
    { text: "needs to solve the mystery of a ghost ship", tags: ["solve", "mystery", "ghost", "ship", "sea", "supernatural"] },
    { text: "has to restore a corrupted ancient forest", tags: ["restore", "corrupted", "ancient", "forest", "nature", "magic"] },
    { text: "must win the heart of a powerful noble", tags: ["win heart", "love", "noble", "politics", "romance", "social"] },
    { text: "needs to hunt down a legendary beast", tags: ["hunt", "legendary", "beast", "monster", "tracker", "slay"] },
    { text: "has to prove their innocence for a crime they didn't commit", tags: ["prove innocence", "crime", "framed", "justice", "investigation"] },
    { text: "must build an army to fight an overwhelming force", tags: ["build army", "war", "overwhelming", "force", "leader", "strategy"] },
    { text: "needs to decipher an ancient, untranslatable text", tags: ["decipher", "ancient", "text", "language", "scholar", "knowledge"] },
    { text: "has to escape from an inescapable magical prison", tags: ["escape", "inescapable", "magic", "prison", "breakout", "freedom"] },
    { text: "must perform a ritual to appease angry elementals", tags: ["perform ritual", "appease", "elemental", "magic", "spirit", "shaman"] },
    { text: "needs to discover the source of a spreading madness", tags: ["discover source", "madness", "spreading", "mystery", "investigation", "horror"] },
    { text: "has to navigate the treacherous politics of the thieves' guild", tags: ["navigate", "politics", "thief", "guild", "rogue", "intrigue"] },
    { text: "must collect tears from a mythical creature", tags: ["collect", "tears", "mythical", "creature", "magic", "quest"] },
    { text: "needs to sabotage an enemy's war machine", tags: ["sabotage", "enemy", "war machine", "stealth", "destruction", "spy"] },
    // ... adding more plot goals ...
    { text: "has to protect a sacred artifact from falling into wrong hands", tags: ["protect", "sacred", "artifact", "wrong hands", "guardian", "quest"] },
    { text: "must find the lost heir to the throne", tags: ["find", "lost", "heir", "throne", "royal", "quest"] },
    { text: "needs to explore a newly discovered dimension", tags: ["explore", "new", "dimension", "plane", "discovery", "otherworldly"] },
    { text: "has to learn the true name of a powerful demon", tags: ["learn", "true name", "demon", "power", "magic", "forbidden"] },
    { text: "must mediate a dispute between dwarves and giants", tags: ["mediate", "dispute", "dwarf", "giant", "diplomacy", "peace"] },
    { text: "needs to retrieve the stolen voice of a siren", tags: ["retrieve", "stolen", "voice", "siren", "magic", "sea"] },
    { text: "has to survive the initiation rites of a barbarian tribe", tags: ["survive", "initiation", "rite", "barbarian", "tribe", "test"] },
    { text: "must reverse a petrification curse", tags: ["reverse", "petrification", "curse", "stone", "magic", "healing"] },
    { text: "needs to find the components for a world-saving spell", tags: ["find", "components", "spell", "world-saving", "magic", "quest"] },
    { text: "has to smuggle a rebel leader out of the capital", tags: ["smuggle", "rebel", "leader", "capital", "escape", "stealth"] },
    { text: "must investigate a series of magical murders", tags: ["investigate", "series", "magic", "murder", "mystery", "crime"] },
    { text: "needs to reclaim a holy site from invaders", tags: ["reclaim", "holy site", "invader", "temple", "war", "divine"] },
    { text: "has to capture a mischievous nature spirit", tags: ["capture", "mischievous", "nature spirit", "fey", "magic", "trap"] },
    { text: "must deliver a dire warning to a neighboring kingdom", tags: ["deliver", "warning", "kingdom", "message", "diplomacy", "danger"] },
    { text: "needs to find a way to communicate with ancient trees", tags: ["find way", "communicate", "ancient", "tree", "nature", "magic"] },
    { text: "has to break into the royal treasury", tags: ["break into", "royal", "treasury", "heist", "steal", "gold"] },
    { text: "must stop a cult from summoning an elder god", tags: ["stop", "cult", "summoning", "elder god", "forbidden", "ritual"] },
    { text: "needs to create a legendary weapon or armor", tags: ["create", "legendary", "weapon", "armor", "blacksmith", "magic"] },
    { text: "has to clear their family name", tags: ["clear name", "family", "honor", "disgrace", "quest", "reputation"] },
    { text: "must learn the secrets of elemental binding", tags: ["learn", "secret", "elemental", "binding", "magic", "shaman"] },
    { text: "needs to find a safe haven for their people", tags: ["find", "safe haven", "people", "refugee", "survival", "journey"] },
    { text: "has to close fissures leading to the Underworld", tags: ["close", "fissure", "underworld", "portal", "undead", "danger"] },
    { text: "must prove a dragon is innocent of destroying a village", tags: ["prove", "dragon", "innocent", "destruction", "village", "investigation"] },
    { text: "needs to gather allies for an impossible battle", tags: ["gather allies", "impossible", "battle", "war", "diplomacy", "leader"] },
    { text: "has to remove a magical parasite", tags: ["remove", "magic", "parasite", "curse", "healing", "infestation"] },
    { text: "must find the lost library of Alexandria (fantasy version)", tags: ["find", "lost", "library", "ancient", "knowledge", "scholar"] },
    { text: "needs to convince a sleeping giant to move", tags: ["convince", "sleeping", "giant", "move", "diplomacy", "persuasion"] },
    { text: "has to track down a notorious artifact thief", tags: ["track down", "notorious", "artifact", "thief", "rogue", "hunt"] },
    { text: "must restore the magic to a dying land", tags: ["restore", "magic", "dying land", "healing", "nature", "quest"] },
    { text: "needs to win a magical riddle contest", tags: ["win", "magic", "riddle", "contest", "clever", "intellect"] },
    { text: "has to destroy a sentient, malevolent weapon", tags: ["destroy", "sentient", "malevolent", "weapon", "artifact", "danger"] },
    { text: "must unravel the mystery of their own immortality", tags: ["unravel", "mystery", "immortality", "identity", "past", "curse"] },
    { text: "needs to forge an alliance with the fey courts", tags: ["forge alliance", "fey", "court", "diplomacy", "magic", "politics"] },
    { text: "has to find the architect of a reality-warping maze", tags: ["find", "architect", "reality-warping", "maze", "magic", "labyrinth"] },
    { text: "must photograph (or magically record) rare creatures", tags: ["record", "rare", "creature", "beast", "exploration", "scholar"] },
    { text: "needs to shut down a magical drug operation", tags: ["shut down", "magic", "drug", "operation", "crime", "investigation"] },
    { text: "has to perform a counter-ritual during an eclipse", tags: ["perform", "counter-ritual", "eclipse", "magic", "celestial", "timing"] },
    { text: "must rescue their mentor from a rival's clutches", tags: ["rescue", "mentor", "rival", "capture", "quest", "teacher"] },
    { text: "needs to find the heart of a fallen star", tags: ["find", "heart", "fallen star", "celestial", "magic", "artifact"] },
    { text: "has to protect a city from an incoming kaiju-sized monster", tags: ["protect", "city", "kaiju", "monster", "colossal", "defense"] },
    { text: "must learn the language of dragons", tags: ["learn", "language", "dragon", "communication", "scholar", "magic"] },
    { text: "needs to retrieve souls stolen by a night hag", tags: ["retrieve", "soul", "stolen", "night hag", "fey", "undead"] },
    { text: "has to broker a deal with a powerful demon", tags: ["broker deal", "demon", "powerful", "forbidden", "negotiate", "danger"] },
    { text: "must find the source of unnatural storms", tags: ["find source", "unnatural", "storm", "weather", "magic", "mystery"] },
    { text: "needs to prove the existence of a lost civilization", tags: ["prove existence", "lost civilization", "ancient", "ruins", "exploration", "scholar"] },
    { text: "has to consecrate haunted ground", tags: ["consecrate", "haunted", "ground", "holy", "divine", "spirit"] },
    { text: "must steal back the moon (or a piece of it)", tags: ["steal back", "moon", "celestial", "magic", "legendary", "impossible"] },
    { text: "needs to find someone lost in the Astral Plane", tags: ["find someone", "lost", "astral plane", "rescue", "magic", "otherworldly"] },
    { text: "has to deactivate ancient magical wards", tags: ["deactivate", "ancient", "magic", "ward", "trap", "ruins"] },
    { text: "must take control of their own prophecy", tags: ["take control", "prophecy", "fate", "destiny", "oracle", "choice"] },
    { text: "needs to find a living descendant of a forgotten hero", tags: ["find", "descendant", "forgotten", "hero", "bloodline", "quest"] }
]; // ~100 plot goals

const plotTwists = [
    { text: "only to discover their closest ally is a traitor.", tags: ["betrayal", "ally", "deception", "reveal", "friend"] },
    { text: "but learns the 'villain' was trying to prevent a greater catastrophe.", tags: ["reveal", "villain", "morality", "grey", "catastrophe", "misunderstood"] },
    { text: "realizing the artifact they sought holds a terrible power.", tags: ["artifact", "power", "danger", "consequence", "temptation", "cursed"] },
    { text: "finding out their quest was orchestrated by a hidden manipulator.", tags: ["manipulation", "conspiracy", "reveal", "deception", "puppet master"] },
    { text: "and in doing so, awakens an ancient, slumbering entity.", tags: ["awakening", "ancient", "entity", "danger", "consequence", "slumbering"] },
    { text: "discovering their 'enemy' is actually a long-lost relative.", tags: ["reveal", "family", "enemy", "relative", "kin", "connection"] },
    { text: "but the cost of success is higher than they ever imagined.", tags: ["sacrifice", "cost", "consequence", "victory", "pyrrhic victory"] },
    { text: "revealing their own latent magical abilities in the process.", tags: ["magic", "power", "reveal", "self", "latent", "awakening"] },
    { text: "learning that the prophecy guiding them was misinterpreted.", tags: ["prophecy", "misinterpretation", "reveal", "guidance", "oracle", "fate"] },
    { text: "and finds that victory requires a profound personal sacrifice.", tags: ["sacrifice", "victory", "cost", "personal", "heroic"] },
    { text: "discovering the 'sacred' ritual actually empowers the enemy.", tags: ["reveal", "ritual", "sacred", "enemy", "deception", "trap"] },
    { text: "learning their mentor was the original villain all along.", tags: ["betrayal", "mentor", "villain", "reveal", "teacher", "deception"] },
    { text: "finding the 'monster' they hunted was protecting something vital.", tags: ["reveal", "monster", "protector", "misunderstood", "vital", "nature"] },
    { text: "realizing they are a clone/construct/illusion.", tags: ["identity crisis", "clone", "construct", "illusion", "reveal", "self"] },
    { text: "discovering the kingdom they serve is fundamentally corrupt.", tags: ["reveal", "kingdom", "corruption", "betrayal", "politics", "morality"] },
    { text: "learning the curse they sought to break is actually beneficial.", tags: ["reveal", "curse", "beneficial", "twist", "misunderstood", "power"] },
    { text: "finding the 'rescued' person didn't want to be saved.", tags: ["rescue", "reveal", "unwilling", "twist", "captive", "choice"] },
    { text: "discovering the villain is their future self.", tags: ["villain", "future self", "time travel", "paradox", "reveal", "identity crisis"] },
    { text: "realizing their actions have doomed another innocent group.", tags: ["consequence", "doom", "innocent", "unintended", "fallout", "cost"] },
    { text: "learning the 'gods' are actually powerful, manipulative aliens/entities.", tags: ["gods", "reveal", "alien", "entity", "manipulation", "false god"] },
    { text: "finding the map they followed leads to a trap.", tags: ["map", "trap", "deception", "quest", "misdirection", "danger"] },
    { text: "discovering their unique ability comes from the enemy they fight.", tags: ["power source", "enemy", "connection", "reveal", "irony", "ability"] },
    { text: "realizing the 'safe haven' is slowly draining its inhabitants.", tags: ["safe haven", "trap", "reveal", "draining", "danger", "illusion"] },
    { text: "learning the 'legendary hero' they idolized was a tyrant.", tags: ["hero", "reveal", "tyrant", "legend", "history", "idol"] },
    { text: "finding that success breaks a seal holding back something worse.", tags: ["consequence", "seal", "worse", "danger", "unleash", "victory cost"] },
    { text: "discovering their quest item is needed to maintain world balance.", tags: ["quest item", "balance", "reveal", "consequence", "artifact", "dilemma"] },
    { text: "learning they are destined to become the next great evil.", tags: ["destiny", "evil", "prophecy", "reveal", "fate", "corruption"] },
    { text: "finding the person they love is an illusion created by the enemy.", tags: ["love", "illusion", "enemy", "deception", "betrayal", "reveal"] },
    { text: "realizing the entire conflict was a test by a higher power.", tags: ["test", "higher power", "conflict", "reveal", "manipulation", "divine"] },
    { text: "discovering the 'plague' is actually a symbiotic organism.", tags: ["plague", "reveal", "symbiote", "organism", "misunderstood", "benefit"] },
    { text: "learning their trusted animal companion is a spy.", tags: ["animal companion", "spy", "betrayal", "reveal", "deception", "ally"] },
    { text: "finding the ancient ruins are actually futuristic technology.", tags: ["ruins", "technology", "ancient", "future", "reveal", "sci-fi"] },
    { text: "discovering the villain's goal is morally justifiable, but methods are not.", tags: ["villain", "morality", "grey", "justifiable", "methods", "dilemma"] },
    { text: "realizing they have been time-looped without knowing.", tags: ["time loop", "reveal", "repetition", "memory loss", "paradox", "temporal"] },
    { text: "learning the 'magic' is actually highly advanced science.", tags: ["magic", "science", "reveal", "technology", "misunderstood", "advanced"] },
    { text: "finding the 'demon' they fight is a wrongly accused celestial.", tags: ["demon", "celestial", "reveal", "wrongly accused", "angel", "misunderstood"] },
    { text: "discovering the enemy leader is their identical twin.", tags: ["enemy", "twin", "reveal", "identity crisis", "family", "doppelganger"] },
    { text: "realizing their victory condition involves betraying their allies.", tags: ["victory", "betrayal", "allies", "dilemma", "cost", "sacrifice"] },
    { text: "learning the 'lost civilization' destroyed itself willingly.", tags: ["lost civilization", "reveal", "destroyed self", "willingly", "mystery", "ancient"] },
    { text: "finding the quest giver is the main antagonist.", tags: ["quest giver", "antagonist", "villain", "betrayal", "reveal", "manipulation"] },
    // ... adding more plot twists ...
    { text: "discovering the prophecy was planted to manipulate them.", tags: ["prophecy", "planted", "manipulation", "reveal", "false", "guidance"] },
    { text: "realizing the 'artifact' is a living, conscious being.", tags: ["artifact", "living", "conscious", "reveal", "sentient", "magic item"] },
    { text: "learning their bloodline is tied to the very evil they fight.", tags: ["bloodline", "evil", "connection", "reveal", "family", "destiny"] },
    { text: "finding the 'curse' is the only thing keeping them alive.", tags: ["curse", "reveal", "alive", "irony", "benefit", "double-edged"] },
    { text: "discovering the peaceful village secretly sacrifices outsiders.", tags: ["village", "sacrifice", "secret", "reveal", "horror", "dark"] },
    { text: "learning the 'key' they need is a person, not an object.", tags: ["key", "person", "reveal", "metaphor", "quest item", "living key"] },
    { text: "finding the enemy's fortress is their own ancestral home.", tags: ["fortress", "ancestral home", "reveal", "irony", "family", "connection"] },
    { text: "discovering the 'healing potion' has monstrous side effects.", tags: ["healing potion", "side effects", "reveal", "monster", "danger", "cure"] },
    { text: "realizing their memories have been tampered with.", tags: ["memory loss", "tampered", "reveal", "identity crisis", "false memory", "manipulation"] },
    { text: "learning the 'invaders' are refugees fleeing a greater threat.", tags: ["invader", "refugee", "reveal", "greater threat", "misunderstood", "morality"] },
    { text: "finding their magical weapon is slowly corrupting them.", tags: ["weapon", "corrupting", "magic item", "reveal", "danger", "power cost"] },
    { text: "discovering the rebellion is funded by a rival evil faction.", tags: ["rebellion", "funded", "rival", "evil", "reveal", "manipulation"] },
    { text: "learning the 'harmless' creature they adopted is a larval god.", tags: ["creature", "god", "larval", "reveal", "danger", "power"] },
    { text: "finding the final battle location shifts based on their fears.", tags: ["final battle", "location", "fear", "psychological", "reveal", "mindscape"] },
    { text: "discovering the 'ancient wisdom' they sought is useless nonsense.", tags: ["wisdom", "ancient", "useless", "reveal", "nonsense", "disappointment"] },
    { text: "learning their 'dead' parent is alive and working for the enemy.", tags: ["parent", "alive", "enemy", "betrayal", "reveal", "family"] },
    { text: "finding the 'holy symbol' is actually a demonic pact stone.", tags: ["holy symbol", "demonic pact", "reveal", "deception", "religion", "trap"] },
    { text: "discovering they completed the quest centuries ago, but lost their memory.", tags: ["memory loss", "quest completed", "reveal", "past", "time", "identity crisis"] },
    { text: "realizing the 'voice guiding them' belongs to the imprisoned villain.", tags: ["guidance", "voice", "villain", "imprisoned", "reveal", "manipulation"] },
    { text: "learning the 'escape route' leads directly into the villain's main chamber.", tags: ["escape route", "trap", "reveal", "villain", "misdirection", "danger"] },
    { text: "finding the 'treasure' is the knowledge of how the world ends.", tags: ["treasure", "knowledge", "world ends", "reveal", "danger", "burden"] },
    { text: "discovering their own reflection is plotting against them.", tags: ["reflection", "plot", "reveal", "doppelganger", "magic", "identity crisis"] },
    { text: "learning the kingdom's prosperity is fueled by stolen souls.", tags: ["kingdom", "prosperity", "stolen soul", "reveal", "corruption", "dark secret"] },
    { text: "finding the 'neutral' observer has been manipulating both sides.", tags: ["neutral", "observer", "manipulation", "both sides", "reveal", "intrigue"] },
    { text: "discovering the magical disease grants powers but ensures madness.", tags: ["disease", "power", "madness", "reveal", "double-edged", "curse"] },
    { text: "learning the world is a simulation they need to escape.", tags: ["simulation", "world", "escape", "reveal", "reality", "matrix"] },
    { text: "finding the 'sacrificial victim' is immortal and planned this.", tags: ["sacrifice", "victim", "immortal", "reveal", "plan", "manipulation"] },
    { text: "discovering their animal form (shapeshifter) is their true form.", tags: ["shapeshifter", "true form", "reveal", "identity crisis", "animal", "human"] },
    { text: "learning the 'ancient evil' is a child lashing out with immense power.", tags: ["evil", "child", "power", "reveal", "misunderstood", "tragedy"] },
    { text: "finding the 'safe path' is guarded by an illusion of their worst failure.", tags: ["path", "illusion", "failure", "fear", "psychological", "guardian"] },
    { text: "discovering the quest itself is the ritual to unleash doom.", tags: ["quest", "ritual", "doom", "reveal", "trap", "unleash"] },
    { text: "learning their greatest strength is also their greatest weakness.", tags: ["strength", "weakness", "reveal", "irony", "power", "flaw"] },
    { text: "finding the 'goddess of healing' requires sacrifice for her cures.", tags: ["goddess", "healing", "sacrifice", "reveal", "cost", "dark secret"] },
    { text: "discovering their journey exists only within a magical snow globe.", tags: ["snow globe", "trapped", "illusion", "reveal", "reality", "miniature"] },
    { text: "learning the villain is trying to save the world their own twisted way.", tags: ["villain", "save world", "twisted", "reveal", "morality", "grey"] },
    { text: "finding the 'lost city' sank because its inhabitants fled from them (the hero).", tags: ["lost city", "sank", "fled", "hero", "reveal", "irony"] },
    { text: "discovering their actions have erased a vital future event.", tags: ["consequence", "erase", "future event", "time travel", "paradox", "fallout"] },
    { text: "learning their 'loyal' army is secretly controlled by the enemy.", tags: ["army", "loyal", "controlled", "enemy", "betrayal", "reveal"] },
    { text: "finding the 'final boss' is just a puppet; the real threat is abstract.", tags: ["final boss", "puppet", "abstract threat", "reveal", "misdirection", "conceptual"] }
]; // ~100 plot twists

// --- Helper Function to Get Random Element (Modified for Tags) ---

function getRandomElement(arr, tag = null) {
    if (!arr || arr.length === 0) {
        return { text: "[error: empty array]", tags: [] }; // Return object for consistency
    }

    let filteredArr = arr;

    // If a tag is provided, filter the array
    if (tag && typeof tag === 'string' && tag.trim() !== '') {
        const lowerCaseTag = tag.trim().toLowerCase();
        // Filter based on whether the element's tags array includes the keyword
        // Check if element has 'tags' property before accessing it
        filteredArr = arr.filter(item => item && item.tags && Array.isArray(item.tags) && item.tags.includes(lowerCaseTag));
    }

    // If the filtered array is empty (no matches found or no tag provided), use the original array
    if (filteredArr.length === 0) {
        // console.warn(`No elements found for tag "${tag}". Picking random element.`); // Optional: Log a warning
        filteredArr = arr;
        // Ensure we don't try to pick from an empty original array either
        if (filteredArr.length === 0) {
            return { text: "[error: array is empty]", tags: [] };
        }
    }

    // Select a random index from the (potentially filtered) array
    const randomIndex = Math.floor(Math.random() * filteredArr.length);
    return filteredArr[randomIndex];
}

// Special function for names (which are still strings, not objects)
function getRandomName(arr) {
    if (!arr || arr.length === 0) return "[error: empty name array]";
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


// --- Function to Generate Plot (Modified) ---

function generatePlot() {
    // Get the keyword from the input field
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value; // Get the text entered by the user

    // Get random elements for the plot
    // For now, let's try to use the keyword mainly for setting and goal,
    // but fall back to random if no keyword or match.
    const name1 = getRandomName(characterNames);
    let name2 = getRandomName(characterNames);
    while (name2 === name1) { // Ensure different names
        name2 = getRandomName(characterNames);
    }

    // Get elements as objects (which include the text)
    const archetypeObj = getRandomElement(characterArchetypes); // Keyword not used for archetype yet
    const settingObj = getRandomElement(settings, keyword);     // Use keyword for setting
    const goalObj = getRandomElement(plotGoals, keyword);         // Use keyword for goal
    const twistObj = getRandomElement(plotTwists);               // Keyword not used for twist yet

    // Construct the plot string using the .text property of the objects
    const plot = `${name1}, ${archetypeObj.text}, finds themself ${settingObj.text}. They ${goalObj.text}, ${twistObj.text}`;

    // Display the plot in the HTML
    const plotOutputElement = document.getElementById('plotOutput');
    plotOutputElement.innerHTML = `<p>${plot}</p>`;
}

// --- Event Listener for the Button ---

const generateButton = document.getElementById('generateBtn');
// Make sure the listener is attached correctly
if (generateButton) {
    generateButton.addEventListener('click', generatePlot);
} else {
    console.error("Generate button not found!");
}

// Optional: Clear the initial text or generate a plot on load
// const plotOutputElement = document.getElementById('plotOutput');
// if (plotOutputElement) {
//     plotOutputElement.innerHTML = '<p>Enter an optional keyword and click the button!</p>';
// }
// generatePlot(); // Uncomment to generate plot immediately on load (without keyword)