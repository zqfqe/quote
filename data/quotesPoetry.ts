
const q = (text: string, author: string) => ({ text, author });

export const POETRY_QUOTES: Record<string, { text: string, author: string }[]> = {
  // A
  "A Dream Within a Dream": [q("All that we see or seem is but a dream within a dream.", "Edgar Allan Poe")],
  "A Psalm of Life": [q("Lives of great men all remind us / We can make our lives sublime.", "Henry Wadsworth Longfellow")],
  "A Red, Red Rose": [q("O, my Luve's like a red, red rose.", "Robert Burns")],
  "A Visit from St. Nicholas": [q("'Twas the night before Christmas, when all through the house...", "Clement Clarke Moore")],
  "Adonais": [q("He is made one with Nature: there is heard His voice in all her music.", "Percy Bysshe Shelley")],
  "Annabel Lee": [q("It was many and many a year ago, In a kingdom by the sea.", "Edgar Allan Poe")],
  "Auguries of Innocence": [q("To see a World in a Grain of Sand And a Heaven in a Wild Flower.", "William Blake")],
  // B
  "Barbara Frietchie": [q("Shoot, if you must, this old gray head, But spare your country's flag.", "John Greenleaf Whittier")],
  "Because I could not stop for Death": [q("Because I could not stop for Death – He kindly stopped for me.", "Emily Dickinson")],
  "Beowulf": [q("They have seen my strength for themselves.", "Unknown")],
  // C
  "Canterbury Tales": [q("Love conquers all.", "Geoffrey Chaucer")],
  "Casey at the Bat": [q("The outlook wasn't brilliant for the Mudville nine that day.", "Ernest Thayer")],
  "Charge of the Light Brigade": [q("Theirs not to reason why, theirs but to do and die.", "Alfred, Lord Tennyson")],
  // D
  "Daddy": [q("You do not do, you do not do.", "Sylvia Plath")],
  "Daffodils": [q("I wandered lonely as a cloud.", "William Wordsworth")],
  "Death Be Not Proud": [q("Death, be not proud, though some have called thee Mighty and dreadful.", "John Donne")],
  "Do Not Go Gentle Into That Good Night": [q("Do not go gentle into that good night.", "Dylan Thomas"), q("Rage, rage against the dying of the light.", "Dylan Thomas")],
  "Dover Beach": [q("Ah, love, let us be true to one another!", "Matthew Arnold")],
  "Dream Deferred": [q("What happens to a dream deferred? Does it dry up like a raisin in the sun?", "Langston Hughes")],
  // E
  "Easter, 1916": [q("All changed, changed utterly: A terrible beauty is born.", "W.B. Yeats")],
  "Elegy Written in a Country Churchyard": [q("The paths of glory lead but to the grave.", "Thomas Gray")],
  "Endymion": [q("A thing of beauty is a joy for ever.", "John Keats")],
  // F
  "Fire and Ice": [q("Some say the world will end in fire, some say in ice.", "Robert Frost")],
  "Fog": [q("The fog comes on little cat feet.", "Carl Sandburg")],
  "For Whom the Bell Tolls": [q("No man is an island.", "John Donne"), q("Therefore, send not to know for whom the bell tolls, it tolls for thee.", "John Donne")],
  // G
  "Goblin Market": [q("Morning and evening, maids heard the goblins cry.", "Christina Rossetti")],
  "Gunga Din": [q("You're a better man than I am, Gunga Din!", "Rudyard Kipling")],
  // H
  "Hamlet": [q("To be, or not to be: that is the question.", "William Shakespeare")],
  "Hiawatha": [q("By the shores of Gitche Gumee.", "Henry Wadsworth Longfellow")],
  "High Flight": [q("Oh! I have slipped the surly bonds of earth.", "John Gillespie Magee Jr.")],
  "How Do I Love Thee?": [q("How do I love thee? Let me count the ways.", "Elizabeth Barrett Browning")],
  "Howl": [q("I saw the best minds of my generation destroyed by madness.", "Allen Ginsberg")],
  // I
  "I Carry Your Heart With Me": [q("i carry your heart with me(i carry it in my heart)", "e.e. cummings")],
  "I Hear America Singing": [q("I hear America singing, the varied carols I hear.", "Walt Whitman")],
  "I Wandered Lonely as a Cloud": [q("Ten thousand saw I at a glance.", "William Wordsworth")],
  "If-": [q("If you can keep your head when all about you are losing theirs.", "Rudyard Kipling"), q("Yours is the Earth and everything that's in it.", "Rudyard Kipling")],
  "In Flanders Fields": [q("In Flanders fields the poppies blow Between the crosses, row on row.", "John McCrae")],
  "Invictus": [q("I am the master of my fate: I am the captain of my soul.", "William Ernest Henley")],
  // J
  "Jabberwocky": [q("Beware the Jabberwock, my son!", "Lewis Carroll"), q("Twas brillig, and the slithy toves.", "Lewis Carroll")],
  // K
  "Keeping Quiet": [q("Now we will count to twelve and we will all keep still.", "Pablo Neruda")],
  "Kubla Khan": [q("In Xanadu did Kubla Khan A stately pleasure-dome decree.", "Samuel Taylor Coleridge")],
  // L
  "La Belle Dame sans Merci": [q("O what can ail thee, knight-at-arms, Alone and palely loitering?", "John Keats")],
  "Lady Lazarus": [q("Dying Is an art, like everything else.", "Sylvia Plath")],
  "Leaves of Grass": [q("I celebrate myself, and sing myself.", "Walt Whitman")],
  "Lenore": [q("Ah, broken is the golden bowl! the spirit flown forever!", "Edgar Allan Poe")],
  "Love Song of J. Alfred Prufrock": [q("I have measured out my life with coffee spoons.", "T.S. Eliot")],
  // M
  "Mending Wall": [q("Something there is that doesn't love a wall.", "Robert Frost"), q("Good fences make good neighbors.", "Robert Frost")],
  // N
  "No Man Is An Island": [q("No man is an island, entire of itself.", "John Donne")],
  "Nothing Gold Can Stay": [q("Nature's first green is gold, Her hardest hue to hold.", "Robert Frost"), q("Nothing gold can stay.", "Robert Frost")],
  // O
  "O Captain! My Captain!": [q("O Captain! my Captain! our fearful trip is done.", "Walt Whitman")],
  "Ode on a Grecian Urn": [q("Beauty is truth, truth beauty.", "John Keats")],
  "Ode to a Nightingale": [q("My heart aches, and a drowsy numbness pains my sense.", "John Keats")],
  "Ode to the West Wind": [q("If Winter comes, can Spring be far behind?", "Percy Bysshe Shelley")],
  "Ozymandias": [q("Look on my Works, ye Mighty, and despair!", "Percy Bysshe Shelley"), q("I met a traveller from an antique land.", "Percy Bysshe Shelley")],
  // P
  "Paradise Lost": [q("Better to reign in Hell, than serve in Heaven.", "John Milton")],
  "Phenomenal Woman": [q("I'm a woman. Phenomenally.", "Maya Angelou")],
  // R
  "Richard Cory": [q("And Richard Cory, one calm summer night, Went home and put a bullet through his head.", "Edwin Arlington Robinson")],
  "Rime of the Ancient Mariner": [q("Water, water, every where, Nor any drop to drink.", "Samuel Taylor Coleridge")],
  "Road Not Taken": [q("Two roads diverged in a yellow wood.", "Robert Frost"), q("I took the one less traveled by, And that has made all the difference.", "Robert Frost")],
  // S
  "She Walks in Beauty": [q("She walks in beauty, like the night.", "Lord Byron")],
  "Song of Myself": [q("I celebrate myself, and sing myself.", "Walt Whitman")],
  "Sonnet 18": [q("Shall I compare thee to a summer's day?", "William Shakespeare")],
  "Sonnet 43": [q("How do I love thee? Let me count the ways.", "Elizabeth Barrett Browning")],
  "Still I Rise": [q("I rise / I rise / I rise.", "Maya Angelou")],
  "Stopping by Woods on a Snowy Evening": [q("The woods are lovely, dark and deep.", "Robert Frost"), q("And miles to go before I sleep.", "Robert Frost")],
  // T
  "The Chaos": [q("Dearest creature in creation, Study English pronunciation.", "Gerard Nolst Trenité")],
  "The Hollow Men": [q("This is the way the world ends Not with a bang but a whimper.", "T.S. Eliot")],
  "The Love Song of J. Alfred Prufrock": [q("Let us go then, you and I.", "T.S. Eliot")],
  "The New Colossus": [q("Give me your tired, your poor, Your huddled masses yearning to breathe free.", "Emma Lazarus")],
  "The Raven": [q("Quoth the Raven 'Nevermore'.", "Edgar Allan Poe"), q("Once upon a midnight dreary, while I pondered, weak and weary.", "Edgar Allan Poe")],
  "The Second Coming": [q("Things fall apart; the centre cannot hold.", "W.B. Yeats")],
  "The Tyger": [q("Tyger Tyger, burning bright.", "William Blake")],
  "The Waste Land": [q("April is the cruellest month.", "T.S. Eliot")],
  "To a Mouse": [q("The best laid schemes o' mice an' men Gang aft agley.", "Robert Burns")],
  "To His Coy Mistress": [q("Had we but world enough, and time.", "Andrew Marvell")],
  "Trees": [q("I think that I shall never see A poem lovely as a tree.", "Joyce Kilmer")],
  // U
  "Ulalume": [q("The skies they were ashen and sober.", "Edgar Allan Poe")],
  "Ulysses": [q("To strive, to seek, to find, and not to yield.", "Alfred, Lord Tennyson")],
  // V
  "Verses on the Death of Dr. Swift": [q("He gave the little wealth he had.", "Jonathan Swift")],
  "Village Blacksmith": [q("Under a spreading chestnut-tree The village smithy stands.", "Henry Wadsworth Longfellow")],
  // W
  "We Wear the Mask": [q("We wear the mask that grins and lies.", "Paul Laurence Dunbar")],
  "When You Are Old": [q("When you are old and grey and full of sleep.", "W.B. Yeats")],
  "Where the Sidewalk Ends": [q("There is a place where the sidewalk ends.", "Shel Silverstein")],
  // X
  "Xanadu": [q("In Xanadu did Kubla Khan A stately pleasure-dome decree.", "Samuel Taylor Coleridge")],
  // Y
  "You Are Old, Father William": [q("You are old, Father William.", "Lewis Carroll")],
  "Youth and Art": [q("It once might have been, once only.", "Robert Browning")],
  // Z
  "Zara's Earrings": [q("My earrings! my earrings! they've dropt into the well.", "J.G. Lockhart")],
  "Zone": [q("In the end you are weary of this ancient world.", "Guillaume Apollinaire")]
};
