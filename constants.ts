import { Topic, Author } from "./types";

// Helper to create simple author objects
const createAuthor = (id: string, name: string) => ({ 
  id, 
  name, 
  imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff` 
});

const createTopic = (id: string, name: string) => ({ 
  id, 
  name, 
  slug: name.toLowerCase(), 
  count: Math.floor(Math.random() * 1000) + 50 
});

const createMedia = (id: string, name: string) => ({
  id,
  name,
  slug: name.toLowerCase(),
  count: Math.floor(Math.random() * 500) + 20
});

export const POPULAR_TOPICS: Topic[] = [
  // A
  createTopic('t_a1', 'Ability'), createTopic('t_a25', 'Absence'), createTopic('t_a26', 'Abundance'), createTopic('t_a1', 'Acceptance'), 
  createTopic('t_a27', 'Accident'), createTopic('t_a28', 'Accomplishment'), createTopic('t_a29', 'Accountability'), createTopic('t_a2', 'Achievement'), 
  createTopic('t_a30', 'Acting'), createTopic('t_a3', 'Action'), createTopic('t_a31', 'Activism'), createTopic('t_a32', 'Adaptability'), 
  createTopic('t_a33', 'Addiction'), createTopic('t_a34', 'Administration'), createTopic('t_a35', 'Admiration'), createTopic('t_a36', 'Adolescence'), 
  createTopic('t_a37', 'Adoption'), createTopic('t_a38', 'Adorable'), createTopic('t_a16', 'Adventure'), createTopic('t_a4', 'Adversity'), 
  createTopic('t_a39', 'Advertising'), createTopic('t_a40', 'Advice'), createTopic('t_a41', 'Advocacy'), createTopic('t_a42', 'Affection'), 
  createTopic('t_a18', 'Afternoon'), createTopic('t_a5', 'Age'), createTopic('t_a43', 'Agreement'), createTopic('t_a44', 'Agriculture'), 
  createTopic('t_a45', 'Air'), createTopic('t_a46', 'Airport'), createTopic('t_a47', 'Alcohol'), createTopic('t_a48', 'Alien'), 
  createTopic('t_a49', 'Alive'), createTopic('t_a6', 'Alone'), createTopic('t_a50', 'Altruism'), createTopic('t_a7', 'Amazing'), 
  createTopic('t_a8', 'Ambition'), createTopic('t_a51', 'America'), createTopic('t_a52', 'Amusement'), createTopic('t_a53', 'Analysis'), 
  createTopic('t_a54', 'Anarchy'), createTopic('t_a55', 'Anatomy'), createTopic('t_a56', 'Ancestry'), createTopic('t_a57', 'Angels'), 
  createTopic('t_a9', 'Anger'), createTopic('t_a58', 'Angst'), createTopic('t_a10', 'Animals'), createTopic('t_a59', 'Anime'), 
  createTopic('t_a11', 'Anniversary'), createTopic('t_a60', 'Annoyance'), createTopic('t_a61', 'Answer'), createTopic('t_a12', 'Anxiety'), 
  createTopic('t_a62', 'Apathy'), createTopic('t_a63', 'Apology'), createTopic('t_a64', 'Appearance'), createTopic('t_a17', 'Appreciation'), 
  createTopic('t_a65', 'April'), createTopic('t_a19', 'April Fool\'s Day'), createTopic('t_a13', 'Architecture'), createTopic('t_a66', 'Argument'), 
  createTopic('t_a14', 'Art'), createTopic('t_a67', 'Artificial Intelligence'), createTopic('t_a68', 'Artist'), createTopic('t_a69', 'Astronomy'), 
  createTopic('t_a70', 'Atheism'), createTopic('t_a71', 'Athletics'), createTopic('t_a72', 'Atmosphere'), createTopic('t_a15', 'Attitude'), 
  createTopic('t_a73', 'Attraction'), createTopic('t_a74', 'August'), createTopic('t_a75', 'Authenticity'), createTopic('t_a76', 'Authority'), 
  createTopic('t_a20', 'Autumn'), createTopic('t_a77', 'Awakening'), createTopic('t_a78', 'Awareness'), createTopic('t_a79', 'Awe'),
  createTopic('t_a80', 'Absurdism'), createTopic('t_a81', 'Altruism'), createTopic('t_a82', 'Aesthetics'),

  // B
  createTopic('t_b16', 'Baby'), createTopic('t_b38', 'Baby Shower'), createTopic('t_b1', 'Balance'), createTopic('t_b17', 'Baseball'), 
  createTopic('t_b18', 'Basketball'), createTopic('t_b19', 'Bathroom'), createTopic('t_b20', 'Battle'), createTopic('t_b21', 'Beach'), 
  createTopic('t_b22', 'Beard'), createTopic('t_b2', 'Beauty'), createTopic('t_b23', 'Beer'), createTopic('t_b24', 'Beginning'), 
  createTopic('t_b25', 'Behavior'), createTopic('t_b3', 'Belief'), createTopic('t_b26', 'Belonging'), createTopic('t_b4', 'Best'), 
  createTopic('t_b27', 'Betrayal'), createTopic('t_b28', 'Bible'), createTopic('t_b29', 'Bicycle'), createTopic('t_b30', 'Biology'), 
  createTopic('t_b31', 'Birds'), createTopic('t_b5', 'Birthday'), createTopic('t_b32', 'Black'), createTopic('t_b33', 'Blame'), 
  createTopic('t_b11', 'Blessing'), createTopic('t_b34', 'Blind'), createTopic('t_b35', 'Bliss'), createTopic('t_b36', 'Blood'), 
  createTopic('t_b37', 'Blue'), createTopic('t_b38', 'Boat'), createTopic('t_b39', 'Body'), createTopic('t_b6', 'Books'), 
  createTopic('t_b13', 'Boredom'), createTopic('t_b14', 'Boss'), createTopic('t_b40', 'Boy'), createTopic('t_b41', 'Boyfriend'), 
  createTopic('t_b7', 'Brainy'), createTopic('t_b42', 'Branding'), createTopic('t_b8', 'Bravery'), createTopic('t_b43', 'Bread'), 
  createTopic('t_b44', 'Break'), createTopic('t_b45', 'Breakfast'), createTopic('t_b46', 'Breath'), createTopic('t_b47', 'Bride'), 
  createTopic('t_b48', 'Bridge'), createTopic('t_b12', 'Broken Heart'), createTopic('t_b9', 'Brotherhood'), createTopic('t_b49', 'Building'), 
  createTopic('t_b15', 'Burnout'), createTopic('t_b10', 'Business'), createTopic('t_b50', 'Busy'), createTopic('t_b51', 'Butterfly'),
  createTopic('t_b52', 'Baptism'), createTopic('t_b53', 'Bar Mitzvah'),

  // C
  createTopic('t_c1', 'Calm'), createTopic('t_c25', 'Camera'), createTopic('t_c26', 'Camping'), createTopic('t_c27', 'Cancer'), 
  createTopic('t_c28', 'Candy'), createTopic('t_c2', 'Car'), createTopic('t_c3', 'Care'), createTopic('t_c4', 'Career'), 
  createTopic('t_c5', 'Cats'), createTopic('t_c29', 'Cause'), createTopic('t_c6', 'Celebration'), createTopic('t_c30', 'Celebrity'), 
  createTopic('t_c31', 'Cell Phone'), createTopic('t_c32', 'Cemetery'), createTopic('t_c33', 'Challenge'), createTopic('t_c34', 'Champion'), 
  createTopic('t_c7', 'Chance'), createTopic('t_c8', 'Change'), createTopic('t_c35', 'Chaos'), createTopic('t_c9', 'Character'), 
  createTopic('t_c36', 'Charity'), createTopic('t_c37', 'Charm'), createTopic('t_c38', 'Cheating'), createTopic('t_c39', 'Cheer'), 
  createTopic('t_c40', 'Chemistry'), createTopic('t_c41', 'Chess'), createTopic('t_c42', 'Childhood'), createTopic('t_c10', 'Children'), 
  createTopic('t_c43', 'Chocolate'), createTopic('t_c44', 'Choice'), createTopic('t_c11', 'Christmas'), createTopic('t_c45', 'Church'), 
  createTopic('t_c46', 'Cinema'), createTopic('t_c47', 'City'), createTopic('t_c48', 'Civilization'), createTopic('t_c49', 'Class'), 
  createTopic('t_c50', 'Classic'), createTopic('t_c51', 'Clean'), createTopic('t_c52', 'Clever'), createTopic('t_c53', 'Climate'), 
  createTopic('t_c54', 'Clock'), createTopic('t_c55', 'Clothes'), createTopic('t_c56', 'Clouds'), createTopic('t_c57', 'Coaching'), 
  createTopic('t_c12', 'Coffee'), createTopic('t_c58', 'Cold'), createTopic('t_c23', 'Collaboration'), createTopic('t_c22', 'Colleague'), 
  createTopic('t_c59', 'College'), createTopic('t_c60', 'Color'), createTopic('t_c61', 'Comfort'), createTopic('t_c62', 'Comic'), 
  createTopic('t_c63', 'Commitment'), createTopic('t_c64', 'Common Sense'), createTopic('t_c13', 'Communication'), createTopic('t_c14', 'Community'), 
  createTopic('t_c65', 'Company'), createTopic('t_c66', 'Comparison'), createTopic('t_c15', 'Compassion'), createTopic('t_c67', 'Competition'), 
  createTopic('t_c68', 'Complaining'), createTopic('t_c69', 'Completion'), createTopic('t_c70', 'Compromise'), createTopic('t_c16', 'Computers'), 
  createTopic('t_c71', 'Concentration'), createTopic('t_c17', 'Confidence'), createTopic('t_c72', 'Conflict'), createTopic('t_c24', 'Confusion'), 
  createTopic('t_c73', 'Connection'), createTopic('t_c74', 'Conscience'), createTopic('t_c75', 'Consciousness'), createTopic('t_c76', 'Consistency'), 
  createTopic('t_c77', 'Constitution'), createTopic('t_c78', 'Consulting'), createTopic('t_c79', 'Contentment'), createTopic('t_c80', 'Control'), 
  createTopic('t_c81', 'Conversation'), createTopic('t_c82', 'Cooking'), createTopic('t_c18', 'Cool'), createTopic('t_c83', 'Cooperation'), 
  createTopic('t_c84', 'Corporate'), createTopic('t_c85', 'Corruption'), createTopic('t_c19', 'Courage'), createTopic('t_c86', 'Courtesy'), 
  createTopic('t_c87', 'Cowardice'), createTopic('t_c88', 'Coworker'), createTopic('t_c89', 'Creation'), createTopic('t_c20', 'Creativity'), 
  createTopic('t_c90', 'Crime'), createTopic('t_c91', 'Criticism'), createTopic('t_c92', 'Cry'), createTopic('t_c21', 'Culture'), 
  createTopic('t_c93', 'Curiosity'), createTopic('t_c94', 'Customer Service'), createTopic('t_c95', 'Cute'), createTopic('t_c96', 'Cynicism'),
  createTopic('t_c97', 'Capitalism'), createTopic('t_c98', 'Communism'), createTopic('t_c99', 'Confucianism'),

  // D
  createTopic('t_d1', 'Dad'), createTopic('t_d14', 'Daily'), createTopic('t_d2', 'Dance'), createTopic('t_d15', 'Danger'), 
  createTopic('t_d16', 'Darkness'), createTopic('t_d17', 'Data'), createTopic('t_d3', 'Dating'), createTopic('t_d18', 'Daughter'), 
  createTopic('t_d19', 'Dawn'), createTopic('t_d20', 'Day'), createTopic('t_d13', 'Deadline'), createTopic('t_d4', 'Death'), 
  createTopic('t_d21', 'Debate'), createTopic('t_d22', 'Debt'), createTopic('t_d23', 'December'), createTopic('t_d24', 'Deception'), 
  createTopic('t_d5', 'Decision'), createTopic('t_d25', 'Dedication'), createTopic('t_d26', 'Defeat'), createTopic('t_d27', 'Delay'), 
  createTopic('t_d28', 'Delegation'), createTopic('t_d29', 'Delight'), createTopic('t_d30', 'Democracy'), createTopic('t_d31', 'Denial'), 
  createTopic('t_d12', 'Depression'), createTopic('t_d32', 'Desert'), createTopic('t_d6', 'Design'), createTopic('t_d33', 'Desire'), 
  createTopic('t_d34', 'Despair'), createTopic('t_d7', 'Destiny'), createTopic('t_d8', 'Determination'), createTopic('t_d35', 'Development'), 
  createTopic('t_d36', 'Devil'), createTopic('t_d37', 'Devotion'), createTopic('t_d9', 'Diet'), createTopic('t_d38', 'Difference'), 
  createTopic('t_d39', 'Difficulty'), createTopic('t_d40', 'Dignity'), createTopic('t_d41', 'Diligence'), createTopic('t_d42', 'Dinner'), 
  createTopic('t_d43', 'Direction'), createTopic('t_d44', 'Director'), createTopic('t_d45', 'Disappointment'), createTopic('t_d10', 'Discipline'), 
  createTopic('t_d46', 'Discovery'), createTopic('t_d47', 'Discussion'), createTopic('t_d48', 'Disease'), createTopic('t_d49', 'Distance'), 
  createTopic('t_d50', 'Diversity'), createTopic('t_d51', 'Divine'), createTopic('t_d52', 'Divorce'), createTopic('t_d53', 'Doctor'), 
  createTopic('t_d54', 'Dog'), createTopic('t_d55', 'Doing'), createTopic('t_d56', 'Dollar'), createTopic('t_d57', 'Doubt'), 
  createTopic('t_d58', 'Drama'), createTopic('t_d59', 'Drawing'), createTopic('t_d11', 'Dreams'), createTopic('t_d60', 'Dress'), 
  createTopic('t_d61', 'Drink'), createTopic('t_d62', 'Drive'), createTopic('t_d63', 'Dusk'), createTopic('t_d64', 'Duty'),
  createTopic('t_d65', 'Determinism'), createTopic('t_d66', 'Dualism'),

  // E
  createTopic('t_e17', 'Earth'), createTopic('t_e1', 'Easter'), createTopic('t_e18', 'Eating'), createTopic('t_e2', 'Ecology'), 
  createTopic('t_e3', 'Economics'), createTopic('t_e4', 'Education'), createTopic('t_e5', 'Effort'), createTopic('t_e6', 'Ego'), 
  createTopic('t_e19', 'Election'), createTopic('t_e20', 'Elegance'), createTopic('t_e21', 'Email'), createTopic('t_e22', 'Embarrassment'), 
  createTopic('t_e7', 'Emotions'), createTopic('t_e23', 'Empathy'), createTopic('t_e13', 'Employee'), createTopic('t_e24', 'Empowerment'), 
  createTopic('t_e25', 'Empty'), createTopic('t_e26', 'Endurance'), createTopic('t_e27', 'Enemies'), createTopic('t_e12', 'Energy'), 
  createTopic('t_e28', 'Engagement'), createTopic('t_e29', 'Engineering'), createTopic('t_e30', 'Enjoyment'), createTopic('t_e31', 'Entertainment'), 
  createTopic('t_e32', 'Enthusiasm'), createTopic('t_e14', 'Entrepreneur'), createTopic('t_e8', 'Environment'), createTopic('t_e33', 'Envy'), 
  createTopic('t_e9', 'Equality'), createTopic('t_e34', 'Error'), createTopic('t_e35', 'Escape'), createTopic('t_e36', 'Eternity'), 
  createTopic('t_e37', 'Ethics'), createTopic('t_e38', 'Euphoria'), createTopic('t_e15', 'Evening'), createTopic('t_e39', 'Event'), 
  createTopic('t_e40', 'Everything'), createTopic('t_e41', 'Evil'), createTopic('t_e42', 'Evolution'), createTopic('t_e10', 'Excellence'), 
  createTopic('t_e16', 'Excitement'), createTopic('t_e43', 'Excuses'), createTopic('t_e44', 'Exercise'), createTopic('t_e45', 'Existence'), 
  createTopic('t_e46', 'Expectation'), createTopic('t_e11', 'Experience'), createTopic('t_e47', 'Experiment'), createTopic('t_e48', 'Expert'), 
  createTopic('t_e49', 'Exploration'), createTopic('t_e50', 'Expression'), createTopic('t_e51', 'Eyes'),
  createTopic('t_e52', 'Eulogy'), createTopic('t_e53', 'Existentialism'), createTopic('t_e54', 'Empiricism'), createTopic('t_e55', 'Egoism'),

  // F
  createTopic('t_f17', 'Face'), createTopic('t_f18', 'Facts'), createTopic('t_f1', 'Failure'), createTopic('t_f19', 'Fairness'), 
  createTopic('t_f2', 'Faith'), createTopic('t_f20', 'Fake'), createTopic('t_f21', 'Fall'), createTopic('t_f22', 'Fame'), 
  createTopic('t_f3', 'Family'), createTopic('t_f4', 'Famous'), createTopic('t_f23', 'Fantasy'), createTopic('t_f24', 'Farming'), 
  createTopic('t_f25', 'Fashion'), createTopic('t_f26', 'Fate'), createTopic('t_f27', 'Father'), createTopic('t_f28', 'Fatigue'), 
  createTopic('t_f5', 'Fear'), createTopic('t_f29', 'February'), createTopic('t_f30', 'Feedback'), createTopic('t_f31', 'Feelings'), 
  createTopic('t_f32', 'Fiction'), createTopic('t_f33', 'Fight'), createTopic('t_f34', 'Film'), createTopic('t_f6', 'Finance'), 
  createTopic('t_f35', 'Fire'), createTopic('t_f7', 'Fitness'), createTopic('t_f8', 'Flowers'), createTopic('t_f36', 'Flying'), 
  createTopic('t_f15', 'Focus'), createTopic('t_f37', 'Fog'), createTopic('t_f9', 'Food'), createTopic('t_f38', 'Football'), 
  createTopic('t_f39', 'Forest'), createTopic('t_f40', 'Forever'), createTopic('t_f10', 'Forgiveness'), createTopic('t_f11', 'Freedom'), 
  createTopic('t_f14', 'Friday'), createTopic('t_f12', 'Friendship'), createTopic('t_f41', 'Frustration'), createTopic('t_f42', 'Fun'), 
  createTopic('t_f13', 'Funny'), createTopic('t_f16', 'Future'),
  createTopic('t_f43', 'Funeral'), createTopic('t_f44', 'Father\'s Day'), createTopic('t_f45', 'Fatalism'),

  // G
  createTopic('t_g13', 'Gambling'), createTopic('t_g14', 'Game'), createTopic('t_g1', 'Gardening'), createTopic('t_g2', 'Generosity'), 
  createTopic('t_g3', 'Genius'), createTopic('t_g15', 'Gentleman'), createTopic('t_g16', 'Geography'), createTopic('t_g17', 'Getting Old'), 
  createTopic('t_g18', 'Ghost'), createTopic('t_g19', 'Gift'), createTopic('t_g20', 'Girl'), createTopic('t_g21', 'Girlfriend'), 
  createTopic('t_g22', 'Giving'), createTopic('t_g23', 'Global Warming'), createTopic('t_g24', 'Glory'), createTopic('t_g13', 'Goals'), 
  createTopic('t_g4', 'God'), createTopic('t_g25', 'Gold'), createTopic('t_g26', 'Golf'), createTopic('t_g5', 'Good'), 
  createTopic('t_g27', 'Goodbye'), createTopic('t_g28', 'Gossip'), createTopic('t_g6', 'Government'), createTopic('t_g29', 'Grace'), 
  createTopic('t_g7', 'Graduation'), createTopic('t_g30', 'Grandparents'), createTopic('t_g8', 'Gratitude'), createTopic('t_g31', 'Gravity'), 
  createTopic('t_g9', 'Greatness'), createTopic('t_g32', 'Greed'), createTopic('t_g33', 'Green'), createTopic('t_g10', 'Grief'), 
  createTopic('t_g11', 'Growth'), createTopic('t_g34', 'Guest'), createTopic('t_g35', 'Guidance'), createTopic('t_g36', 'Guilt'), 
  createTopic('t_g37', 'Guitar'), createTopic('t_g12', 'Gym'),

  // H
  createTopic('t_h1', 'Habit'), createTopic('t_h15', 'Hair'), createTopic('t_h12', 'Halloween'), createTopic('t_h2', 'Happiness'), 
  createTopic('t_h16', 'Hard Work'), createTopic('t_h17', 'Harmony'), createTopic('t_h13', 'Hate'), createTopic('t_h18', 'Healing'), 
  createTopic('t_h3', 'Health'), createTopic('t_h19', 'Hearing'), createTopic('t_h11', 'Heart'), createTopic('t_h20', 'Heaven'), 
  createTopic('t_h21', 'Hell'), createTopic('t_h22', 'Help'), createTopic('t_h23', 'Hero'), createTopic('t_h24', 'Hiking'), 
  createTopic('t_h25', 'Hiring'), createTopic('t_h4', 'History'), createTopic('t_h26', 'Hobby'), createTopic('t_h27', 'Holiday'), 
  createTopic('t_h28', 'Holy'), createTopic('t_h5', 'Home'), createTopic('t_h29', 'Homesickness'), createTopic('t_h6', 'Honesty'), 
  createTopic('t_h30', 'Honor'), createTopic('t_h7', 'Hope'), createTopic('t_h31', 'Horror'), createTopic('t_h32', 'Horse'), 
  createTopic('t_h33', 'Hospital'), createTopic('t_h34', 'Hospitality'), createTopic('t_h35', 'Hour'), createTopic('t_h36', 'House'), 
  createTopic('t_h37', 'Hug'), createTopic('t_h8', 'Humanity'), createTopic('t_h38', 'Humble'), createTopic('t_h39', 'Humiliation'), 
  createTopic('t_h9', 'Humor'), createTopic('t_h40', 'Hunger'), createTopic('t_h41', 'Hunting'), createTopic('t_h10', 'Husband'), 
  createTopic('t_h14', 'Hustle'), createTopic('t_h42', 'Hysteria'),
  createTopic('t_h43', 'Hedonism'), createTopic('t_h44', 'Humanism'),

  // I
  createTopic('t_i13', 'Ice Cream'), createTopic('t_i1', 'Ideas'), createTopic('t_i2', 'Identity'), createTopic('t_i14', 'Ignorance'), 
  createTopic('t_i15', 'Illness'), createTopic('t_i3', 'Imagination'), createTopic('t_i16', 'Impact'), createTopic('t_i17', 'Imperfection'), 
  createTopic('t_i4', 'Impossible'), createTopic('t_i18', 'Improvement'), createTopic('t_i19', 'Incentive'), createTopic('t_i5', 'Independence'), 
  createTopic('t_i20', 'Indifference'), createTopic('t_i21', 'Individuality'), createTopic('t_i22', 'Industry'), createTopic('t_i23', 'Infatuation'), 
  createTopic('t_i24', 'Influence'), createTopic('t_i25', 'Information'), createTopic('t_i6', 'Innovation'), createTopic('t_i26', 'Insanity'), 
  createTopic('t_i27', 'Insight'), createTopic('t_i7', 'Inspirational'), createTopic('t_i28', 'Instinct'), createTopic('t_i8', 'Integrity'), 
  createTopic('t_i9', 'Intelligence'), createTopic('t_i29', 'Interest'), createTopic('t_i10', 'Internet'), createTopic('t_i30', 'Internship'), 
  createTopic('t_i12', 'Interview'), createTopic('t_i11', 'Intuition'), createTopic('t_i31', 'Invention'), createTopic('t_i32', 'Investment'), 
  createTopic('t_i33', 'Irony'), createTopic('t_i34', 'Irritation'), createTopic('t_i35', 'Island'), createTopic('t_i36', 'Isolation'),
  createTopic('t_i37', 'Idealism'),

  // J
  createTopic('t_j6', 'January'), createTopic('t_j7', 'Jazz'), createTopic('t_j1', 'Jealousy'), createTopic('t_j8', 'Jesus'), 
  createTopic('t_j9', 'Jewelry'), createTopic('t_j2', 'Job'), createTopic('t_j10', 'Joke'), createTopic('t_j11', 'Journalism'), 
  createTopic('t_j3', 'Journey'), createTopic('t_j4', 'Joy'), createTopic('t_j12', 'Judge'), createTopic('t_j13', 'Judgment'), 
  createTopic('t_j14', 'July'), createTopic('t_j15', 'June'), createTopic('t_j5', 'Justice'),

  // K
  createTopic('t_k3', 'Karma'), createTopic('t_k4', 'Kids'), createTopic('t_k1', 'Kindness'), createTopic('t_k5', 'King'), 
  createTopic('t_k6', 'Kiss'), createTopic('t_k7', 'Kitchen'), createTopic('t_k8', 'Kites'), createTopic('t_k2', 'Knowledge'),

  // L
  createTopic('t_l13', 'Labor Day'), createTopic('t_l14', 'Lake'), createTopic('t_l1', 'Language'), createTopic('t_l15', 'Late'), 
  createTopic('t_l2', 'Laughter'), createTopic('t_l16', 'Law'), createTopic('t_l17', 'Lawyer'), createTopic('t_l18', 'Laziness'), 
  createTopic('t_l3', 'Leadership'), createTopic('t_l4', 'Learning'), createTopic('t_l19', 'Legacy'), createTopic('t_l5', 'Legal'), 
  createTopic('t_l20', 'Legend'), createTopic('t_l21', 'Leisure'), createTopic('t_l22', 'Lesson'), createTopic('t_l23', 'Letters'), 
  createTopic('t_l6', 'Liberty'), createTopic('t_l24', 'Library'), createTopic('t_l25', 'Lies'), createTopic('t_l7', 'Life'), 
  createTopic('t_l26', 'Light'), createTopic('t_l27', 'Limits'), createTopic('t_l28', 'Listening'), createTopic('t_l8', 'Literature'), 
  createTopic('t_l29', 'Logic'), createTopic('t_l30', 'London'), createTopic('t_l12', 'Loneliness'), createTopic('t_l31', 'Loss'), 
  createTopic('t_l9', 'Love'), createTopic('t_l10', 'Loyalty'), createTopic('t_l11', 'Luck'), createTopic('t_l32', 'Lunch'), 
  createTopic('t_l33', 'Lust'), createTopic('t_l34', 'Luxury'),
  createTopic('t_l35', 'Liberalism'),

  // M
  createTopic('t_m20', 'Machine'), createTopic('t_m21', 'Madness'), createTopic('t_m1', 'Magic'), createTopic('t_m22', 'Makeup'), 
  createTopic('t_m23', 'Man'), createTopic('t_m16', 'Management'), createTopic('t_m24', 'Manners'), createTopic('t_m25', 'March'), 
  createTopic('t_m26', 'Marketing'), createTopic('t_m2', 'Marriage'), createTopic('t_m27', 'Mars'), createTopic('t_m28', 'Mask'), 
  createTopic('t_m29', 'Math'), createTopic('t_m30', 'May'), createTopic('t_m31', 'Meaning'), createTopic('t_m3', 'Medical'), 
  createTopic('t_m32', 'Medicine'), createTopic('t_m4', 'Meditation'), createTopic('t_m17', 'Meeting'), createTopic('t_m18', 'Melancholy'), 
  createTopic('t_m5', 'Memories'), createTopic('t_m6', 'Men'), createTopic('t_m33', 'Mental Health'), createTopic('t_m34', 'Mentor'), 
  createTopic('t_m35', 'Merger'), createTopic('t_m36', 'Mercy'), createTopic('t_m37', 'Midnight'), createTopic('t_m38', 'Military'), 
  createTopic('t_m39', 'Millionaire'), createTopic('t_m7', 'Mind'), createTopic('t_m8', 'Mindfulness'), createTopic('t_m40', 'Mindset'), 
  createTopic('t_m41', 'Miracle'), createTopic('t_m42', 'Mirror'), createTopic('t_m43', 'Misery'), createTopic('t_m44', 'Mission'), 
  createTopic('t_m9', 'Mistakes'), createTopic('t_m45', 'Model'), createTopic('t_m46', 'Moderation'), createTopic('t_m47', 'Modern'), 
  createTopic('t_m48', 'Modesty'), createTopic('t_m10', 'Mom'), createTopic('t_m49', 'Moment'), createTopic('t_m19', 'Monday'), 
  createTopic('t_m11', 'Money'), createTopic('t_m50', 'Monster'), createTopic('t_m51', 'Month'), createTopic('t_m52', 'Moon'), 
  createTopic('t_m12', 'Morning'), createTopic('t_m13', 'Motivation'), createTopic('t_m53', 'Motorcycle'), createTopic('t_m54', 'Mountain'), 
  createTopic('t_m55', 'Mouse'), createTopic('t_m14', 'Movies'), createTopic('t_m56', 'Moving On'), createTopic('t_m57', 'Murder'), 
  createTopic('t_m58', 'Museum'), createTopic('t_m15', 'Music'), createTopic('t_m59', 'Mystery'), createTopic('t_m60', 'Myth'),
  createTopic('t_m61', 'Mother\'s Day'), createTopic('t_m62', 'Materialism'), createTopic('t_m63', 'Mysticism'), createTopic('t_m64', 'Metaphysics'),

  // N
  createTopic('t_n1', 'Nature'), createTopic('t_n7', 'Navy'), createTopic('t_n8', 'Neglect'), createTopic('t_n9', 'Negotiation'), 
  createTopic('t_n10', 'Neighbor'), createTopic('t_n5', 'Networking'), createTopic('t_n2', 'New Year'), createTopic('t_n11', 'News'), 
  createTopic('t_n3', 'Night'), createTopic('t_n12', 'Nightmare'), createTopic('t_n13', 'Noon'), createTopic('t_n14', 'Normal'), 
  createTopic('t_n6', 'Nostalgia'), createTopic('t_n15', 'November'), createTopic('t_n16', 'Now'), createTopic('t_n17', 'Nurse'), 
  createTopic('t_n4', 'Nutrition'),
  createTopic('t_n18', 'Nihilism'),

  // O
  createTopic('t_o5', 'Obedience'), createTopic('t_o6', 'Objective'), createTopic('t_o7', 'Observation'), createTopic('t_o8', 'Obsession'), 
  createTopic('t_o1', 'Ocean'), createTopic('t_o9', 'October'), createTopic('t_o4', 'Office'), createTopic('t_o10', 'Oil'), 
  createTopic('t_o11', 'Old Age'), createTopic('t_o12', 'Opinion'), createTopic('t_o2', 'Opportunity'), createTopic('t_o3', 'Optimism'), 
  createTopic('t_o13', 'Orange'), createTopic('t_o14', 'Order'), createTopic('t_o15', 'Organization'), createTopic('t_o16', 'Originality'),
  createTopic('t_o17', 'Ontology'),

  // P
  createTopic('t_p1', 'Pain'), createTopic('t_p22', 'Painting'), createTopic('t_p23', 'Panic'), createTopic('t_p24', 'Paradise'), 
  createTopic('t_p2', 'Parenting'), createTopic('t_p25', 'Paris'), createTopic('t_p26', 'Party'), createTopic('t_p3', 'Passion'), 
  createTopic('t_p27', 'Past'), createTopic('t_p4', 'Patience'), createTopic('t_p5', 'Patriotism'), createTopic('t_p6', 'Peace'), 
  createTopic('t_p7', 'People'), createTopic('t_p28', 'Perception'), createTopic('t_p29', 'Performance'), createTopic('t_p8', 'Perseverance'), 
  createTopic('t_p30', 'Persistence'), createTopic('t_p18', 'Perspective'), createTopic('t_p19', 'Pessimism'), createTopic('t_p9', 'Pet'), 
  createTopic('t_p10', 'Philosophy'), createTopic('t_p11', 'Photography'), createTopic('t_p31', 'Physics'), createTopic('t_p32', 'Piano'), 
  createTopic('t_p33', 'Pilot'), createTopic('t_p34', 'Pity'), createTopic('t_p35', 'Pizza'), createTopic('t_p36', 'Planning'), 
  createTopic('t_p37', 'Play'), createTopic('t_p38', 'Pleasure'), createTopic('t_p12', 'Poetry'), createTopic('t_p39', 'Police'), 
  createTopic('t_p13', 'Politics'), createTopic('t_p40', 'Pollution'), createTopic('t_p41', 'Poor'), createTopic('t_p42', 'Popularity'), 
  createTopic('t_p14', 'Positive'), createTopic('t_p43', 'Possibility'), createTopic('t_p44', 'Potential'), createTopic('t_p45', 'Poverty'), 
  createTopic('t_p15', 'Power'), createTopic('t_p46', 'Practice'), createTopic('t_p47', 'Praise'), createTopic('t_p16', 'Prayer'), 
  createTopic('t_p48', 'Pregnancy'), createTopic('t_p49', 'Prejudice'), createTopic('t_p50', 'Present'), createTopic('t_p51', 'Presentation'), 
  createTopic('t_p52', 'President'), createTopic('t_p53', 'Pressure'), createTopic('t_p54', 'Pride'), createTopic('t_p55', 'Privacy'), 
  createTopic('t_p56', 'Problem'), createTopic('t_p57', 'Problem Solving'), createTopic('t_p58', 'Process'), createTopic('t_p20', 'Productivity'), 
  createTopic('t_p59', 'Profession'), createTopic('t_p60', 'Professionalism'), createTopic('t_p61', 'Profit'), createTopic('t_p62', 'Progress'), 
  createTopic('t_p63', 'Project'), createTopic('t_p64', 'Promise'), createTopic('t_p21', 'Promotion'), createTopic('t_p65', 'Propaganda'), 
  createTopic('t_p66', 'Prosperity'), createTopic('t_p67', 'Psychology'), createTopic('t_p68', 'Punctuality'), createTopic('t_p69', 'Punishment'), 
  createTopic('t_p70', 'Puppy'), createTopic('t_p17', 'Purpose'),
  createTopic('t_p71', 'Pantheism'), createTopic('t_p72', 'Platonism'), createTopic('t_p73', 'Pragmatism'),

  // Q
  createTopic('t_q1', 'Quality'), createTopic('t_q2', 'Questions'), createTopic('t_q3', 'Quiet'), createTopic('t_q4', 'Quotes'),

  // R
  createTopic('t_r12', 'Race'), createTopic('t_r13', 'Radio'), createTopic('t_r14', 'Rage'), createTopic('t_r1', 'Rain'), 
  createTopic('t_r15', 'Rainbow'), createTopic('t_r16', 'Reading'), createTopic('t_r2', 'Reality'), createTopic('t_r17', 'Reason'), 
  createTopic('t_r18', 'Rebellion'), createTopic('t_r19', 'Recovery'), createTopic('t_r20', 'Recruitment'), createTopic('t_r21', 'Red'), 
  createTopic('t_r3', 'Regret'), createTopic('t_r22', 'Rejection'), createTopic('t_r4', 'Relationship'), createTopic('t_r23', 'Relaxation'), 
  createTopic('t_r24', 'Reliability'), createTopic('t_r25', 'Relief'), createTopic('t_r5', 'Religion'), createTopic('t_r26', 'Remorse'), 
  createTopic('t_r27', 'Reputation'), createTopic('t_r28', 'Research'), createTopic('t_r29', 'Resentment'), createTopic('t_r30', 'Resilience'), 
  createTopic('t_r11', 'Resignation'), createTopic('t_r31', 'Resolution'), createTopic('t_r6', 'Respect'), createTopic('t_r7', 'Responsibility'), 
  createTopic('t_r32', 'Rest'), createTopic('t_r33', 'Result'), createTopic('t_r34', 'Resume'), createTopic('t_r8', 'Retirement'), 
  createTopic('t_r35', 'Revenge'), createTopic('t_r36', 'Revolution'), createTopic('t_r37', 'Rich'), createTopic('t_r9', 'Risk'), 
  createTopic('t_r38', 'River'), createTopic('t_r39', 'Road'), createTopic('t_r40', 'Rock'), createTopic('t_r10', 'Romantic'), 
  createTopic('t_r41', 'Routine'), createTopic('t_r42', 'Royalty'), createTopic('t_r43', 'Rules'), createTopic('t_r44', 'Rumor'), 
  createTopic('t_r45', 'Running'),
  createTopic('t_r46', 'Rationalism'), createTopic('t_r47', 'Realism'),

  // S
  createTopic('t_s1', 'Sad'), createTopic('t_s30', 'Safety'), createTopic('t_s31', 'Sailing'), createTopic('t_s32', 'Saint'), 
  createTopic('t_s33', 'Salary'), createTopic('t_s34', 'Sales'), createTopic('t_s35', 'Sarcasm'), createTopic('t_s36', 'Satisfaction'), 
  createTopic('t_s22', 'Saturday'), createTopic('t_s37', 'Saving'), createTopic('t_s38', 'Schedule'), createTopic('t_s39', 'School'), 
  createTopic('t_s2', 'Science'), createTopic('t_s40', 'Sea'), createTopic('t_s41', 'Season'), createTopic('t_s42', 'Second'), 
  createTopic('t_s43', 'Secret'), createTopic('t_s44', 'Security'), createTopic('t_s3', 'Self'), createTopic('t_s23', 'Self-Care'), 
  createTopic('t_s45', 'Self-Esteem'), createTopic('t_s46', 'Selfish'), createTopic('t_s47', 'Selling'), createTopic('t_s48', 'September'), 
  createTopic('t_s4', 'Service'), createTopic('t_s49', 'Sex'), createTopic('t_s50', 'Shadow'), createTopic('t_s51', 'Shame'), 
  createTopic('t_s52', 'Sharing'), createTopic('t_s53', 'Shopping'), createTopic('t_s54', 'Short'), createTopic('t_s55', 'Shyness'), 
  createTopic('t_s56', 'Sick'), createTopic('t_s5', 'Silence'), createTopic('t_s57', 'Silly'), createTopic('t_s6', 'Simplicity'), 
  createTopic('t_s58', 'Sin'), createTopic('t_s59', 'Sincerity'), createTopic('t_s60', 'Singing'), createTopic('t_s61', 'Sister'), 
  createTopic('t_s62', 'Skill'), createTopic('t_s63', 'Skin'), createTopic('t_s64', 'Sky'), createTopic('t_s7', 'Sleep'), 
  createTopic('t_s65', 'Smart'), createTopic('t_s8', 'Smile'), createTopic('t_s66', 'Smoke'), createTopic('t_s67', 'Snow'), 
  createTopic('t_s68', 'Soccer'), createTopic('t_s69', 'Social Media'), createTopic('t_s9', 'Society'), createTopic('t_s70', 'Soldier'), 
  createTopic('t_s71', 'Solution'), createTopic('t_s72', 'Son'), createTopic('t_s73', 'Song'), 
  createTopic('t_s11', 'Soul'), createTopic('t_s12', 'Space'), createTopic('t_s74', 'Speech'), createTopic('t_s75', 'Speed'), 
  createTopic('t_s76', 'Spending'), createTopic('t_s77', 'Spider'), createTopic('t_s78', 'Spirit'), createTopic('t_s21', 'Spirituality'), 
  createTopic('t_s13', 'Sports'), createTopic('t_s24', 'Spring'), createTopic('t_s79', 'Stability'), createTopic('t_s80', 'Staff'), 
  createTopic('t_s81', 'Stage'), createTopic('t_s82', 'Stars'), createTopic('t_s25', 'Startup'), createTopic('t_s83', 'Statistics'), 
  createTopic('t_s84', 'Storm'), createTopic('t_s85', 'Story'), createTopic('t_s26', 'Strategy'), createTopic('t_s14', 'Strength'), 
  createTopic('t_s15', 'Stress'), createTopic('t_s86', 'Struggle'), createTopic('t_s87', 'Student'), createTopic('t_s88', 'Stupidity'), 
  createTopic('t_s89', 'Style'), createTopic('t_s16', 'Success'), createTopic('t_s17', 'Suffering'), createTopic('t_s90', 'Sugar'), 
  createTopic('t_s18', 'Summer'), createTopic('t_s19', 'Sun'), createTopic('t_s27', 'Sunday'), createTopic('t_s28', 'Sunrise'), 
  createTopic('t_s29', 'Sunset'), createTopic('t_s91', 'Supernatural'), createTopic('t_s92', 'Support'), createTopic('t_s93', 'Surprise'), 
  createTopic('t_s94', 'Survival'), createTopic('t_s95', 'Sweet'), createTopic('t_s96', 'Swimming'), createTopic('t_s20', 'Sympathy'), 
  createTopic('t_s97', 'System'),
  createTopic('t_s98', 'Stoicism'), createTopic('t_s99', 'Skepticism'), createTopic('t_s100', 'Socialism'), createTopic('t_s101', 'Spirituality'),

  // T
  createTopic('t_t1', 'Talent'), createTopic('t_t15', 'Target'), createTopic('t_t16', 'Tax'), createTopic('t_t17', 'Tea'), 
  createTopic('t_t2', 'Teacher'), createTopic('t_t18', 'Teaching'), createTopic('t_t19', 'Team'), createTopic('t_t3', 'Teamwork'), 
  createTopic('t_t20', 'Tears'), createTopic('t_t4', 'Technology'), createTopic('t_t5', 'Teen'), createTopic('t_t21', 'Telephone'), 
  createTopic('t_t22', 'Television'), createTopic('t_t23', 'Temper'), createTopic('t_t24', 'Temptation'), createTopic('t_t25', 'Tennis'), 
  createTopic('t_t26', 'Terror'), createTopic('t_t6', 'Thankful'), createTopic('t_t12', 'Thanksgiving'), createTopic('t_t27', 'Theater'), 
  createTopic('t_t28', 'Theory'), createTopic('t_t29', 'Thinking'), createTopic('t_t30', 'Thought'), createTopic('t_t13', 'Thursday'), 
  createTopic('t_t7', 'Time'), createTopic('t_t31', 'Time Management'), createTopic('t_t32', 'Tired'), createTopic('t_t33', 'Today'), 
  createTopic('t_t34', 'Toddler'), createTopic('t_t8', 'Tolerance'), createTopic('t_t35', 'Tomorrow'), createTopic('t_t36', 'Tonight'), 
  createTopic('t_t37', 'Tools'), createTopic('t_t38', 'Touch'), createTopic('t_t39', 'Tourism'), createTopic('t_t40', 'Tradition'), 
  createTopic('t_t41', 'Traffic'), createTopic('t_t42', 'Tragedy'), createTopic('t_t43', 'Training'), createTopic('t_t44', 'Transformation'), 
  createTopic('t_t9', 'Travel'), createTopic('t_t45', 'Trees'), createTopic('t_t46', 'Trend'), createTopic('t_t47', 'Trial'), 
  createTopic('t_t48', 'Trouble'), createTopic('t_t10', 'Trust'), createTopic('t_t11', 'Truth'), createTopic('t_t14', 'Tuesday'), 
  createTopic('t_t49', 'Twins'),
  createTopic('t_t50', 'Taoism'), createTopic('t_t51', 'Toast'), createTopic('t_t52', 'Theology'), createTopic('t_t53', 'Transcendentalism'),

  // U
  createTopic('t_u5', 'Ugly'), createTopic('t_u1', 'Uncertainty'), createTopic('t_u6', 'Unemployment'), createTopic('t_u2', 'Understanding'), 
  createTopic('t_u7', 'Unfair'), createTopic('t_u8', 'Unforgettable'), createTopic('t_u9', 'Unhappy'), createTopic('t_u10', 'Union'), 
  createTopic('t_u11', 'Unique'), createTopic('t_u3', 'Unity'), createTopic('t_u4', 'Universe'), createTopic('t_u12', 'University'), 
  createTopic('t_u13', 'Unknown'), createTopic('t_u14', 'Urban'),
  createTopic('t_u15', 'Utilitarianism'),

  // V
  createTopic('t_v1', 'Vacation'), createTopic('t_v2', 'Valentine'), createTopic('t_v7', 'Value'), createTopic('t_v3', 'Values'), 
  createTopic('t_v8', 'Vanity'), createTopic('t_v9', 'Variety'), createTopic('t_v10', 'Vegetarian'), createTopic('t_v11', 'Vehicle'), 
  createTopic('t_v4', 'Victory'), createTopic('t_v12', 'Video Games'), createTopic('t_v13', 'Violence'), createTopic('t_v5', 'Virtue'), 
  createTopic('t_v6', 'Vision'), createTopic('t_v14', 'Voice'), createTopic('t_v15', 'Volunteer'), createTopic('t_v16', 'Vote'), 
  createTopic('t_v17', 'Vulnerability'),

  // W
  createTopic('t_w16', 'Waiting'), createTopic('t_w17', 'Walking'), createTopic('t_w1', 'War'), createTopic('t_w18', 'Warmth'), 
  createTopic('t_w19', 'Warrior'), createTopic('t_w2', 'Water'), createTopic('t_w20', 'Weakness'), createTopic('t_w3', 'Wealth'), 
  createTopic('t_w21', 'Weather'), createTopic('t_w22', 'Website'), createTopic('t_w4', 'Wedding'), createTopic('t_w13', 'Wednesday'), 
  createTopic('t_w5', 'Weekend'), createTopic('t_w23', 'Welcome'), createTopic('t_w24', 'Wellness'), createTopic('t_w25', 'Wild'), 
  createTopic('t_w26', 'Willpower'), createTopic('t_w27', 'Wind'), createTopic('t_w28', 'Wine'), createTopic('t_w6', 'Winning'), 
  createTopic('t_w14', 'Winter'), createTopic('t_w7', 'Wisdom'), createTopic('t_w29', 'Wish'), createTopic('t_w30', 'Witness'), 
  createTopic('t_w8', 'Women'), createTopic('t_w31', 'Wonder'), createTopic('t_w9', 'Work'), createTopic('t_w32', 'Work-Life Balance'), 
  createTopic('t_w15', 'Workplace'), createTopic('t_w10', 'World'), createTopic('t_w12', 'Worry'), createTopic('t_w33', 'Worship'), 
  createTopic('t_w34', 'Worth'), createTopic('t_w35', 'Wound'), createTopic('t_w36', 'Wrath'), createTopic('t_w11', 'Writing'), 
  createTopic('t_w37', 'Wrong'),

  // X
  createTopic('t_x1', 'Xmas'),

  // Y
  createTopic('t_y1', 'Youth'), createTopic('t_y2', 'Yoga'), createTopic('t_y3', 'Yesterday'), createTopic('t_y4', 'Year'),
  createTopic('t_y5', 'Yellow'), createTopic('t_y6', 'Yes'),

  // Z
  createTopic('t_z1', 'Zeal'), createTopic('t_z2', 'Zen'), createTopic('t_z3', 'Zero'), createTopic('t_z4', 'Zoo')
];

export const POPULAR_AUTHORS: Author[] = [
  // A
  createAuthor('a1', 'A. A. Milne'), createAuthor('a24', 'Aaron Paul'), createAuthor('a25', 'Aaron Sorkin'), createAuthor('a26', 'Abigail Adams'), 
  createAuthor('a2', 'Abraham Lincoln'), createAuthor('a27', 'Adam Driver'), createAuthor('a28', 'Adam Levine'), createAuthor('a29', 'Adam Sandler'), 
  createAuthor('a3', 'Adam Smith'), createAuthor('a30', 'Adele'), createAuthor('a31', 'Aesop'), createAuthor('a4', 'Agatha Christie'), 
  createAuthor('a32', 'Al Gore'), createAuthor('a33', 'Al Pacino'), createAuthor('a34', 'Alan Alda'), createAuthor('a35', 'Alan Rickman'), 
  createAuthor('a36', 'Alan Turing'), createAuthor('a5', 'Alan Watts'), createAuthor('a6', 'Albert Camus'), createAuthor('a7', 'Albert Einstein'), 
  createAuthor('a37', 'Albert Schweitzer'), createAuthor('a8', 'Aldous Huxley'), createAuthor('a38', 'Alec Baldwin'), createAuthor('a39', 'Alex Trebek'), 
  createAuthor('a9', 'Alexander the Great'), createAuthor('a40', 'Alexander Hamilton'), createAuthor('a41', 'Alfred Hitchcock'), 
  createAuthor('a42', 'Alfred Lord Tennyson'), createAuthor('a43', 'Alice Cooper'), createAuthor('a10', 'Alice Walker'), createAuthor('a44', 'Alicia Keys'), 
  createAuthor('a45', 'Alicia Vikander'), createAuthor('a46', 'Allen Ginsberg'), createAuthor('a11', 'Amelia Earhart'), createAuthor('a47', 'Amy Poehler'), 
  createAuthor('a48', 'Amy Schumer'), createAuthor('a49', 'Amy Winehouse'), createAuthor('a12', 'Anais Nin'), createAuthor('a50', 'Anderson Cooper'), 
  createAuthor('a51', 'Andrew Carnegie'), createAuthor('a52', 'Andrew Jackson'), createAuthor('a53', 'Andy Murray'), createAuthor('a54', 'Andy Roddick'), 
  createAuthor('a13', 'Andy Warhol'), createAuthor('a55', 'Angela Merkel'), createAuthor('a14', 'Angelina Jolie'), createAuthor('a56', 'Anna Kendrick'), 
  createAuthor('a57', 'Anna Wintour'), createAuthor('a15', 'Anne Frank'), createAuthor('a58', 'Anne Hathaway'), createAuthor('a59', 'Ansel Adams'), 
  createAuthor('a16', 'Anthony Bourdain'), createAuthor('a60', 'Anthony Hopkins'), createAuthor('a17', 'Antoine de Saint-Exupery'), 
  createAuthor('a61', 'Antonio Banderas'), createAuthor('a62', 'Aretha Franklin'), createAuthor('a63', 'Ariana Grande'), createAuthor('a18', 'Aristotle'), 
  createAuthor('a64', 'Arnold Palmer'), createAuthor('a19', 'Arnold Schwarzenegger'), createAuthor('a65', 'Arthur Ashe'), createAuthor('a20', 'Arthur Conan Doyle'), 
  createAuthor('a66', 'Arthur Miller'), createAuthor('a21', 'Arthur Schopenhauer'), createAuthor('a67', 'Ashton Kutcher'), createAuthor('a22', 'Audrey Hepburn'), 
  createAuthor('a68', 'Auguste Rodin'), createAuthor('a69', 'Augustine of Hippo'), createAuthor('a70', 'Ayrton Senna'), createAuthor('a23', 'Ayn Rand'),
  
  createAuthor('b1', 'Babe Ruth'), createAuthor('b2', 'Barack Obama'), createAuthor('b3', 'Benjamin Disraeli'), createAuthor('b4', 'Benjamin Franklin'), 
  createAuthor('b5', 'Bertrand Russell'), createAuthor('b6', 'Beyonce'), createAuthor('b7', 'Bill Gates'), createAuthor('b8', 'Billie Holiday'), 
  createAuthor('b9', 'Blaise Pascal'), createAuthor('b10', 'Bob Dylan'), createAuthor('b11', 'Bob Marley'), createAuthor('b12', 'Booker T. Washington'), 
  createAuthor('b13', 'Brene Brown'), createAuthor('b14', 'Bruce Lee'), createAuthor('b15', 'Buddha'),
  
  createAuthor('c1', 'C. S. Lewis'), createAuthor('c2', 'Calvin Coolidge'), createAuthor('c3', 'Carl Jung'), createAuthor('c4', 'Carl Sagan'), 
  createAuthor('c5', 'Charles Bukowski'), createAuthor('c6', 'Charles Darwin'), createAuthor('c7', 'Charles Dickens'), createAuthor('c8', 'Charles M. Schulz'), 
  createAuthor('c9', 'Charlie Chaplin'), createAuthor('c10', 'Clint Eastwood'), createAuthor('c11', 'Coco Chanel'), createAuthor('c12', 'Confucius'),
  
  createAuthor('d1', 'Dalai Lama'), createAuthor('d2', 'Dale Carnegie'), createAuthor('d3', 'Dante Alighieri'), createAuthor('d4', 'David Bowie'), 
  createAuthor('d5', 'David Goggins'), createAuthor('d6', 'Deepak Chopra'), createAuthor('d7', 'Denzel Washington'), createAuthor('d8', 'Desmond Tutu'), 
  createAuthor('d9', 'Donald Trump'), createAuthor('d10', 'Dr. Seuss'), createAuthor('d11', 'Drake'), createAuthor('d12', 'Dwight D. Eisenhower'),
  
  createAuthor('e1', 'Earl Nightingale'), createAuthor('e2', 'Eckhart Tolle'), createAuthor('e3', 'Edgar Allan Poe'), createAuthor('e4', 'Eleanor Roosevelt'), 
  createAuthor('e5', 'Elizabeth Gilbert'), createAuthor('e6', 'Elon Musk'), createAuthor('e7', 'Elvis Presley'), createAuthor('e8', 'Emily Dickinson'), 
  createAuthor('e9', 'Epictetus'), createAuthor('e10', 'Ernest Hemingway'), createAuthor('e11', 'Estee Lauder'), createAuthor('e12', 'Euripides'),
  
  createAuthor('f1', 'F. Scott Fitzgerald'), createAuthor('f2', 'Francis Bacon'), createAuthor('f3', 'Frank Lloyd Wright'), createAuthor('f4', 'Frank Sinatra'), 
  createAuthor('f5', 'Franklin D. Roosevelt'), createAuthor('f6', 'Franz Kafka'), createAuthor('f7', 'Fred Rogers'), createAuthor('f8', 'Frederick Douglass'), 
  createAuthor('f9', 'Frida Kahlo'), createAuthor('f10', 'Friedrich Nietzsche'), createAuthor('f11', 'Fyodor Dostoevsky'),
  
  createAuthor('g1', 'Galileo Galilei'), createAuthor('g2', 'George Bernard Shaw'), createAuthor('g3', 'George Carlin'), createAuthor('g4', 'George Harrison'), 
  createAuthor('g5', 'George Lucas'), createAuthor('g6', 'George Orwell'), createAuthor('g7', 'George Washington'), createAuthor('g8', 'Goethe'), 
  createAuthor('g9', 'Gordon Ramsay'), createAuthor('g10', 'Groucho Marx'),
  
  createAuthor('h1', 'Harriet Tubman'), createAuthor('h2', 'Helen Keller'), createAuthor('h3', 'Henry David Thoreau'), createAuthor('h4', 'Henry Ford'), 
  createAuthor('h5', 'Heraclitus'), createAuthor('h6', 'Hermann Hesse'), createAuthor('h7', 'Hippocrates'), createAuthor('h8', 'Homer'), createAuthor('h9', 'Hunter S. Thompson'),
  
  createAuthor('i1', 'Ian McKellen'), createAuthor('i2', 'Immanuel Kant'), createAuthor('i3', 'Indira Gandhi'), createAuthor('i4', 'Isaac Asimov'), createAuthor('i5', 'Isaac Newton'),
  
  createAuthor('j1', 'J.K. Rowling'), createAuthor('j2', 'J.R.R. Tolkien'), createAuthor('j3', 'Jack Kerouac'), createAuthor('j4', 'Jack Ma'), createAuthor('j5', 'Jackie Robinson'), 
  createAuthor('j6', 'James Baldwin'), createAuthor('j7', 'James Dean'), createAuthor('j8', 'Jane Austen'), createAuthor('j9', 'Jay-Z'), createAuthor('j10', 'Jeff Bezos'), 
  createAuthor('j11', 'Jennifer Aniston'), createAuthor('j12', 'Jim Carrey'), createAuthor('j13', 'Jim Rohn'), createAuthor('j14', 'Jimi Hendrix'), 
  createAuthor('j15', 'John F. Kennedy'), createAuthor('j16', 'John Lennon'), createAuthor('j17', 'John Locke'), createAuthor('j18', 'John Muir'), 
  createAuthor('j19', 'John Steinbeck'), createAuthor('j20', 'John Wayne'), createAuthor('j21', 'Jordan Peterson'), createAuthor('j22', 'Judy Garland'), createAuthor('j23', 'Julia Child'),
  
  createAuthor('k1', 'Kanye West'), createAuthor('k2', 'Karl Lagerfeld'), createAuthor('k3', 'Karl Marx'), createAuthor('k4', 'Keanu Reeves'), 
  createAuthor('k5', 'Khalil Gibran'), createAuthor('k6', 'Kobe Bryant'), createAuthor('k7', 'Kurt Cobain'), createAuthor('k8', 'Kurt Vonnegut'), createAuthor('k9', 'Kevin Hart'),
  
  createAuthor('l1', 'Lady Gaga'), createAuthor('l2', 'Lao Tzu'), createAuthor('l3', 'LeBron James'), createAuthor('l4', 'Leo Tolstoy'), 
  createAuthor('l5', 'Leonardo da Vinci'), createAuthor('l6', 'Lewis Carroll'), createAuthor('l7', 'Lord Byron'), createAuthor('l8', 'Louis Pasteur'), createAuthor('l9', 'Louise Hay'),
  
  createAuthor('m1', 'Madonna'), createAuthor('m2', 'Mahatma Gandhi'), createAuthor('m3', 'Malala Yousafzai'), createAuthor('m4', 'Malcolm X'), createAuthor('m5', 'Marcus Aurelius'), 
  createAuthor('m6', 'Margaret Thatcher'), createAuthor('m7', 'Marilyn Monroe'), createAuthor('m8', 'Mark Twain'), createAuthor('m9', 'Mark Zuckerberg'), 
  createAuthor('m10', 'Martin Luther'), createAuthor('m11', 'Martin Luther King, Jr.'), createAuthor('m12', 'Maya Angelou'), createAuthor('m13', 'Meryl Streep'), 
  createAuthor('m14', 'Michael Jackson'), createAuthor('m15', 'Michael Jordan'), createAuthor('m16', 'Michael Phelps'), createAuthor('m17', 'Michelangelo'), 
  createAuthor('m18', 'Michelle Obama'), createAuthor('m19', 'Mike Tyson'), createAuthor('m20', 'Morgan Freeman'), createAuthor('m21', 'Mother Teresa'), createAuthor('m22', 'Muhammad Ali'),
  
  createAuthor('n1', 'Napoleon Bonaparte'), createAuthor('n2', 'Napoleon Hill'), createAuthor('n3', 'Neil Armstrong'), createAuthor('n4', 'Neil deGrasse Tyson'), 
  createAuthor('n5', 'Neil Gaiman'), createAuthor('n6', 'Nelson Mandela'), createAuthor('n7', 'Niccolo Machiavelli'), createAuthor('n8', 'Nicola Tesla'), 
  createAuthor('n9', 'Niels Bohr'), createAuthor('n10', 'Nikola Tesla'), createAuthor('n11', 'Noam Chomsky'), createAuthor('n12', 'Nora Ephron'),
  
  createAuthor('o1', 'Oprah Winfrey'), createAuthor('o2', 'Oscar Wilde'), createAuthor('o3', 'Oliver Wendell Holmes'),
  
  createAuthor('p1', 'Pablo Picasso'), createAuthor('p2', 'Paulo Coelho'), createAuthor('p3', 'Paul McCartney'), createAuthor('p4', 'Pele'), 
  createAuthor('p5', 'Peter Drucker'), createAuthor('p6', 'Plato'), createAuthor('p7', 'Pope Francis'), createAuthor('p8', 'Princess Diana'), createAuthor('p9', 'Pythagoras'),
  
  createAuthor('q1', 'Queen Elizabeth I'), createAuthor('q2', 'Queen Elizabeth II'), createAuthor('q3', 'Quentin Tarantino'), createAuthor('q4', 'Quincy Jones'),
  
  createAuthor('r1', 'Ralph Waldo Emerson'), createAuthor('r2', 'Ray Bradbury'), createAuthor('r3', 'Rene Descartes'), createAuthor('r4', 'Richard Branson'), 
  createAuthor('r5', 'Richard Feynman'), createAuthor('r6', 'Rihanna'), createAuthor('r7', 'Roald Dahl'), createAuthor('r8', 'Robert Downey Jr.'), 
  createAuthor('r9', 'Robert Frost'), createAuthor('r10', 'Robin Williams'), createAuthor('r11', 'Ronald Reagan'), createAuthor('r12', 'Rosa Parks'), 
  createAuthor('r13', 'Rumi'), createAuthor('r14', 'Ruth Bader Ginsburg'),
  
  createAuthor('s1', 'Salvador Dali'), createAuthor('s2', 'Samuel L. Jackson'), createAuthor('s3', 'Serena Williams'), createAuthor('s4', 'Sigmund Freud'), 
  createAuthor('s5', 'Simon Sinek'), createAuthor('s6', 'Simone Biles'), createAuthor('s7', 'Socrates'), createAuthor('s8', 'Soren Kierkegaard'), 
  createAuthor('s9', 'Stephen Hawking'), createAuthor('s10', 'Stephen King'), createAuthor('s11', 'Steve Jobs'), createAuthor('s12', 'Steve Martin'), 
  createAuthor('s13', 'Steven Spielberg'), createAuthor('s14', 'Sun Tzu'), createAuthor('s15', 'Sylvia Plath'), createAuthor('s16', 'Sheryl Sandberg'),
  
  createAuthor('t1', 'Taylor Swift'), createAuthor('t2', 'Teddy Roosevelt'), createAuthor('t3', 'Thich Nhat Hanh'), createAuthor('t4', 'Thomas A. Edison'), 
  createAuthor('t5', 'Thomas Jefferson'), createAuthor('t6', 'Tiger Woods'), createAuthor('t7', 'Tim Burton'), createAuthor('t8', 'Tom Cruise'), 
  createAuthor('t9', 'Tom Hanks'), createAuthor('t10', 'Tony Robbins'), createAuthor('t11', 'Tupac Shakur'),
  
  createAuthor('u1', 'Usain Bolt'), createAuthor('u2', 'Ursula K. Le Guin'), createAuthor('u3', 'Ulysses S. Grant'), createAuthor('u4', 'Umberto Eco'),
  
  createAuthor('v1', 'Victor Hugo'), createAuthor('v2', 'Vince Lombardi'), createAuthor('v3', 'Vincent Van Gogh'), createAuthor('v4', 'Viola Davis'), 
  createAuthor('v5', 'Virginia Woolf'), createAuthor('v6', 'Voltaire'), createAuthor('v7', 'Vladimir Putin'), createAuthor('v8', 'Vera Wang'),
  
  createAuthor('w1', 'Walt Disney'), createAuthor('w2', 'Walt Whitman'), createAuthor('w3', 'Warren Buffett'), createAuthor('w4', 'Wayne Gretzky'), 
  createAuthor('w5', 'Will Smith'), createAuthor('w6', 'William Blake'), createAuthor('w7', 'William Shakespeare'), createAuthor('w8', 'Winston Churchill'), 
  createAuthor('w9', 'Woody Allen'), createAuthor('w10', 'Wolfgang Amadeus Mozart'), createAuthor('w11', 'Wayne Dyer'),
  
  createAuthor('x1', 'Xenophon'), createAuthor('x2', 'Xi Jinping'),
  
  createAuthor('y1', 'Yao Ming'), createAuthor('y2', 'Yogi Berra'), createAuthor('y3', 'Yoko Ono'), createAuthor('y4', 'Yuri Gagarin'), createAuthor('y5', 'Yves Saint Laurent'),
  
  createAuthor('z1', 'Zig Ziglar'), createAuthor('z2', 'Zora Neale Hurston'), createAuthor('z3', 'Zsa Zsa Gabor'), createAuthor('z4', 'Zendaya'), createAuthor('z5', 'Zaha Hadid')
];

export const POPULAR_MOVIES: Topic[] = [
  createMedia('m_a1', '12 Angry Men'), createMedia('m_a2', '2001: A Space Odyssey'), createMedia('m_a3', '300'),
  createMedia('m_a4', '500 Days of Summer'), createMedia('m_a5', 'A Beautiful Mind'), createMedia('m_a6', 'A Clockwork Orange'),
  createMedia('m_a7', 'A Few Good Men'), createMedia('m_a8', 'A Quiet Place'), createMedia('m_a9', 'A Star Is Born'),
  createMedia('m_a10', 'Airplane!'), createMedia('m_a11', 'Aladdin'), createMedia('m_a12', 'Alien'), createMedia('m_a13', 'Aliens'), 
  createMedia('m_a14', 'Amadeus'), createMedia('m_a15', 'Amelie'), createMedia('m_a16', 'American Beauty'), 
  createMedia('m_a17', 'American History X'), createMedia('m_a18', 'American Psycho'), createMedia('m_a19', 'Annie Hall'), 
  createMedia('m_a20', 'Apocalypse Now'), createMedia('m_a21', 'Apollo 13'), createMedia('m_a22', 'Arrival'), createMedia('m_a23', 'As Good as It Gets'), 
  createMedia('m_a24', 'Avatar'), createMedia('m_a25', 'Avengers: Endgame'), createMedia('m_a26', 'Avengers: Infinity War'),
  createMedia('m_b1', 'Back to the Future'), createMedia('m_b2', 'Barbie'), createMedia('m_b3', 'Batman'), createMedia('m_b4', 'Batman Begins'), 
  createMedia('m_b5', 'Batman Returns'), createMedia('m_b6', 'Beauty and the Beast'), createMedia('m_b7', 'Beetlejuice'), createMedia('m_b8', 'Before Sunrise'), 
  createMedia('m_b9', 'Big'), createMedia('m_b10', 'Big Fish'), createMedia('m_b11', 'Big Hero 6'), createMedia('m_b12', 'Birdman'), 
  createMedia('m_b13', 'Black Panther'), createMedia('m_b14', 'Blade Runner'), createMedia('m_b15', 'Blade Runner 2049'), 
  createMedia('m_b16', 'Blood Diamond'), createMedia('m_b17', 'Blue Velvet'), createMedia('m_b18', 'Bohemian Rhapsody'), 
  createMedia('m_b19', 'Braveheart'), createMedia('m_b20', 'Breakfast at Tiffany\'s'), createMedia('m_b21', 'Bridesmaids'), 
  createMedia('m_b22', 'Bridge of Spies'), createMedia('m_b23', 'Brokeback Mountain'), createMedia('m_b24', 'A Bronx Tale'),
  createMedia('m_c1', 'Captain America: Civil War'), createMedia('m_c2', 'Casablanca'), createMedia('m_c3', 'Casino'), createMedia('m_c4', 'Casino Royale'), 
  createMedia('m_c5', 'Cast Away'), createMedia('m_c6', 'Catch Me If You Can'), createMedia('m_c7', 'Chicago'), createMedia('m_c8', 'Children of Men'), 
  createMedia('m_c9', 'Chinatown'), createMedia('m_c10', 'Cinderella'), createMedia('m_c11', 'Citizen Kane'), createMedia('m_c12', 'City of God'), 
  createMedia('m_c13', 'Clueless'), createMedia('m_c14', 'Coco'), createMedia('m_c15', 'Coming to America'), createMedia('m_c16', 'Crazy Rich Asians'), 
  createMedia('m_c17', 'Creed'),
  createMedia('m_d1', 'Dances with Wolves'), createMedia('m_d2', 'Dead Poets Society'), createMedia('m_d3', 'Deadpool'), createMedia('m_d4', 'Despicable Me'), 
  createMedia('m_d5', 'Die Hard'), createMedia('m_d6', 'Dirty Dancing'), createMedia('m_d7', 'Django Unchained'), createMedia('m_d8', 'Doctor Strange'), 
  createMedia('m_d9', 'Donnie Darko'), createMedia('m_d10', 'Dr. Strangelove'), createMedia('m_d11', 'Drive'), createMedia('m_d12', 'Dune'), createMedia('m_d13', 'Dunkirk'),
  createMedia('m_e1', 'E.T. the Extra-Terrestrial'), createMedia('m_e2', 'Edge of Tomorrow'), createMedia('m_e3', 'Edward Scissorhands'), 
  createMedia('m_e4', 'Elf'), createMedia('m_e5', 'Encanto'), createMedia('m_e6', 'Eternal Sunshine of the Spotless Mind'), 
  createMedia('m_e7', 'Everything Everywhere All At Once'), createMedia('m_e8', 'Ex Machina'), createMedia('m_e9', 'The Exorcist'),
  createMedia('m_f1', 'Fantasia'), createMedia('m_f2', 'Fargo'), createMedia('m_f3', 'Ferris Bueller\'s Day Off'), createMedia('m_f4', 'Fight Club'), 
  createMedia('m_f5', 'Finding Nemo'), createMedia('m_f6', 'First Man'), createMedia('m_f7', 'Flight'), createMedia('m_f8', 'Ford v Ferrari'), 
  createMedia('m_f9', 'Forrest Gump'), createMedia('m_f10', 'Frozen'), createMedia('m_f11', 'Full Metal Jacket'),
  createMedia('m_g1', 'Gangs of New York'), createMedia('m_g2', 'Gattaca'), createMedia('m_g3', 'Get Out'), createMedia('m_g4', 'Ghost'), 
  createMedia('m_g5', 'Ghostbusters'), createMedia('m_g6', 'Gladiator'), createMedia('m_g7', 'Glass Onion'), createMedia('m_g8', 'Gone Girl'), 
  createMedia('m_g9', 'Gone with the Wind'), createMedia('m_g10', 'Good Will Hunting'), createMedia('m_g11', 'Goodfellas'), 
  createMedia('m_g12', 'Gran Torino'), createMedia('m_g13', 'Gravity'), createMedia('m_g14', 'Grease'), createMedia('m_g15', 'Green Book'), 
  createMedia('m_g16', 'Groundhog Day'), createMedia('m_g17', 'Guardians of the Galaxy'),
  createMedia('m_h1', 'Hacksaw Ridge'), createMedia('m_h2', 'Halloween'), createMedia('m_h3', 'Hamilton'), createMedia('m_h4', 'Harry Potter'), 
  createMedia('m_h5', 'Heat'), createMedia('m_h6', 'Her'), createMedia('m_h7', 'Hercules'), createMedia('m_h8', 'Hidden Figures'), 
  createMedia('m_h9', 'High School Musical'), createMedia('m_h10', 'Home Alone'), createMedia('m_h11', 'Hook'), createMedia('m_h12', 'Hotel Rwanda'), 
  createMedia('m_h13', 'How to Train Your Dragon'), createMedia('m_h14', 'Howl\'s Moving Castle'),
  createMedia('m_i1', 'I Am Legend'), createMedia('m_i2', 'Inception'), createMedia('m_i3', 'Indiana Jones'), createMedia('m_i4', 'Inglourious Basterds'), 
  createMedia('m_i5', 'Inside Out'), createMedia('m_i6', 'Interstellar'), createMedia('m_i7', 'Into the Wild'), createMedia('m_i8', 'Iron Man'), 
  createMedia('m_i9', 'It'), createMedia('m_i10', 'It\'s a Wonderful Life'),
  createMedia('m_j1', 'Jackie Brown'), createMedia('m_j2', 'Jaws'), createMedia('m_j3', 'Jerry Maguire'), createMedia('m_j4', 'Jojo Rabbit'), 
  createMedia('m_j5', 'Joker'), createMedia('m_j6', 'Jurassic Park'),
  createMedia('m_k1', 'Kill Bill'), createMedia('m_k2', 'King Kong'), createMedia('m_k3', 'Kingsman'), createMedia('m_k4', 'Knives Out'), createMedia('m_k5', 'Kung Fu Panda'),
  createMedia('m_l1', 'La La Land'), createMedia('m_l2', 'Labyrinth'), createMedia('m_l3', 'Lady Bird'), createMedia('m_l4', 'Legally Blonde'), 
  createMedia('m_l5', 'Leon: The Professional'), createMedia('m_l6', 'Les Miserables'), createMedia('m_l7', 'Life is Beautiful'), createMedia('m_l8', 'Life of Pi'), 
  createMedia('m_l9', 'Lilo & Stitch'), createMedia('m_l10', 'Little Miss Sunshine'), createMedia('m_l11', 'Little Women'), createMedia('m_l12', 'Logan'), 
  createMedia('m_l13', 'Lord of the Rings'), createMedia('m_l14', 'Lost in Translation'), createMedia('m_l15', 'Love Actually'), createMedia('m_l16', 'Luca'),
  createMedia('m_m1', 'Mad Max: Fury Road'), createMedia('m_m2', 'Marriage Story'), createMedia('m_m3', 'Mary Poppins'), createMedia('m_m4', 'Matilda'), 
  createMedia('m_m5', 'Mean Girls'), createMedia('m_m6', 'Memento'), createMedia('m_m7', 'Men in Black'), createMedia('m_m8', 'Midnight in Paris'), 
  createMedia('m_m9', 'Midsommar'), createMedia('m_m10', 'Million Dollar Baby'), createMedia('m_m11', 'Minority Report'), createMedia('m_m12', 'Moana'), 
  createMedia('m_m13', 'Monty Python and the Holy Grail'), createMedia('m_m14', 'Moon'), createMedia('m_m15', 'Moonlight'), createMedia('m_m16', 'Moonrise Kingdom'), 
  createMedia('m_m17', 'Moulin Rouge!'), createMedia('m_m18', 'Mr. Smith Goes to Washington'), createMedia('m_m19', 'Mrs. Doubtfire'), createMedia('m_m20', 'Mulan'), createMedia('m_m21', 'My Neighbor Totoro'),
  createMedia('m_n1', 'Napoleon Dynamite'), createMedia('m_n2', 'National Treasure'), createMedia('m_n3', 'Network'), createMedia('m_n4', 'Night at the Museum'), 
  createMedia('m_n5', 'Nightmare Before Christmas'), createMedia('m_n6', 'No Country for Old Men'), createMedia('m_n7', 'No Time to Die'), createMedia('m_n8', 'Nomadland'), 
  createMedia('m_n9', 'North by Northwest'), createMedia('m_n10', 'Notting Hill'), createMedia('m_n11', 'Now You See Me'),
  createMedia('m_o1', 'O Brother, Where Art Thou?'), createMedia('m_o2', 'Ocean\'s Eleven'), createMedia('m_o3', 'Oldboy'), createMedia('m_o4', 'Once Upon a Time in Hollywood'), 
  createMedia('m_o5', 'One Flew Over the Cuckoo\'s Nest'), createMedia('m_o6', 'Oppenheimer'),
  createMedia('m_p1', 'Paddington 2'), createMedia('m_p2', 'Pan\'s Labyrinth'), createMedia('m_p3', 'Parasite'), createMedia('m_p4', 'Paths of Glory'), 
  createMedia('m_p5', 'Phantom Thread'), createMedia('m_p6', 'Pirates of the Caribbean'), createMedia('m_p7', 'Pitch Perfect'), createMedia('m_p8', 'Planet of the Apes'), 
  createMedia('m_p9', 'Platoon'), createMedia('m_p10', 'Portrait of a Lady on Fire'), createMedia('m_p11', 'Predator'), createMedia('m_p12', 'Pretty Woman'), 
  createMedia('m_p13', 'Pride and Prejudice'), createMedia('m_p14', 'Princess Mononoke'), createMedia('m_p15', 'Psycho'), createMedia('m_p16', 'Pulp Fiction'),
  createMedia('m_q1', 'Quantum of Solace'), createMedia('m_q2', 'Queen & Slim'), createMedia('m_q3', 'Quiz Show'),
  createMedia('m_r1', 'Raging Bull'), createMedia('m_r2', 'Raiders of the Lost Ark'), createMedia('m_r3', 'Rain Man'), createMedia('m_r4', 'Ratatouille'), 
  createMedia('m_r5', 'Ready Player One'), createMedia('m_r6', 'Rear Window'), createMedia('m_r7', 'Rebel Without a Cause'), createMedia('m_r8', 'Remember the Titans'), 
  createMedia('m_r9', 'Requiem for a Dream'), createMedia('m_r10', 'Reservoir Dogs'), createMedia('m_r11', 'Rocky'), createMedia('m_r12', 'Roman Holiday'), 
  createMedia('m_r13', 'Romeo + Juliet'), createMedia('m_r14', 'Rosemary\'s Baby'), createMedia('m_r15', 'Rush'), createMedia('m_r16', 'Rushmore'),
  createMedia('m_s1', 'Saving Private Ryan'), createMedia('m_s2', 'Scarface'), createMedia('m_s3', 'Schindler\'s List'), createMedia('m_s4', 'School of Rock'), 
  createMedia('m_s5', 'Scream'), createMedia('m_s6', 'Se7en'), createMedia('m_s7', 'Seven Samurai'), createMedia('m_s8', 'Seven Years in Tibet'), 
  createMedia('m_s9', 'Shrek'), createMedia('m_s10', 'Shutter Island'), createMedia('m_s11', 'Silence of the Lambs'), createMedia('m_s12', 'Silver Linings Playbook'), 
  createMedia('m_s13', 'Singin\' in the Rain'), createMedia('m_s14', 'Skyfall'), createMedia('m_s15', 'Sleeping Beauty'), createMedia('m_s16', 'Sleepless in Seattle'), 
  createMedia('m_s17', 'Slumdog Millionaire'), createMedia('m_s18', 'Snatch'), createMedia('m_s19', 'Snow White'), createMedia('m_s20', 'Soul'), createMedia('m_s21', 'Sound of Metal'), 
  createMedia('m_s22', 'Spider-Man'), createMedia('m_s23', 'Spirited Away'), createMedia('m_s24', 'Spotlight'), createMedia('m_s25', 'Stand by Me'), 
  createMedia('m_s26', 'Star Trek'), createMedia('m_s27', 'Star Wars'), createMedia('m_s28', 'Suicide Squad'), createMedia('m_s29', 'Sully'), 
  createMedia('m_s30', 'Sunset Boulevard'), createMedia('m_s31', 'Superbad'), createMedia('m_s32', 'Superman'),
  createMedia('m_t1', 'Taken'), createMedia('m_t2', 'Taxi Driver'), createMedia('m_t3', 'Tenet'), createMedia('m_t4', 'Terminator'), createMedia('m_t5', 'Teen Wolf'), 
  createMedia('m_t6', 'Thankful'), createMedia('m_t7', 'The 40-Year-Old Virgin'), createMedia('m_t8', 'The Addams Family'), createMedia('m_t9', 'The African Queen'), 
  createMedia('m_t10', 'The Age of Adaline'), createMedia('m_t11', 'The Age of Innocence'), createMedia('m_t12', 'The Alamo'), createMedia('m_t13', 'The Amazing Spider-Man'),
  createMedia('m_u1', 'Unbroken'), createMedia('m_u2', 'Uncharted'), createMedia('m_u3', 'Uncut Gems'), createMedia('m_u4', 'Underworld'), createMedia('m_u5', 'Up'), createMedia('m_u6', 'Us'),
  createMedia('m_v1', 'V for Vendetta'), createMedia('m_v2', 'Vertigo'), createMedia('m_v3', 'Vacation'), createMedia('m_v4', 'Valentine\'s Day'),
  createMedia('m_w1', 'WALL-E'), createMedia('m_w2', 'War for the Planet of the Apes'), createMedia('m_w3', 'Warrior'), createMedia('m_w4', 'Watchmen'), 
  createMedia('m_w5', 'Wedding Crashers'), createMedia('m_w6', 'West Side Story'), createMedia('m_w7', 'Whale Rider'), createMedia('m_w8', 'When Harry Met Sally'), 
  createMedia('m_w9', 'Whiplash'), createMedia('m_w10', 'Who Framed Roger Rabbit'), createMedia('m_w11', 'Willy Wonka'), createMedia('m_w12', 'Wolfwalkers'), 
  createMedia('m_w13', 'Wonder'), createMedia('m_w14', 'Wonder Woman'), createMedia('m_w15', 'Wreck-It Ralph'),
  createMedia('m_x1', 'X-Men'),
  createMedia('m_y1', 'Yesterday'), createMedia('m_y2', 'You\'re Got Mail'), createMedia('m_y3', 'Young Frankenstein'), createMedia('m_y4', 'Your Name'),
  createMedia('m_z1', 'Zero Dark Thirty'), createMedia('m_z2', 'Zodiac'), createMedia('m_z3', 'Zombieland'), createMedia('m_z4', 'Zoolander'), createMedia('m_z5', 'Zootopia')
];

export const POPULAR_TV_SHOWS: Topic[] = [
  createMedia('tv_a1', 'Abbott Elementary'), createMedia('tv_a2', 'Adventure Time'), createMedia('tv_a3', 'Agents of S.H.I.E.L.D.'), createMedia('tv_a4', 'American Dad'), 
  createMedia('tv_a5', 'American Horror Story'), createMedia('tv_a6', 'American Idol'), createMedia('tv_a7', 'Andor'), createMedia('tv_a8', 'Archer'), 
  createMedia('tv_a9', 'Arrested Development'), createMedia('tv_a10', 'Arrow'), createMedia('tv_a11', 'Atlanta'), createMedia('tv_a12', 'Attack on Titan'), createMedia('tv_a13', 'Avatar: The Last Airbender'),
  createMedia('tv_b1', 'Band of Brothers'), createMedia('tv_b2', 'Barry'), createMedia('tv_b3', 'Battlestar Galactica'), createMedia('tv_b4', 'Better Call Saul'), 
  createMedia('tv_b5', 'Big Little Lies'), createMedia('tv_b6', 'Billions'), createMedia('tv_b7', 'Black Mirror'), createMedia('tv_b8', 'Blackadder'), 
  createMedia('tv_b9', 'Blue Bloods'), createMedia('tv_b10', 'Boardwalk Empire'), createMedia('tv_b11', 'BoJack Horseman'), createMedia('tv_b12', 'Bones'), 
  createMedia('tv_b13', 'Bosch'), createMedia('tv_b14', 'Breaking Bad'), createMedia('tv_b15', 'Bridgerton'), createMedia('tv_b16', 'Brooklyn Nine-Nine'), 
  createMedia('tv_b17', 'Buffy the Vampire Slayer'), createMedia('tv_b18', 'Burn Notice'),
  createMedia('tv_c1', 'Castle'), createMedia('tv_c2', 'Cheers'), createMedia('tv_c3', 'Chernobyl'), createMedia('tv_c4', 'Chappelle\'s Show'), createMedia('tv_c5', 'Chicago Fire'), 
  createMedia('tv_c6', 'Chuck'), createMedia('tv_c7', 'Cobra Kai'), createMedia('tv_c8', 'Community'), createMedia('tv_c9', 'Cowboy Bebop'), createMedia('tv_c10', 'Criminal Minds'), createMedia('tv_c11', 'Curb Your Enthusiasm'),
  createMedia('tv_d1', 'Daredevil'), createMedia('tv_d2', 'Dark'), createMedia('tv_d3', 'Dead to Me'), createMedia('tv_d4', 'Deadwood'), createMedia('tv_d5', 'Death Note'), 
  createMedia('tv_d6', 'Demon Slayer'), createMedia('tv_d7', 'Desperate Housewives'), createMedia('tv_d8', 'Dexter'), createMedia('tv_d9', 'Doctor Who'), createMedia('tv_d10', 'Downton Abbey'), 
  createMedia('tv_d11', 'Dragon Ball Z'), createMedia('tv_d12', 'DuckTales'),
  createMedia('tv_e1', 'Eastbound & Down'), createMedia('tv_e2', 'Elementary'), createMedia('tv_e3', 'Emily in Paris'), createMedia('tv_e4', 'Empire'), 
  createMedia('tv_e5', 'Entourage'), createMedia('tv_e6', 'Euphoria'), createMedia('tv_e7', 'Everybody Loves Raymond'),
  createMedia('tv_f1', 'Family Guy'), createMedia('tv_f2', 'Fargo'), createMedia('tv_f3', 'Fawlty Towers'), createMedia('tv_f4', 'Firefly'), createMedia('tv_f5', 'Fleabag'), 
  createMedia('tv_f6', 'Flight of the Conchords'), createMedia('tv_f7', 'For All Mankind'), createMedia('tv_f8', 'Frasier'), createMedia('tv_f9', 'Freaks and Geeks'), 
  createMedia('tv_f10', 'Friday Night Lights'), createMedia('tv_f11', 'Friends'), createMedia('tv_f12', 'Fringe'), createMedia('tv_f13', 'Futurama'),
  createMedia('tv_g1', 'Game of Thrones'), createMedia('tv_g2', 'Gilmore Girls'), createMedia('tv_g3', 'Girls'), createMedia('tv_g4', 'Glee'), createMedia('tv_g5', 'Glow'), 
  createMedia('tv_g6', 'Good Omens'), createMedia('tv_g7', 'Gossip Girl'), createMedia('tv_g8', 'Gotham'), createMedia('tv_g9', 'Gravity Falls'), createMedia('tv_g10', 'Grey\'s Anatomy'),
  createMedia('tv_h1', 'Hacks'), createMedia('tv_h2', 'Halt and Catch Fire'), createMedia('tv_h3', 'Hannibal'), createMedia('tv_h4', 'Happy Days'), createMedia('tv_h5', 'Hawaii Five-0'), 
  createMedia('tv_h6', 'Hawkeye'), createMedia('tv_h7', 'Heroes'), createMedia('tv_h8', 'His Dark Materials'), createMedia('tv_h9', 'Homeland'), createMedia('tv_h10', 'House'), 
  createMedia('tv_h11', 'House of Cards'), createMedia('tv_h12', 'House of the Dragon'), createMedia('tv_h13', 'How I Met Your Mother'), createMedia('tv_h14', 'How to Get Away with Murder'),
  createMedia('tv_i1', 'I Love Lucy'), createMedia('tv_i2', 'Insecure'), createMedia('tv_i3', 'Invincible'), createMedia('tv_i4', 'It\'s Always Sunny in Philadelphia'),
  createMedia('tv_j1', 'Jack Ryan'), createMedia('tv_j2', 'Jane the Virgin'), createMedia('tv_j3', 'Jessica Jones'), createMedia('tv_j4', 'Justified'),
  createMedia('tv_k1', 'Key & Peele'), createMedia('tv_k2', 'Killing Eve'), createMedia('tv_k3', 'King of the Hill'),
  createMedia('tv_l1', 'Law & Order'), createMedia('tv_l2', 'Law & Order: SVU'), createMedia('tv_l3', 'Legion'), createMedia('tv_l4', 'Lost'), createMedia('tv_l5', 'Lost in Space'), 
  createMedia('tv_l6', 'Louie'), createMedia('tv_l7', 'Love, Death & Robots'), createMedia('tv_l8', 'Lucifer'), createMedia('tv_l9', 'Luther'),
  createMedia('tv_m1', 'M*A*S*H'), createMedia('tv_m2', 'Mad Men'), createMedia('tv_m3', 'Malcolm in the Middle'), createMedia('tv_m4', 'Mandalorian'), 
  createMedia('tv_m5', 'Manifest'), createMedia('tv_m6', 'Mare of Easttown'), createMedia('tv_m7', 'Married... with Children'), createMedia('tv_m8', 'Marvelous Mrs. Maisel'), 
  createMedia('tv_m9', 'Master of None'), createMedia('tv_m10', 'Mindhunter'), createMedia('tv_m11', 'Modern Family'), createMedia('tv_m12', 'Money Heist'), 
  createMedia('tv_m13', 'Monk'), createMedia('tv_m14', 'Moon Knight'), createMedia('tv_m15', 'Mr. Bean'), createMedia('tv_m16', 'Mr. Robot'), createMedia('tv_m17', 'Murder, She Wrote'),
  createMedia('tv_n1', 'Narcos'), createMedia('tv_n2', 'Naruto'), createMedia('tv_n3', 'Nathan for You'), createMedia('tv_n4', 'NCIS'), createMedia('tv_n5', 'New Girl'),
  createMedia('tv_o1', 'O.J.: Made in America'), createMedia('tv_o2', 'Obi-Wan Kenobi'), createMedia('tv_o3', 'One Piece'), createMedia('tv_o4', 'One Tree Hill'), 
  createMedia('tv_o5', 'Only Murders in the Building'), createMedia('tv_o6', 'Orange Is the New Black'), createMedia('tv_o7', 'Orphan Black'), createMedia('tv_o8', 'Outlander'), 
  createMedia('tv_o9', 'Oz'), createMedia('tv_o10', 'Ozark'),
  createMedia('tv_p1', 'Parks and Recreation'), createMedia('tv_p2', 'Peacemaker'), createMedia('tv_p3', 'Peaky Blinders'), createMedia('tv_p4', 'Penny Dreadful'), 
  createMedia('tv_p5', 'Person of Interest'), createMedia('tv_p6', 'Phineas and Ferb'), createMedia('tv_p7', 'Poker Face'), createMedia('tv_p8', 'Pokemon'), 
  createMedia('tv_p9', 'Portlandia'), createMedia('tv_p10', 'Prison Break'), createMedia('tv_p11', 'Psych'),
  createMedia('tv_q1', 'Quantum Leap'), createMedia('tv_q2', 'Queen\'s Gambit'), createMedia('tv_q3', 'Queer Eye'),
  createMedia('tv_r1', 'Reacher'), createMedia('tv_r2', 'Reno 911!'), createMedia('tv_r3', 'Reservation Dogs'), createMedia('tv_r4', 'Rick and Morty'), 
  createMedia('tv_r5', 'Riverdale'), createMedia('tv_r6', 'Rome'), createMedia('tv_r7', 'Roots'), createMedia('tv_r8', 'Roseanne'), createMedia('tv_r9', 'RuPaul\'s Drag Race'),
  createMedia('tv_s1', 'Sandman'), createMedia('tv_s2', 'Scandal'), createMedia('tv_s3', 'Schitt\'s Creek'), createMedia('tv_s4', 'Scrubs'), createMedia('tv_s5', 'Seinfeld'), 
  createMedia('tv_s6', 'Severance'), createMedia('tv_s7', 'Sex and the City'), createMedia('tv_s8', 'Sex Education'), createMedia('tv_s9', 'Shameless'), createMedia('tv_s10', 'Sherlock'), 
  createMedia('tv_s11', 'Silicon Valley'), createMedia('tv_s12', 'Six Feet Under'), createMedia('tv_s13', 'Smallville'), createMedia('tv_s14', 'Snowfall'), createMedia('tv_s15', 'Sons of Anarchy'), 
  createMedia('tv_s16', 'South Park'), createMedia('tv_s17', 'Spartacus'), createMedia('tv_s18', 'SpongeBob SquarePants'), createMedia('tv_s19', 'Squid Game'), createMedia('tv_s20', 'Star Trek'), 
  createMedia('tv_s21', 'Star Wars: Clone Wars'), createMedia('tv_s22', 'Stranger Things'), createMedia('tv_s23', 'Succession'), createMedia('tv_s24', 'Suits'), 
  createMedia('tv_s25', 'Supergirl'), createMedia('tv_s26', 'Supernatural'), createMedia('tv_s27', 'Survivor'),
  createMedia('tv_t1', 'Ted Lasso'), createMedia('tv_t2', 'Teen Wolf'), createMedia('tv_t3', 'That \'70s Show'), createMedia('tv_t4', 'The 100'), createMedia('tv_t5', 'The Americans'), 
  createMedia('tv_t6', 'The Bear'), createMedia('tv_t7', 'The Big Bang Theory'), createMedia('tv_t8', 'The Blacklist'), createMedia('tv_t9', 'The Boys'), createMedia('tv_t10', 'The Crown'), 
  createMedia('tv_t11', 'The Good Place'), createMedia('tv_t12', 'The Good Wife'), createMedia('tv_t13', 'The Handmaid\'s Tale'), createMedia('tv_t14', 'The Last of Us'), 
  createMedia('tv_t15', 'The Leftovers'), createMedia('tv_t16', 'The Morning Show'), createMedia('tv_t17', 'The Office (UK)'), createMedia('tv_t18', 'The Office (US)'), 
  createMedia('tv_t19', 'The Punisher'), createMedia('tv_t20', 'The Shield'), createMedia('tv_t21', 'The Simpsons'), createMedia('tv_t22', 'The Sopranos'), 
  createMedia('tv_t23', 'The Vampire Diaries'), createMedia('tv_t24', 'The Walking Dead'), createMedia('tv_t25', 'The West Wing'), createMedia('tv_t26', 'The White Lotus'), 
  createMedia('tv_t27', 'The Wire'), createMedia('tv_t28', 'The Witcher'), createMedia('tv_t29', 'The X-Files'), createMedia('tv_t30', 'This Is Us'), createMedia('tv_t31', 'Top Gear'), 
  createMedia('tv_t32', 'True Blood'), createMedia('tv_t33', 'True Detective'), createMedia('tv_t34', 'Twin Peaks'),
  createMedia('tv_u1', 'Ugly Betty'), createMedia('tv_u2', 'Umbrella Academy'), createMedia('tv_u3', 'Unbreakable Kimmy Schmidt'),
  createMedia('tv_v1', 'Veep'), createMedia('tv_v2', 'Veronica Mars'), createMedia('tv_v3', 'Vikings'), createMedia('tv_v4', 'Vinyl'),
  createMedia('tv_w1', 'WandaVision'), createMedia('tv_w2', 'Watchmen'), createMedia('tv_w3', 'Wednesday'), createMedia('tv_w4', 'Weeds'), createMedia('tv_w5', 'Westworld'), 
  createMedia('tv_w6', 'What We Do in the Shadows'), createMedia('tv_w7', 'When They See Us'), createMedia('tv_w8', 'White Collar'), createMedia('tv_w9', 'Will & Grace'), 
  createMedia('tv_w10', 'Workaholics'),
  createMedia('tv_x1', 'X-Men: The Animated Series'), createMedia('tv_x2', 'Xena: Warrior Princess'),
  createMedia('tv_y1', 'Yellowjackets'), createMedia('tv_y2', 'Yellowstone'), createMedia('tv_y3', 'You'), createMedia('tv_y4', 'Young Justice'), createMedia('tv_y5', 'Young Sheldon'),
  createMedia('tv_z1', 'Zoo')
];

export const POPULAR_GAMES: Topic[] = [
  // A
  createMedia('g_a1', 'Age of Empires'), createMedia('g_a2', 'Alan Wake'), createMedia('g_a3', 'Among Us'), 
  createMedia('g_a4', 'Animal Crossing'), createMedia('g_a5', 'Apex Legends'), createMedia('g_a6', 'Assassin\'s Creed'), 
  createMedia('g_a7', 'Ark: Survival Evolved'),
  // B
  createMedia('g_b1', 'Baldur\'s Gate'), createMedia('g_b2', 'Batman: Arkham City'), createMedia('g_b3', 'Battlefield'), 
  createMedia('g_b4', 'Bayonetta'), createMedia('g_b5', 'BioShock'), createMedia('g_b6', 'Bloodborne'), 
  createMedia('g_b7', 'Borderlands'), createMedia('g_b8', 'Brawlhalla'),
  // C
  createMedia('g_c1', 'Call of Duty'), createMedia('g_c2', 'Castlevania'), createMedia('g_c3', 'Celeste'), 
  createMedia('g_c4', 'Civilization VI'), createMedia('g_c5', 'Clash of Clans'), createMedia('g_c6', 'Control'), 
  createMedia('g_c7', 'Counter-Strike'), createMedia('g_c8', 'Crash Bandicoot'), createMedia('g_c9', 'Cuphead'), 
  createMedia('g_c10', 'Cyberpunk 2077'),
  // D
  createMedia('g_d1', 'Dark Souls'), createMedia('g_d2', 'Days Gone'), createMedia('g_d3', 'Dead by Daylight'), 
  createMedia('g_d4', 'Dead Cells'), createMedia('g_d5', 'Dead Space'), createMedia('g_d6', 'Death Stranding'), 
  createMedia('g_d7', 'Destiny 2'), createMedia('g_d8', 'Detroit: Become Human'), createMedia('g_d9', 'Devil May Cry'), 
  createMedia('g_d10', 'Diablo'), createMedia('g_d11', 'Dishonored'), createMedia('g_d12', 'Donkey Kong'), 
  createMedia('g_d13', 'Doom'), createMedia('g_d14', 'Dota 2'), createMedia('g_d15', 'Dragon Age'),
  // E
  createMedia('g_e1', 'EarthBound'), createMedia('g_e2', 'Elden Ring'), createMedia('g_e3', 'Elder Scrolls V: Skyrim'), 
  createMedia('g_e4', 'Elite Dangerous'), createMedia('g_e5', 'Eve Online'),
  // F
  createMedia('g_f1', 'Fable'), createMedia('g_f2', 'Fallout'), createMedia('g_f3', 'Far Cry'), 
  createMedia('g_f4', 'Final Fantasy VII'), createMedia('g_f5', 'Fire Emblem'), createMedia('g_f6', 'Five Nights at Freddy\'s'), 
  createMedia('g_f7', 'Forza Horizon'), createMedia('g_f8', 'Fortnite'),
  // G
  createMedia('g_g1', 'Gears of War'), createMedia('g_g2', 'Genshin Impact'), createMedia('g_g3', 'Ghost of Tsushima'), 
  createMedia('g_g4', 'God of War'), createMedia('g_g5', 'GoldenEye 007'), createMedia('g_g6', 'Grand Theft Auto V'), 
  createMedia('g_g7', 'Guild Wars 2'), createMedia('g_g8', 'Guitar Hero'),
  // H
  createMedia('g_h1', 'Hades'), createMedia('g_h2', 'Half-Life'), createMedia('g_h3', 'Halo'), 
  createMedia('g_h4', 'Hearthstone'), createMedia('g_h5', 'Hellblade'), createMedia('g_h6', 'Hitman'), 
  createMedia('g_h7', 'Hollow Knight'), createMedia('g_h8', 'Horizon Zero Dawn'),
  // I
  createMedia('g_i1', 'Ico'), createMedia('g_i2', 'Injustice'), createMedia('g_i3', 'Inside'), 
  createMedia('g_i4', 'It Takes Two'),
  // J
  createMedia('g_j1', 'Jak and Daxter'), createMedia('g_j2', 'Journey'), createMedia('g_j3', 'Just Cause'),
  // K
  createMedia('g_k1', 'Kingdom Hearts'), createMedia('g_k2', 'Kirby'), createMedia('g_k3', 'Kratos'),
  // L
  createMedia('g_l1', 'L.A. Noire'), createMedia('g_l2', 'League of Legends'), createMedia('g_l3', 'Left 4 Dead'), 
  createMedia('g_l4', 'Legend of Zelda: Breath of the Wild'), createMedia('g_l5', 'Lego Star Wars'), createMedia('g_l6', 'Limbo'), 
  createMedia('g_l7', 'LittleBigPlanet'), createMedia('g_l8', 'Luigi\'s Mansion'),
  // M
  createMedia('g_m1', 'Madden NFL'), createMedia('g_m2', 'Mafia'), createMedia('g_m3', 'Mario Kart'), 
  createMedia('g_m4', 'Marvel\'s Spider-Man'), createMedia('g_m5', 'Mass Effect'), createMedia('g_m6', 'Max Payne'), 
  createMedia('g_m7', 'Mega Man'), createMedia('g_m8', 'Metal Gear Solid'), createMedia('g_m9', 'Metro Exodus'), 
  createMedia('g_m10', 'Metroid'), createMedia('g_m11', 'Minecraft'), createMedia('g_m12', 'Monster Hunter'), 
  createMedia('g_m13', 'Mortal Kombat'),
  // N
  createMedia('g_n1', 'NBA 2K'), createMedia('g_n2', 'Need for Speed'), createMedia('g_n3', 'Nier: Automata'), 
  createMedia('g_n4', 'Ninja Gaiden'), createMedia('g_n5', 'No Man\'s Sky'),
  // O
  createMedia('g_o1', 'Okami'), createMedia('g_o2', 'Ori and the Blind Forest'), createMedia('g_o3', 'Outer Wilds'), 
  createMedia('g_o4', 'Outlast'), createMedia('g_o5', 'Overwatch'),
  // P
  createMedia('g_p1', 'Pac-Man'), createMedia('g_p2', 'Persona 5'), createMedia('g_p3', 'Phasmophobia'), 
  createMedia('g_p4', 'Pikmin'), createMedia('g_p5', 'PlayerUnknown\'s Battlegrounds'), createMedia('g_p6', 'Pokemon'), 
  createMedia('g_p7', 'Pong'), createMedia('g_p8', 'Portal'), createMedia('g_p9', 'Prey'), createMedia('g_p10', 'Prince of Persia'),
  // Q
  createMedia('g_q1', 'Quake'), createMedia('g_q2', 'Quantum Break'), createMedia('g_q3', 'Quest for Glory'),
  // R
  createMedia('g_r1', 'Ratchet & Clank'), createMedia('g_r2', 'Red Dead Redemption 2'), createMedia('g_r3', 'Resident Evil'), 
  createMedia('g_r4', 'Returnal'), createMedia('g_r5', 'Rise of the Tomb Raider'), createMedia('g_r6', 'Roblox'), 
  createMedia('g_r7', 'Rocket League'), createMedia('g_r8', 'Rust'),
  // S
  createMedia('g_s1', 'Saints Row'), createMedia('g_s2', 'Sea of Thieves'), createMedia('g_s3', 'Sekiro: Shadows Die Twice'), 
  createMedia('g_s4', 'Shadow of the Colossus'), createMedia('g_s5', 'Sid Meier\'s Civilization'), createMedia('g_s6', 'Silent Hill'), 
  createMedia('g_s7', 'Sims 4'), createMedia('g_s8', 'Skyrim'), createMedia('g_s9', 'Slay the Spire'), 
  createMedia('g_s10', 'Sonic the Hedgehog'), createMedia('g_s11', 'Souls'), createMedia('g_s12', 'Spec Ops: The Line'), 
  createMedia('g_s13', 'Spider-Man'), createMedia('g_s14', 'Splatoon'), createMedia('g_s15', 'Spyro'), 
  createMedia('g_s16', 'Star Wars Jedi: Fallen Order'), createMedia('g_s17', 'StarCraft'), createMedia('g_s18', 'Stardew Valley'), 
  createMedia('g_s19', 'Street Fighter'), createMedia('g_s20', 'Super Mario Bros.'), createMedia('g_s21', 'Super Smash Bros.'),
  // T
  createMedia('g_t1', 'Team Fortress 2'), createMedia('g_t2', 'Tekken'), createMedia('g_t3', 'Terraria'), 
  createMedia('g_t4', 'Tetris'), createMedia('g_t5', 'The Last of Us'), createMedia('g_t6', 'The Sims'), 
  createMedia('g_t7', 'The Witcher 3: Wild Hunt'), createMedia('g_t8', 'Titanfall 2'), createMedia('g_t9', 'Tomb Raider'), 
  createMedia('g_t10', 'Tony Hawk\'s Pro Skater'),
  // U
  createMedia('g_u1', 'Uncharted'), createMedia('g_u2', 'Undertale'), createMedia('g_u3', 'Untitled Goose Game'), createMedia('g_u4', 'Until Dawn'),
  // V
  createMedia('g_v1', 'Valheim'), createMedia('g_v2', 'Valorant'), createMedia('g_v3', 'Vampire: The Masquerade'),
  // W
  createMedia('g_w1', 'Warframe'), createMedia('g_w2', 'Watch Dogs'), createMedia('g_w3', 'Wolfenstein'), 
  createMedia('g_w4', 'World of Warcraft'), createMedia('g_w5', 'Worms'),
  // X
  createMedia('g_x1', 'XCOM 2'), createMedia('g_x2', 'Xenoblade Chronicles'),
  // Y
  createMedia('g_y1', 'Yakuza'), createMedia('g_y2', 'Yoshi\'s Island'),
  // Z
  createMedia('g_z1', 'Zelda'), createMedia('g_z2', 'Zoo Tycoon')
];

export const POPULAR_BOOKS: Topic[] = [
  // A
  createMedia('bk_a1', '1984'), createMedia('bk_a2', 'A Christmas Carol'), createMedia('bk_a3', 'A Clockwork Orange'), createMedia('bk_a4', 'A Farewell to Arms'),
  createMedia('bk_a5', 'A Game of Thrones'), createMedia('bk_a6', 'A Midsummer Night\'s Dream'), createMedia('bk_a7', 'A Room with a View'), createMedia('bk_a8', 'A Tale of Two Cities'),
  createMedia('bk_a9', 'A Time to Kill'), createMedia('bk_a10', 'A Wrinkle in Time'), createMedia('bk_a11', 'Absalom, Absalom!'), createMedia('bk_a12', 'Adventures of Huckleberry Finn'),
  createMedia('bk_a13', 'Aesop\'s Fables'), createMedia('bk_a14', 'Alice\'s Adventures in Wonderland'), createMedia('bk_a15', 'All Quiet on the Western Front'),
  createMedia('bk_a16', 'American Gods'), createMedia('bk_a17', 'American Psycho'), createMedia('bk_a18', 'Angela\'s Ashes'), createMedia('bk_a19', 'Animal Farm'),
  createMedia('bk_a20', 'Anna Karenina'), createMedia('bk_a21', 'Anne of Green Gables'), createMedia('bk_a22', 'As I Lay Dying'), createMedia('bk_a23', 'Atonement'), createMedia('bk_a24', 'Atlas Shrugged'),
  
  // B
  createMedia('bk_b1', 'Beartown'), createMedia('bk_b2', 'Becoming'), createMedia('bk_b3', 'Beloved'), createMedia('bk_b4', 'Beowulf'), 
  createMedia('bk_b5', 'Black Beauty'), createMedia('bk_b6', 'Bleak House'), createMedia('bk_b7', 'Blood Meridian'), createMedia('bk_b8', 'Born a Crime'),
  createMedia('bk_b9', 'Brave New World'), createMedia('bk_b10', 'Breakfast at Tiffany\'s'), createMedia('bk_b11', 'Breakfast of Champions'), 
  createMedia('bk_b12', 'Bridge to Terabithia'), createMedia('bk_b13', 'Brothers Karamazov'),

  // C
  createMedia('bk_c1', 'Call of the Wild'), createMedia('bk_c2', 'Candide'), createMedia('bk_c3', 'Cannery Row'), createMedia('bk_c4', 'Catch-22'), 
  createMedia('bk_c5', 'Charlie and the Chocolate Factory'), createMedia('bk_c6', 'Charlotte\'s Web'), createMedia('bk_c7', 'Cloud Atlas'), createMedia('bk_c8', 'Common Sense'), 
  createMedia('bk_c9', 'Confessions'), createMedia('bk_c10', 'Coraline'), createMedia('bk_c11', 'Count of Monte Cristo'), createMedia('bk_c12', 'Crime and Punishment'), createMedia('bk_c13', 'Cyrano de Bergerac'),

  // D
  createMedia('bk_d1', 'David Copperfield'), createMedia('bk_d2', 'Death of a Salesman'), createMedia('bk_d3', 'Diary of a Young Girl'), createMedia('bk_d4', 'Doctor Zhivago'), 
  createMedia('bk_d5', 'Don Quixote'), createMedia('bk_d6', 'Dracula'), createMedia('bk_d7', 'Dune'),

  // E
  createMedia('bk_e1', 'East of Eden'), createMedia('bk_e2', 'Educated'), createMedia('bk_e3', 'Emma'), createMedia('bk_e4', 'Ender\'s Game'), createMedia('bk_e5', 'Ethan Frome'),

  // F
  createMedia('bk_f1', 'Fahrenheit 451'), createMedia('bk_f2', 'Faust'), createMedia('bk_f3', 'Fear and Loathing in Las Vegas'), createMedia('bk_f4', 'Fight Club'), 
  createMedia('bk_f5', 'For Whom the Bell Tolls'), createMedia('bk_f6', 'Frankenstein'),

  // G
  createMedia('bk_g1', 'Game of Thrones'), createMedia('bk_g2', 'Gone with the Wind'), createMedia('bk_g3', 'Good Omens'), createMedia('bk_g4', 'Goodnight Moon'), 
  createMedia('bk_g5', 'Grapes of Wrath'), createMedia('bk_g6', 'Great Expectations'), createMedia('bk_g7', 'Gulliver\'s Travels'),

  // H
  createMedia('bk_h1', 'Hamlet'), createMedia('bk_h2', 'Harry Potter and the Sorcerer\'s Stone'), createMedia('bk_h3', 'Heart of Darkness'), createMedia('bk_h4', 'Hitchhiker\'s Guide to the Galaxy'), 
  createMedia('bk_h5', 'Holes'), createMedia('bk_h6', 'How the Grinch Stole Christmas'), createMedia('bk_h7', 'Howl\'s Moving Castle'),

  // I
  createMedia('bk_i1', 'I Know Why the Caged Bird Sings'), createMedia('bk_i2', 'In Cold Blood'), createMedia('bk_i3', 'Inferno'), createMedia('bk_i4', 'Invisible Man'), createMedia('bk_i5', 'It'),

  // J
  createMedia('bk_j1', 'James and the Giant Peach'), createMedia('bk_j2', 'Jane Eyre'), createMedia('bk_j3', 'Jonathan Livingston Seagull'), createMedia('bk_j4', 'Journey to the Center of the Earth'), 
  createMedia('bk_j5', 'Julius Caesar'), createMedia('bk_j6', 'Jurassic Park'),

  // K
  createMedia('bk_k1', 'Kafka on the Shore'), createMedia('bk_k2', 'King Lear'), createMedia('bk_k3', 'Kite Runner'),

  // L
  createMedia('bk_l1', 'Les Miserables'), createMedia('bk_l2', 'Life of Pi'), createMedia('bk_l3', 'Little Prince'), createMedia('bk_l4', 'Little Women'), 
  createMedia('bk_l5', 'Lolita'), createMedia('bk_l6', 'Lord of the Flies'), createMedia('bk_l7', 'Lord of the Rings'), createMedia('bk_l8', 'Love in the Time of Cholera'),

  // M
  createMedia('bk_m1', 'Macbeth'), createMedia('bk_m2', 'Madame Bovary'), createMedia('bk_m3', 'Man\'s Search for Meaning'), createMedia('bk_m4', 'Matilda'), 
  createMedia('bk_m5', 'Memoirs of a Geisha'), createMedia('bk_m6', 'Metamorphosis'), createMedia('bk_m7', 'Middlemarch'), createMedia('bk_m8', 'Midnight\'s Children'), 
  createMedia('bk_m9', 'Moby Dick'), createMedia('bk_m10', 'Mrs. Dalloway'), createMedia('bk_m11', 'Murder on the Orient Express'), createMedia('bk_m12', 'My Sister\'s Keeper'),

  // N
  createMedia('bk_n1', 'Nausea'), createMedia('bk_n2', 'Never Let Me Go'), createMedia('bk_n3', 'Night'), createMedia('bk_n4', 'No Country for Old Men'), 
  createMedia('bk_n5', 'Northanger Abbey'), createMedia('bk_n6', 'Notes from Underground'),

  // O
  createMedia('bk_o1', 'Odyssey'), createMedia('bk_o2', 'Of Mice and Men'), createMedia('bk_o3', 'Old Man and the Sea'), createMedia('bk_o4', 'Oliver Twist'), 
  createMedia('bk_o5', 'On the Road'), createMedia('bk_o6', 'One Flew Over the Cuckoo\'s Nest'), createMedia('bk_o7', 'One Hundred Years of Solitude'), createMedia('bk_o8', 'Othello'), createMedia('bk_o9', 'Outlander'),

  // P
  createMedia('bk_p1', 'Pale Fire'), createMedia('bk_p2', 'Paradise Lost'), createMedia('bk_p3', 'Passage to India'), createMedia('bk_p4', 'Peter Pan'), 
  createMedia('bk_p5', 'Picture of Dorian Gray'), createMedia('bk_p6', 'Pilgrim\'s Progress'), createMedia('bk_p7', 'Pippi Longstocking'), createMedia('bk_p8', 'Pride and Prejudice'), createMedia('bk_p9', 'Prince Caspian'),

  // Q
  createMedia('bk_q1', 'Q & A'), createMedia('bk_q2', 'Queen of Shadows'), createMedia('bk_q3', 'Queen of the Damned'), createMedia('bk_q4', 'Quentins'),
  createMedia('bk_q5', 'Quest for Fire'), createMedia('bk_q6', 'Quiet: The Power of Introverts'), createMedia('bk_q7', 'Quo Vadis'),

  // R
  createMedia('bk_r1', 'Rabbit, Run'), createMedia('bk_r2', 'Rebecca'), createMedia('bk_r3', 'Republic'), createMedia('bk_r4', 'Robinson Crusoe'), 
  createMedia('bk_r5', 'Romeo and Juliet'), createMedia('bk_r6', 'Room'),

  // S
  createMedia('bk_s1', 'Sense and Sensibility'), createMedia('bk_s2', 'Sherlock Holmes'), createMedia('bk_s3', 'Siddhartha'), createMedia('bk_s4', 'Silas Marner'), 
  createMedia('bk_s5', 'Slaughterhouse-Five'), createMedia('bk_s6', 'Snow White'), createMedia('bk_s7', 'Sophie\'s Choice'), createMedia('bk_s8', 'Sound and the Fury'), 
  createMedia('bk_s9', 'Steppenwolf'), createMedia('bk_s10', 'Stranger in a Strange Land'), createMedia('bk_s11', 'Stuart Little'), createMedia('bk_s12', 'Sun Also Rises'),

  // T
  createMedia('bk_t1', 'Tao Te Ching'), createMedia('bk_t2', 'Tess of the d\'Urbervilles'), createMedia('bk_t3', 'The Alchemist'), createMedia('bk_t4', 'The Art of War'), 
  createMedia('bk_t5', 'The Awakening'), createMedia('bk_t6', 'The Bell Jar'), createMedia('bk_t7', 'The BFG'), createMedia('bk_t8', 'The Bible'), 
  createMedia('bk_t9', 'The Book Thief'), createMedia('bk_t10', 'The Catcher in the Rye'), createMedia('bk_t11', 'The Color Purple'), createMedia('bk_t12', 'The Crucible'), 
  createMedia('bk_t13', 'The Da Vinci Code'), createMedia('bk_t14', 'The Divine Comedy'), createMedia('bk_t15', 'The Fountainhead'), createMedia('bk_t16', 'The Giver'), 
  createMedia('bk_t17', 'The Glass Menagerie'), createMedia('bk_t18', 'The Godfather'), createMedia('bk_t19', 'The Goldfinch'), createMedia('bk_t20', 'The Great Gatsby'), 
  createMedia('bk_t21', 'The Handmaid\'s Tale'), createMedia('bk_t22', 'The Help'), createMedia('bk_t23', 'The Hobbit'), createMedia('bk_t24', 'The Hunger Games'), 
  createMedia('bk_t25', 'The Iliad'), createMedia('bk_t26', 'The Jungle Book'), createMedia('bk_t27', 'The Kite Runner'), createMedia('bk_t28', 'The Lion, the Witch and the Wardrobe'), 
  createMedia('bk_t29', 'The Little Prince'), createMedia('bk_t30', 'The Lovely Bones'), createMedia('bk_t31', 'The Martian'), createMedia('bk_t32', 'The Metamorphosis'), 
  createMedia('bk_t33', 'The Name of the Rose'), createMedia('bk_t34', 'The Notebook'), createMedia('bk_t35', 'The Odyssey'), createMedia('bk_t36', 'The Outsiders'), 
  createMedia('bk_t37', 'The Perks of Being a Wallflower'), createMedia('bk_t38', 'The Picture of Dorian Gray'), createMedia('bk_t39', 'The Princess Bride'), 
  createMedia('bk_t40', 'The Prophet'), createMedia('bk_t41', 'The Road'), createMedia('bk_t42', 'The Scarlet Letter'), createMedia('bk_t43', 'The Secret Garden'), 
  createMedia('bk_t44', 'The Shining'), createMedia('bk_t45', 'The Stand'), createMedia('bk_t46', 'The Stranger'), createMedia('bk_t47', 'The Sun Also Rises'), 
  createMedia('bk_t48', 'The Time Machine'), createMedia('bk_t49', 'The Trial'), createMedia('bk_t50', 'The Wind in the Willows'), createMedia('bk_t51', 'The Wonderful Wizard of Oz'), 
  createMedia('bk_t52', 'Things Fall Apart'), createMedia('bk_t53', 'To Kill a Mockingbird'), createMedia('bk_t54', 'Treasure Island'), createMedia('bk_t55', 'Twilight'),

  // U
  createMedia('bk_u1', 'Ubik'), createMedia('bk_u2', 'Uglies'), createMedia('bk_u3', 'Ulysses'), createMedia('bk_u4', 'Unaccustomed Earth'), 
  createMedia('bk_u5', 'Unbearable Lightness of Being'), createMedia('bk_u6', 'Uncle Tom\'s Cabin'), createMedia('bk_u7', 'Under the Dome'), 
  createMedia('bk_u8', 'Under the Net'), createMedia('bk_u9', 'Under the Volcano'), createMedia('bk_u10', 'Underworld'), 
  createMedia('bk_u11', 'Uneasy Money'), createMedia('bk_u12', 'Unfinished Tales'), createMedia('bk_u13', 'Uprooted'), createMedia('bk_u14', 'Utopia'),

  // V
  createMedia('bk_v1', 'V for Vendetta'), createMedia('bk_v2', 'V.'), createMedia('bk_v3', 'VALIS'), createMedia('bk_v4', 'Valley of the Dolls'),
  createMedia('bk_v5', 'Vampire Academy'), createMedia('bk_v6', 'Vanishing Acts'), createMedia('bk_v7', 'Vanity Fair'), createMedia('bk_v8', 'Vellum'),
  createMedia('bk_v9', 'Velveteen Rabbit'), createMedia('bk_v10', 'Very Hungry Caterpillar'), createMedia('bk_v11', 'Vile Bodies'), 
  createMedia('bk_v12', 'Villette'), createMedia('bk_v13', 'Void'), createMedia('bk_v14', 'Voss'), createMedia('bk_v15', 'Voyager'),

  // W
  createMedia('bk_w1', 'Waiting for Godot'), createMedia('bk_w2', 'Walden'), createMedia('bk_w3', 'War and Peace'), createMedia('bk_w4', 'War of the Worlds'), 
  createMedia('bk_w5', 'Watchmen'), createMedia('bk_w6', 'Water for Elephants'), createMedia('bk_w7', 'Watership Down'), createMedia('bk_w8', 'Where the Wild Things Are'), 
  createMedia('bk_w9', 'White Fang'), createMedia('bk_w10', 'Who Moved My Cheese?'), createMedia('bk_w11', 'Wicked'), createMedia('bk_w12', 'Wide Sargasso Sea'), 
  createMedia('bk_w13', 'Winnie the Pooh'), createMedia('bk_w14', 'Wizard of Oz'), createMedia('bk_w15', 'Women in Love'), createMedia('bk_w16', 'Wuthering Heights'),

  // X
  createMedia('bk_x1', 'X: A Novel'), createMedia('bk_x2', 'Xenocide'), createMedia('bk_x3', 'Xingu'), createMedia('bk_x4', 'X-Men: God Loves, Man Kills'),

  // Y
  createMedia('bk_y1', 'Year of the Griffin'), createMedia('bk_y2', 'Year of Wonders'), createMedia('bk_y3', 'Yellow Crocus'), createMedia('bk_y4', 'Yellowface'),
  createMedia('bk_y5', 'Yertle the Turtle'), createMedia('bk_y6', 'You'), createMedia('bk_y7', 'You Are a Badass'), createMedia('bk_y8', 'You Can\'t Go Home Again'),
  createMedia('bk_y9', 'You Only Live Twice'), createMedia('bk_y10', 'Youth'), createMedia('bk_y11', 'Youth in Revolt'),

  // Z
  createMedia('bk_z1', 'Z'), createMedia('bk_z2', 'Z for Zachariah'), createMedia('bk_z3', 'Zami: A New Spelling of My Name'), createMedia('bk_z4', 'Zanos'),
  createMedia('bk_z5', 'Zazem'), createMedia('bk_z6', 'Zelda'), createMedia('bk_z7', 'Zen and the Art of Motorcycle Maintenance'), createMedia('bk_z8', 'Zeno\'s Conscience'),
  createMedia('bk_z9', 'Zero'), createMedia('bk_z10', 'Zhivago'), createMedia('bk_z11', 'Zlata\'s Diary'), createMedia('bk_z12', 'Zorba the Greek'), createMedia('bk_z13', 'Zuleika Dobson')
];

export const POPULAR_PROVERBS: Topic[] = [
  // A
  createTopic('pv_a1', 'Afghan Proverbs'), createTopic('pv_a2', 'African Proverbs'), createTopic('pv_a3', 'Albanian Proverbs'), createTopic('pv_a4', 'American Proverbs'), 
  createTopic('pv_a5', 'Ancient Proverbs'), createTopic('pv_a6', 'Apache Proverbs'), createTopic('pv_a7', 'Arab Proverbs'), createTopic('pv_a8', 'Armenian Proverbs'), 
  createTopic('pv_a9', 'Australian Proverbs'),

  // B
  createTopic('pv_b1', 'Babylonian Proverbs'), createTopic('pv_b2', 'Belgian Proverbs'), createTopic('pv_b3', 'Bible Proverbs'), createTopic('pv_b4', 'Brazilian Proverbs'), 
  createTopic('pv_b5', 'Buddhist Proverbs'), createTopic('pv_b6', 'Bulgarian Proverbs'), createTopic('pv_b7', 'Burmese Proverbs'),

  // C
  createTopic('pv_c1', 'Cambodian Proverbs'), createTopic('pv_c2', 'Canadian Proverbs'), createTopic('pv_c3', 'Caribbean Proverbs'), createTopic('pv_c4', 'Celtic Proverbs'), 
  createTopic('pv_c5', 'Cherokee Proverbs'), createTopic('pv_c6', 'Chinese Proverbs'), createTopic('pv_c7', 'Christian Proverbs'), createTopic('pv_c8', 'Confucian Proverbs'), 
  createTopic('pv_c9', 'Creole Proverbs'), createTopic('pv_c10', 'Croatian Proverbs'), createTopic('pv_c11', 'Cuban Proverbs'), createTopic('pv_c12', 'Czech Proverbs'),

  // D
  createTopic('pv_d1', 'Danish Proverbs'), createTopic('pv_d2', 'Dutch Proverbs'),

  // E
  createTopic('pv_e1', 'Egyptian Proverbs'), createTopic('pv_e2', 'English Proverbs'), createTopic('pv_e3', 'Eskimo Proverbs'), createTopic('pv_e4', 'Ethiopian Proverbs'),

  // F
  createTopic('pv_f1', 'Filipino Proverbs'), createTopic('pv_f2', 'Finnish Proverbs'), createTopic('pv_f3', 'French Proverbs'),

  // G
  createTopic('pv_g1', 'Gaelic Proverbs'), createTopic('pv_g2', 'German Proverbs'), createTopic('pv_g3', 'Ghanaian Proverbs'), createTopic('pv_g4', 'Greek Proverbs'), createTopic('pv_g5', 'Gypsy Proverbs'),

  // H
  createTopic('pv_h1', 'Hawaiian Proverbs'), createTopic('pv_h2', 'Hebrew Proverbs'), createTopic('pv_h3', 'Hindu Proverbs'), createTopic('pv_h4', 'Hispanic Proverbs'), 
  createTopic('pv_h5', 'Hopi Proverbs'), createTopic('pv_h6', 'Hungarian Proverbs'),

  // I
  createTopic('pv_i1', 'Icelandic Proverbs'), createTopic('pv_i2', 'Indian Proverbs'), createTopic('pv_i3', 'Indonesian Proverbs'), createTopic('pv_i4', 'Iranian Proverbs'), 
  createTopic('pv_i5', 'Iraqi Proverbs'), createTopic('pv_i6', 'Irish Proverbs'), createTopic('pv_i7', 'Islamic Proverbs'), createTopic('pv_i8', 'Italian Proverbs'),

  // J
  createTopic('pv_j1', 'Jamaican Proverbs'), createTopic('pv_j2', 'Japanese Proverbs'), createTopic('pv_j3', 'Jewish Proverbs'),

  // K
  createTopic('pv_k1', 'Kenyan Proverbs'), createTopic('pv_k2', 'Korean Proverbs'), createTopic('pv_k3', 'Kurdish Proverbs'),

  // L
  createTopic('pv_l1', 'Latin Proverbs'), createTopic('pv_l2', 'Latvian Proverbs'), createTopic('pv_l3', 'Lebanese Proverbs'), createTopic('pv_l4', 'Lithuanian Proverbs'),

  // M
  createTopic('pv_m1', 'Malaysian Proverbs'), createTopic('pv_m2', 'Maori Proverbs'), createTopic('pv_m3', 'Mayan Proverbs'), createTopic('pv_m4', 'Mexican Proverbs'), 
  createTopic('pv_m5', 'Mongolian Proverbs'), createTopic('pv_m6', 'Moroccan Proverbs'),

  // N
  createTopic('pv_n1', 'Native American Proverbs'), createTopic('pv_n2', 'Navajo Proverbs'), createTopic('pv_n3', 'Nepalese Proverbs'), createTopic('pv_n4', 'Nigerian Proverbs'), 
  createTopic('pv_n5', 'Norwegian Proverbs'),

  // O
  createTopic('pv_o1', 'Omani Proverbs'),

  // P
  createTopic('pv_p1', 'Pakistani Proverbs'), createTopic('pv_p2', 'Palestinian Proverbs'), createTopic('pv_p3', 'Persian Proverbs'), createTopic('pv_p4', 'Philippine Proverbs'), 
  createTopic('pv_p5', 'Polish Proverbs'), createTopic('pv_p6', 'Portuguese Proverbs'),

  // Q
  createTopic('pv_q1', 'Qatari Proverbs'), createTopic('pv_q2', 'Quebecois Proverbs'),

  // R
  createTopic('pv_r1', 'Roman Proverbs'), createTopic('pv_r2', 'Romanian Proverbs'), createTopic('pv_r3', 'Russian Proverbs'),

  // S
  createTopic('pv_s1', 'Samoan Proverbs'), createTopic('pv_s2', 'Sanskrit Proverbs'), createTopic('pv_s3', 'Scandinavian Proverbs'), createTopic('pv_s4', 'Scottish Proverbs'), 
  createTopic('pv_s5', 'Serbian Proverbs'), createTopic('pv_s6', 'Sicilian Proverbs'), createTopic('pv_s7', 'Sioux Proverbs'), createTopic('pv_s8', 'Slovak Proverbs'), 
  createTopic('pv_s9', 'Somali Proverbs'), createTopic('pv_s10', 'South American Proverbs'), createTopic('pv_s11', 'Spanish Proverbs'), createTopic('pv_s12', 'Sudanese Proverbs'), 
  createTopic('pv_s13', 'Sufi Proverbs'), createTopic('pv_s14', 'Swahili Proverbs'), createTopic('pv_s15', 'Swedish Proverbs'), createTopic('pv_s16', 'Swiss Proverbs'), 
  createTopic('pv_s17', 'Syrian Proverbs'),

  // T
  createTopic('pv_t1', 'Taiwanese Proverbs'), createTopic('pv_t2', 'Tamil Proverbs'), createTopic('pv_t3', 'Taoist Proverbs'), createTopic('pv_t4', 'Thai Proverbs'), 
  createTopic('pv_t5', 'Tibetan Proverbs'), createTopic('pv_t6', 'Turkish Proverbs'),

  // U
  createTopic('pv_u1', 'Ugandan Proverbs'), createTopic('pv_u2', 'Uighur Proverbs'), createTopic('pv_u3', 'Ukrainian Proverbs'), createTopic('pv_u4', 'Urdu Proverbs'), 
  createTopic('pv_u5', 'Uruguayan Proverbs'), createTopic('pv_u6', 'Uzbek Proverbs'),

  // V
  createTopic('pv_v1', 'Venezuelan Proverbs'), createTopic('pv_v2', 'Vietnamese Proverbs'), createTopic('pv_v3', 'Viking Proverbs'),

  // W
  createTopic('pv_w1', 'Welsh Proverbs'),

  // X
  createTopic('pv_x1', 'Xhosa Proverbs'),

  // Y
  createTopic('pv_y1', 'Yemeni Proverbs'), createTopic('pv_y2', 'Yiddish Proverbs'), createTopic('pv_y3', 'Yoruba Proverbs'),

  // Z
  createTopic('pv_z1', 'Zairian Proverbs'), createTopic('pv_z2', 'Zambian Proverbs'), createTopic('pv_z3', 'Zen Proverbs'), createTopic('pv_z4', 'Zimbabwean Proverbs'), 
  createTopic('pv_z5', 'Zulu Proverbs')
];

export const POPULAR_LYRICS: Topic[] = [
  createMedia('l_a1', 'ABBA'), createMedia('l_a2', 'AC/DC'), createMedia('l_a3', 'Adele'), createMedia('l_a4', 'Aerosmith'), createMedia('l_a5', 'Alanis Morissette'), createMedia('l_a6', 'Alicia Keys'), createMedia('l_a7', 'Amy Winehouse'), createMedia('l_a8', 'Ariana Grande'), createMedia('l_a9', 'Avicii'),
  createMedia('l_b1', 'Backstreet Boys'), createMedia('l_b2', 'Beach Boys'), createMedia('l_b3', 'Beastie Boys'), createMedia('l_b4', 'Beatles'), createMedia('l_b5', 'Bee Gees'), createMedia('l_b6', 'Beyonce'), createMedia('l_b7', 'Billie Eilish'), createMedia('l_b8', 'Billy Joel'), createMedia('l_b9', 'Black Sabbath'), createMedia('l_b10', 'Bob Dylan'), createMedia('l_b11', 'Bob Marley'), createMedia('l_b12', 'Bon Jovi'), createMedia('l_b13', 'Bruce Springsteen'), createMedia('l_b14', 'Bruno Mars'),
  createMedia('l_c1', 'Cardi B'), createMedia('l_c2', 'Celine Dion'), createMedia('l_c3', 'Cher'), createMedia('l_c4', 'Chris Stapleton'), createMedia('l_c5', 'Christina Aguilera'), createMedia('l_c6', 'Coldplay'), createMedia('l_c7', 'Creedence Clearwater Revival'),
  createMedia('l_d1', 'Daft Punk'), createMedia('l_d2', 'David Bowie'), createMedia('l_d3', 'Def Leppard'), createMedia('l_d4', 'Demi Lovato'), createMedia('l_d5', 'Depeche Mode'), createMedia('l_d6', 'Diana Ross'), createMedia('l_d7', 'Dolly Parton'), createMedia('l_d8', 'Doja Cat'), createMedia('l_d9', 'Drake'), createMedia('l_d10', 'Dua Lipa'),
  createMedia('l_e1', 'Eagles'), createMedia('l_e2', 'Ed Sheeran'), createMedia('l_e3', 'Elton John'), createMedia('l_e4', 'Elvis Presley'), createMedia('l_e5', 'Eminem'), createMedia('l_e6', 'Eric Clapton'),
  createMedia('l_f1', 'Fleetwood Mac'), createMedia('l_f2', 'Foo Fighters'), createMedia('l_f3', 'Frank Ocean'), createMedia('l_f4', 'Frank Sinatra'),
  createMedia('l_g1', 'Garth Brooks'), createMedia('l_g2', 'Genesis'), createMedia('l_g3', 'George Michael'), createMedia('l_g4', 'Green Day'), createMedia('l_g5', 'Guns N\' Roses'),
  createMedia('l_h1', 'Halsey'), createMedia('l_h2', 'Harry Styles'), createMedia('l_h3', 'Imagine Dragons'), createMedia('l_h4', 'Iron Maiden'),
  createMedia('l_i1', 'Ice Cube'), createMedia('l_i2', 'Iggy Pop'), createMedia('l_i3', 'Incubus'),
  createMedia('l_j1', 'James Brown'), createMedia('l_j2', 'Janet Jackson'), createMedia('l_j3', 'Jay-Z'), createMedia('l_j4', 'Jennifer Lopez'), createMedia('l_j5', 'Jimi Hendrix'), createMedia('l_j6', 'John Legend'), createMedia('l_j7', 'John Lennon'), createMedia('l_j8', 'Johnny Cash'), createMedia('l_j9', 'Justin Bieber'), createMedia('l_j10', 'Justin Timberlake'),
  createMedia('l_k1', 'Kanye West'), createMedia('l_k2', 'Katy Perry'), createMedia('l_k3', 'Kendrick Lamar'), createMedia('l_k4', 'Kiss'),
  createMedia('l_l1', 'Lady Gaga'), createMedia('l_l2', 'Lana Del Rey'), createMedia('l_l3', 'Led Zeppelin'), createMedia('l_l4', 'Linkin Park'), createMedia('l_l5', 'Lizzo'), createMedia('l_l6', 'Lorde'),
  createMedia('l_m1', 'Madonna'), createMedia('l_m2', 'Mariah Carey'), createMedia('l_m3', 'Maroon 5'), createMedia('l_m4', 'Metallica'), createMedia('l_m5', 'Michael Jackson'), createMedia('l_m6', 'Miley Cyrus'),
  createMedia('l_n1', 'Neil Diamond'), createMedia('l_n2', 'Neil Young'), createMedia('l_n3', 'Nicki Minaj'), createMedia('l_n4', 'Nirvana'),
  createMedia('l_o1', 'Oasis'), createMedia('l_o2', 'Olivia Rodrigo'), createMedia('l_o3', 'One Direction'),
  createMedia('l_p1', 'Paul McCartney'), createMedia('l_p2', 'Pearl Jam'), createMedia('l_p3', 'Phil Collins'), createMedia('l_p4', 'Pink'), createMedia('l_p5', 'Pink Floyd'), createMedia('l_p6', 'Post Malone'), createMedia('l_p7', 'Prince'),
  createMedia('l_q1', 'Queen'), createMedia('l_q2', 'Queens of the Stone Age'), createMedia('l_q3', 'Quavo'), createMedia('l_q4', 'Quiet Riot'),
  createMedia('l_r1', 'Radiohead'), createMedia('l_r2', 'Red Hot Chili Peppers'), createMedia('l_r3', 'Rihanna'), createMedia('l_r4', 'Rolling Stones'),
  createMedia('l_s1', 'Sam Smith'), createMedia('l_s2', 'Selena Gomez'), createMedia('l_s3', 'Shakira'), createMedia('l_s4', 'Shawn Mendes'), createMedia('l_s5', 'Sia'), createMedia('l_s6', 'Simon & Garfunkel'), createMedia('l_s7', 'Snoop Dogg'), createMedia('l_s8', 'Stevie Wonder'), createMedia('l_s9', 'Sting'),
  createMedia('l_t1', 'Taylor Swift'), createMedia('l_t2', 'The Chainsmokers'), createMedia('l_t3', 'The Cure'), createMedia('l_t4', 'The Doors'), createMedia('l_t5', 'The Weeknd'), createMedia('l_t6', 'The Who'), createMedia('l_t7', 'Tina Turner'), createMedia('l_t8', 'Tom Petty'), createMedia('l_t9', 'Travis Scott'), createMedia('l_t10', 'Tupac Shakur'),
  createMedia('l_u1', 'U2'), createMedia('l_u2', 'Usher'), createMedia('l_u3', 'UB40'), createMedia('l_u4', 'Underworld'),
  createMedia('l_v1', 'Van Halen'), createMedia('l_v2', 'Van Morrison'), createMedia('l_v3', 'Vampire Weekend'), createMedia('l_v4', 'Velvet Underground'),
  createMedia('l_w1', 'Whitney Houston'), createMedia('l_w2', 'Weezer'), createMedia('l_w3', 'Wu-Tang Clan'),
  createMedia('l_x1', 'XXXTentacion'), createMedia('l_x2', 'X Ambassadors'), createMedia('l_x3', 'XTC'),
  createMedia('l_y1', 'Yes'), createMedia('l_y2', 'Yeah Yeah Yeahs'), createMedia('l_y3', 'Yusuf / Cat Stevens'), createMedia('l_y4', 'Young Thug'),
  createMedia('l_z1', 'Zayn'), createMedia('l_z2', 'ZZ Top'), createMedia('l_z3', 'Zedd'), createMedia('l_z4', 'Zara Larsson')
];

export const POPULAR_ANIME: Topic[] = [
  createMedia('an_a1', 'Akira'), createMedia('an_a2', 'Angel Beats!'), createMedia('an_a3', 'Assassination Classroom'), createMedia('an_a4', 'Attack on Titan'),
  createMedia('an_b1', 'Berserk'), createMedia('an_b2', 'Black Butler'), createMedia('an_b3', 'Black Clover'), createMedia('an_b4', 'Bleach'), createMedia('an_b5', 'Blue Exorcist'), createMedia('an_b6', 'Bungo Stray Dogs'),
  createMedia('an_c1', 'Cardcaptor Sakura'), createMedia('an_c2', 'Castlevania'), createMedia('an_c3', 'Chainsaw Man'), createMedia('an_c4', 'Clannad'), createMedia('an_c5', 'Code Geass'), createMedia('an_c6', 'Cowboy Bebop'),
  createMedia('an_d1', 'Death Note'), createMedia('an_d2', 'Demon Slayer'), createMedia('an_d3', 'Detective Conan'), createMedia('an_d4', 'Devilman Crybaby'), createMedia('an_d5', 'Digimon'), createMedia('an_d6', 'Dr. Stone'), createMedia('an_d7', 'Dragon Ball Z'),
  createMedia('an_e1', 'Erased'), createMedia('an_e2', 'Eureka Seven'),
  createMedia('an_f1', 'Fairy Tail'), createMedia('an_f2', 'Fate/Stay Night'), createMedia('an_f3', 'Food Wars!'), createMedia('an_f4', 'Fruits Basket'), createMedia('an_f5', 'Fullmetal Alchemist: Brotherhood'),
  createMedia('an_g1', 'Ghost in the Shell'), createMedia('an_g2', 'Gintama'), createMedia('an_g3', 'Gurren Lagann'),
  createMedia('an_h1', 'Haikyuu!!'), createMedia('an_h2', 'Hellsing'), createMedia('an_h3', 'Howl\'s Moving Castle'), createMedia('an_h4', 'Hunter x Hunter'),
  createMedia('an_i1', 'Inuyasha'), createMedia('an_i2', 'Initial D'),
  createMedia('an_j1', 'JoJo\'s Bizarre Adventure'), createMedia('an_j2', 'Jujutsu Kaisen'),
  createMedia('an_k1', 'K-On!'), createMedia('an_k2', 'Kill la Kill'), createMedia('an_k3', 'Kimi ni Todoke'), createMedia('an_k4', 'Kuroko\'s Basketball'),
  createMedia('an_l1', 'Little Witch Academia'), createMedia('an_l2', 'Love Live!'), createMedia('an_l3', 'Lupin III'),
  createMedia('an_m1', 'Made in Abyss'), createMedia('an_m2', 'Magi'), createMedia('an_m3', 'Mob Psycho 100'), createMedia('an_m4', 'Mobile Suit Gundam'), createMedia('an_m5', 'Monster'), createMedia('an_m6', 'My Hero Academia'), createMedia('an_m7', 'My Neighbor Totoro'),
  createMedia('an_n1', 'Naruto'), createMedia('an_n2', 'Neon Genesis Evangelion'), createMedia('an_n3', 'No Game No Life'), createMedia('an_n4', 'Noragami'),
  createMedia('an_o1', 'One Piece'), createMedia('an_o2', 'One Punch Man'), createMedia('an_o3', 'Ouran High School Host Club'),
  createMedia('an_p1', 'Parasyte'), createMedia('an_p2', 'Pokemon'), createMedia('an_p3', 'Princess Mononoke'), createMedia('an_p4', 'Psycho-Pass'),
  createMedia('an_q1', 'Queen\'s Blade'), createMedia('an_q2', 'Quintessential Quintuplets'),
  createMedia('an_r1', 'Re:Zero'), createMedia('an_r2', 'Rurouni Kenshin'),
  createMedia('an_s1', 'Sailor Moon'), createMedia('an_s2', 'Saint Seiya'), createMedia('an_s3', 'Samurai Champloo'), createMedia('an_s4', 'Serial Experiments Lain'), createMedia('an_s5', 'Seven Deadly Sins'), createMedia('an_s6', 'Shaman King'), createMedia('an_s7', 'Soul Eater'), createMedia('an_s8', 'Spirited Away'), createMedia('an_s9', 'Spy x Family'), createMedia('an_s10', 'Steins;Gate'), createMedia('an_s11', 'Sword Art Online'),
  createMedia('an_t1', 'The Promised Neverland'), createMedia('an_t2', 'Tokyo Ghoul'), createMedia('an_t3', 'Tokyo Revengers'), createMedia('an_t4', 'Toradora!'), createMedia('an_t5', 'Trigun'),
  createMedia('an_u1', 'Urusei Yatsura'), createMedia('an_u2', 'Ushio and Tora'), createMedia('an_u3', 'Uta no Prince-sama'),
  createMedia('an_v1', 'Violet Evergarden'), createMedia('an_v2', 'Vinland Saga'), createMedia('an_v3', 'Vampire Knight'),
  createMedia('an_w1', 'Weathering with You'), createMedia('an_w2', 'Wolf\'s Rain'), createMedia('an_w3', 'World Trigger'),
  createMedia('an_x1', 'xxxHolic'), createMedia('an_x2', 'X'),
  createMedia('an_y1', 'Your Lie in April'), createMedia('an_y2', 'Your Name'), createMedia('an_y3', 'Yu-Gi-Oh!'), createMedia('an_y4', 'YuYu Hakusho'),
  createMedia('an_z1', 'Zombieland Saga'), createMedia('an_z2', 'Zatch Bell!'), createMedia('an_z3', 'Zoids')
];

export const POPULAR_POEMS: Topic[] = [
  createMedia('pm_a1', 'A Dream Within a Dream'), createMedia('pm_a2', 'A Psalm of Life'), createMedia('pm_a3', 'A Red, Red Rose'), createMedia('pm_a4', 'Annabel Lee'),
  createMedia('pm_b1', 'Beowulf'), createMedia('pm_b2', 'Because I could not stop for Death'),
  createMedia('pm_c1', 'Canterbury Tales'), createMedia('pm_c2', 'Charge of the Light Brigade'),
  createMedia('pm_d1', 'Daddy'), createMedia('pm_d2', 'Daffodils'), createMedia('pm_d3', 'Death Be Not Proud'), createMedia('pm_d4', 'Divine Comedy'), createMedia('pm_d5', 'Do Not Go Gentle Into That Good Night'),
  createMedia('pm_e1', 'Elegy Written in a Country Churchyard'), createMedia('pm_e2', 'Endymion'),
  createMedia('pm_f1', 'Fire and Ice'),
  createMedia('pm_g1', 'Goblin Market'),
  createMedia('pm_h1', 'How Do I Love Thee?'), createMedia('pm_h2', 'Howl'),
  createMedia('pm_i1', 'I Carry Your Heart With Me'), createMedia('pm_i2', 'I Wandered Lonely as a Cloud'), createMedia('pm_i3', 'If-'), createMedia('pm_i4', 'Inferno'), createMedia('pm_i5', 'Invictus'),
  createMedia('pm_j1', 'Jabberwocky'),
  createMedia('pm_k1', 'Kubla Khan'),
  createMedia('pm_l1', 'Lady Lazarus'), createMedia('pm_l2', 'Leaves of Grass'),
  createMedia('pm_m1', 'Metamorphosis'),
  createMedia('pm_n1', 'No Man Is An Island'),
  createMedia('pm_o1', 'O Captain! My Captain!'), createMedia('pm_o2', 'Ode on a Grecian Urn'), createMedia('pm_o3', 'Ode to a Nightingale'), createMedia('pm_o4', 'Ozymandias'),
  createMedia('pm_p1', 'Paradise Lost'), createMedia('pm_p2', 'Phenomenal Woman'),
  createMedia('pm_q1', 'Queen Mab'),
  createMedia('pm_r1', 'Richard Cory'), createMedia('pm_r2', 'Rime of the Ancient Mariner'),
  createMedia('pm_s1', 'She Walks in Beauty'), createMedia('pm_s2', 'Sonnet 18'), createMedia('pm_s3', 'Still I Rise'), createMedia('pm_s4', 'Stopping by Woods on a Snowy Evening'),
  createMedia('pm_t1', 'The Chaos'), createMedia('pm_t2', 'The Hollow Men'), createMedia('pm_t3', 'The Love Song of J. Alfred Prufrock'), createMedia('pm_t4', 'The New Colossus'), createMedia('pm_t5', 'The Raven'), createMedia('pm_t6', 'The Road Not Taken'), createMedia('pm_t7', 'The Tyger'), createMedia('pm_t8', 'The Waste Land'), createMedia('pm_t9', 'To His Coy Mistress'),
  createMedia('pm_u1', 'Ulysses'), createMedia('pm_u2', 'Ulalume'),
  createMedia('pm_v1', 'Verses on the Death of Dr. Swift'), createMedia('pm_v2', 'Vitae Summa Brevis'),
  createMedia('pm_w1', 'We Wear the Mask'), createMedia('pm_w2', 'When You Are Old'),
  createMedia('pm_x1', 'Xanadu'),
  createMedia('pm_y1', 'You Are Old, Father William'),
  createMedia('pm_z1', 'Zone')
];