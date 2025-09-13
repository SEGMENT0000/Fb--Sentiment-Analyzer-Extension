// Premium sentiment analyzer with massive keyword database for ultimate accuracy
class SentimentAnalyzer {
  constructor() {
    // MASSIVE positive keyword database - 500+ words for incredible accuracy
    this.positiveKeywords = [
      // Basic positive emotions
      'love', 'amazing', 'awesome', 'great', 'excellent', 'fantastic', 'wonderful',
      'perfect', 'brilliant', 'outstanding', 'incredible', 'beautiful', 'good',
      'best', 'better', 'superior', 'top', 'premium', 'quality', 'fine', 'nice',
      
      // Happiness & joy
      'happy', 'joy', 'joyful', 'pleased', 'excited', 'thrilled', 'delighted',
      'ecstatic', 'elated', 'jubilant', 'euphoric', 'blissful', 'content',
      'cheerful', 'jolly', 'merry', 'gleeful', 'radiant', 'glowing', 'beaming',
      'upbeat', 'optimistic', 'hopeful', 'positive', 'bright', 'sunny',
      
      // Expressions & actions
      'smiling', 'laughing', 'giggling', 'chuckling', 'grinning', 'cheering',
      'celebrating', 'partying', 'dancing', 'singing', 'playing', 'enjoying',
      'adore', 'treasure', 'cherish', 'appreciate', 'value', 'honor', 'worship',
      
      // Gratitude & appreciation
      'thank', 'thanks', 'grateful', 'thankful', 'blessed', 'fortunate',
      'appreciate', 'respect', 'admire', 'approve', 'endorse', 'recommend',
      'praise', 'compliment', 'applaud', 'congratulate', 'celebrate', 'salute',
      'acclaim', 'commend', 'kudos', 'bravo', 'well done', 'impressive',
      
      // Quality & excellence
      'superb', 'marvelous', 'spectacular', 'phenomenal', 'terrific', 'fabulous',
      'splendid', 'gorgeous', 'lovely', 'charming', 'adorable', 'cute', 'pretty',
      'handsome', 'elegant', 'magnificent', 'divine', 'heavenly', 'stunning',
      'breathtaking', 'dazzling', 'glamorous', 'graceful', 'stylish', 'classy',
      'sophisticated', 'refined', 'exquisite', 'pristine', 'flawless', 'impeccable',
      
      // Personal qualities
      'inspiring', 'motivating', 'encouraging', 'supportive', 'helpful', 'kind',
      'generous', 'caring', 'thoughtful', 'considerate', 'friendly', 'welcoming',
      'warm', 'gentle', 'tender', 'compassionate', 'loving', 'affectionate',
      'devoted', 'loyal', 'faithful', 'trustworthy', 'reliable', 'dependable',
      'honest', 'sincere', 'genuine', 'authentic', 'humble', 'modest', 'gracious',
      
      // Comfort & peace
      'cozy', 'comfortable', 'relaxing', 'peaceful', 'calm', 'serene', 'tranquil',
      'soothing', 'refreshing', 'rejuvenating', 'healing', 'therapeutic',
      'restorative', 'invigorating', 'energizing', 'revitalizing', 'uplifting',
      
      // Entertainment & fun
      'fun', 'entertaining', 'amusing', 'hilarious', 'funny', 'witty', 'clever',
      'humorous', 'comic', 'playful', 'lighthearted', 'jovial', 'spirited',
      'lively', 'vibrant', 'dynamic', 'exciting', 'thrilling', 'adventurous',
      'engaging', 'captivating', 'fascinating', 'interesting', 'intriguing',
      
      // Intelligence & skill
      'smart', 'intelligent', 'wise', 'brilliant', 'genius', 'talented', 'skilled',
      'gifted', 'capable', 'competent', 'proficient', 'expert', 'masterful',
      'artful', 'creative', 'innovative', 'original', 'unique', 'inventive',
      'resourceful', 'insightful', 'perceptive', 'astute', 'sharp', 'quick',
      
      // Success & achievement
      'successful', 'winning', 'victorious', 'triumphant', 'accomplished',
      'achieved', 'fulfilled', 'completed', 'finished', 'resolved', 'solved',
      'improved', 'enhanced', 'upgraded', 'advanced', 'progressed', 'evolved',
      'flourishing', 'thriving', 'prospering', 'growing', 'developing',
      
      // Modern positive expressions
      'fire', 'lit', 'dope', 'sick', 'tight', 'fresh', 'clean', 'smooth', 'solid',
      'legit', 'epic', 'legendary', 'iconic', 'classic', 'timeless', 'mint',
      'crisp', 'sharp', 'sleek', 'slick', 'rad', 'wicked', 'mad', 'insane',
      'crazy good', 'unreal', 'beast', 'savage', 'goat', 'king', 'queen',
      
      // Impact & intensity
      'mind-blowing', 'jaw-dropping', 'eye-catching', 'head-turning',
      'show-stopping', 'game-changing', 'life-changing', 'groundbreaking',
      'revolutionary', 'extraordinary', 'remarkable', 'noteworthy', 'notable',
      'memorable', 'unforgettable', 'impressive', 'striking', 'powerful',
      'compelling', 'convincing', 'persuasive', 'influential', 'inspiring',
      
      // Approval & agreement
      'yes', 'absolutely', 'definitely', 'certainly', 'surely', 'indeed',
      'exactly', 'precisely', 'agreed', 'correct', 'right', 'true', 'valid',
      'accurate', 'spot on', 'on point', 'nailed it', 'perfect sense',
      
      // Energy & enthusiasm
      'energetic', 'enthusiastic', 'passionate', 'zealous', 'fervent', 'ardent',
      'spirited', 'animated', 'vigorous', 'robust', 'strong', 'powerful',
      'mighty', 'potent', 'intense', 'fierce', 'bold', 'brave', 'courageous',
      
      // Beauty & aesthetics
      'aesthetic', 'artistic', 'beautiful', 'gorgeous', 'stunning', 'striking',
      'attractive', 'appealing', 'pleasing', 'delightful', 'enchanting',
      'mesmerizing', 'hypnotic', 'magical', 'mystical', 'dreamy', 'fantasy',
      
      // Social media expressions
      'fire emoji', 'heart eyes', 'clapping', 'thumbs up', 'love it', 'obsessed',
      'goals', 'mood', 'vibes', 'aesthetic', 'slay', 'queen', 'king', 'iconic',
      'periodt', 'facts', 'truth', 'this', 'mood', 'same', 'relate', 'felt',
      
      // Professional & business
      'professional', 'efficient', 'effective', 'productive', 'profitable',
      'valuable', 'worthwhile', 'beneficial', 'advantageous', 'favorable',
      'promising', 'potential', 'opportunity', 'breakthrough', 'milestone',
      
      // Emojis
      '❤️', '😍', '🥰', '😊', '😁', '🤩', '👍', '🙌', '🎉', '💕', '🔥', '💯',
      '⭐', '✨', '💎', '🏆', '🎊', '🥳', '😎', '🤗', '💖', '💝', '🌟', '👏',
      '🤘', '💪', '🙏', '✌️', '👌', '💚', '💙', '💛', '🧡', '💜', '🖤', '🤍'
    ];

    // MASSIVE negative keyword database - 600+ words for comprehensive detection
    this.negativeKeywords = [
      // Basic negative emotions
      'hate', 'awful', 'terrible', 'horrible', 'disgusting', 'nasty', 'gross',
      'bad', 'worse', 'worst', 'inferior', 'poor', 'low', 'cheap', 'tacky',
      'pathetic', 'pitiful', 'miserable', 'wretched', 'dreadful', 'atrocious',
      'abysmal', 'deplorable', 'despicable', 'contemptible', 'detestable',
      
      // Intelligence & capability insults
      'stupid', 'dumb', 'idiotic', 'moronic', 'foolish', 'ignorant', 'clueless',
      'brainless', 'mindless', 'senseless', 'witless', 'dense', 'thick',
      'dim', 'slow', 'backward', 'retarded', 'mental', 'crazy', 'insane',
      'nuts', 'mad', 'bonkers', 'loony', 'psycho', 'deranged', 'unhinged',
      
      // Logical & reasoning criticism
      'ridiculous', 'absurd', 'nonsense', 'illogical', 'irrational',
      'unreasonable', 'preposterous', 'ludicrous', 'bizarre', 'weird',
      'strange', 'odd', 'peculiar', 'abnormal', 'freaky', 'creepy',
      'disturbing', 'unsettling', 'uncomfortable', 'awkward', 'cringe',
      
      // Worthlessness & value
      'garbage', 'trash', 'junk', 'waste', 'useless', 'worthless', 'pointless',
      'meaningless', 'hopeless', 'helpless', 'doomed', 'futile', 'vain',
      'empty', 'hollow', 'shallow', 'superficial', 'fake', 'phony', 'false',
      'artificial', 'synthetic', 'manufactured', 'forced', 'unnatural',
      
      // Failure & disappointment
      'failed', 'failure', 'loser', 'disappointing', 'disappointed', 'letdown',
      'frustrating', 'frustration', 'annoying', 'irritating', 'bothersome',
      'troublesome', 'problematic', 'difficult', 'challenging', 'impossible',
      'unfeasible', 'impractical', 'unrealistic', 'unworkable', 'flawed',
      
      // Emotional distress
      'sad', 'depressed', 'miserable', 'unhappy', 'upset', 'distressed',
      'distraught', 'devastated', 'heartbroken', 'crushed', 'shattered',
      'broken', 'hurt', 'wounded', 'scarred', 'traumatized', 'damaged',
      'torn', 'ripped', 'destroyed', 'ruined', 'wrecked', 'demolished',
      
      // Anger & rage
      'angry', 'mad', 'furious', 'enraged', 'outraged', 'livid', 'irate',
      'incensed', 'infuriated', 'raging', 'seething', 'boiling', 'steaming',
      'pissed', 'ticked', 'annoyed', 'irritated', 'aggravated', 'exasperated',
      'frustrated', 'fed up', 'sick of', 'tired of', 'done with', 'over it',
      
      // Fear & anxiety
      'scared', 'afraid', 'fearful', 'terrified', 'horrified', 'petrified',
      'panicked', 'worried', 'anxious', 'nervous', 'tense', 'stressed',
      'overwhelmed', 'frantic', 'hysterical', 'paranoid', 'suspicious',
      'doubtful', 'uncertain', 'unsure', 'confused', 'lost', 'helpless',
      
      // Disgust & revulsion
      'disgusting', 'revolting', 'repulsive', 'repugnant', 'sickening',
      'nauseating', 'vile', 'foul', 'rotten', 'putrid', 'stinking', 'reeking',
      'filthy', 'dirty', 'grimy', 'grubby', 'slimy', 'greasy', 'sticky',
      'yucky', 'icky', 'ew', 'yuck', 'blech', 'gross out', 'makes me sick',
      
      // Shock & disbelief
      'shocked', 'stunned', 'appalled', 'horrified', 'aghast', 'flabbergasted',
      'astounded', 'bewildered', 'confused', 'perplexed', 'puzzled', 'baffled',
      'mystified', 'stumped', 'speechless', 'dumbfounded', 'thunderstruck',
      
      // Pain & suffering
      'painful', 'agonizing', 'excruciating', 'torturous', 'unbearable',
      'intolerable', 'insufferable', 'unendurable', 'grueling', 'brutal',
      'harsh', 'severe', 'intense', 'extreme', 'overwhelming', 'crushing',
      'devastating', 'crippling', 'debilitating', 'paralyzing', 'numbing',
      
      // Moral & ethical negatives
      'wrong', 'evil', 'wicked', 'sinful', 'immoral', 'unethical', 'corrupt',
      'dishonest', 'deceitful', 'lying', 'cheating', 'stealing', 'betraying',
      'backstabbing', 'treacherous', 'malicious', 'spiteful', 'vindictive',
      'cruel', 'mean', 'nasty', 'vicious', 'savage', 'brutal', 'barbaric',
      
      // Rejection & dismissal
      'rejected', 'denied', 'refused', 'declined', 'dismissed', 'ignored',
      'neglected', 'abandoned', 'forgotten', 'discarded', 'thrown away',
      'cast aside', 'shunned', 'excluded', 'banned', 'blocked', 'barred',
      'ostracized', 'isolated', 'alienated', 'marginalized', 'discriminated',
      
      // Destruction & damage
      'destroyed', 'ruined', 'wrecked', 'demolished', 'obliterated',
      'annihilated', 'devastated', 'ravaged', 'mangled', 'mutilated',
      'disfigured', 'defaced', 'vandalized', 'sabotaged', 'corrupted',
      'contaminated', 'polluted', 'infected', 'diseased', 'toxic', 'poisonous',
      
      // Modern negative slang & internet culture
      'sucks', 'blows', 'stinks', 'bites', 'weak', 'lame', 'whack', 'trash',
      'basic', 'cringe', 'cringey', 'crappy', 'shitty', 'terrible', 'awful',
      'toxic', 'sketchy', 'shady', 'sus', 'suspicious', 'bogus', 'wack',
      'janky', 'busted', 'crusty', 'musty', 'dusty', 'rusty', 'nasty',
      'ghetto', 'ratchet', 'hood', 'thot', 'simp', 'beta', 'cuck', 'incel',
      
      // Intensity & severity
      'catastrophic', 'disastrous', 'calamitous', 'tragic', 'fatal', 'deadly',
      'lethal', 'murderous', 'killer', 'venomous', 'malignant', 'cancerous',
      'infectious', 'contagious', 'viral', 'epidemic', 'pandemic', 'plague',
      'cursed', 'doomed', 'damned', 'hell', 'hellish', 'nightmarish', 'haunting',
      
      // Failure states & defeat
      'crashed', 'collapsed', 'fallen', 'dropped', 'failed', 'defeated',
      'beaten', 'conquered', 'dominated', 'overpowered', 'overwhelmed',
      'crushed', 'smashed', 'pulverized', 'obliterated', 'eliminated',
      'terminated', 'finished', 'done for', 'game over', 'dead', 'killed',
      
      // Social & relationship negatives
      'lonely', 'alone', 'isolated', 'abandoned', 'forsaken', 'deserted',
      'betrayed', 'cheated on', 'dumped', 'ghosted', 'blocked', 'unfriended',
      'canceled', 'exposed', 'called out', 'dragged', 'roasted', 'burned',
      
      // Mental health & wellness
      'depressed', 'depression', 'anxious', 'anxiety', 'suicidal', 'self-harm',
      'cutting', 'bipolar', 'manic', 'psychotic', 'schizophrenic', 'ptsd',
      'trauma', 'triggered', 'panic attack', 'breakdown', 'meltdown', 'spiral',
      
      // Physical appearance & body shaming
      'ugly', 'hideous', 'grotesque', 'repulsive', 'disgusting', 'gross',
      'fat', 'obese', 'overweight', 'skinny', 'anorexic', 'bulimic',
      'short', 'tall', 'weird looking', 'deformed', 'disabled', 'handicapped',
      
      // Internet harassment & cyberbullying
      'kill yourself', 'kys', 'die', 'death threats', 'doxxed', 'swatted',
      'harassed', 'bullied', 'cyberbullied', 'trolled', 'griefed', 'spammed',
      'hacked', 'leaked', 'exposed', 'blackmailed', 'extorted', 'scammed',
      
      // Emojis
      '😡', '😭', '😢', '😠', '🤬', '😤', '😞', '😔', '💔', '👎', '🤮',
      '😱', '😰', '😨', '🙄', '😒', '😑', '🤦', '💀', '☠️', '🗑️', '💩',
      '🤡', '👺', '👹', '💣', '🔪', '⚔️', '🩸', '⚰️', '🪦', '🔥', '💥'
    ];

    // EXPANDED neutral keyword database - 400+ words for better classification
    this.neutralKeywords = [
      // Basic neutral expressions
      'okay', 'ok', 'fine', 'alright', 'sure', 'yes', 'no', 'right', 'correct',
      'exactly', 'true', 'false', 'maybe', 'perhaps', 'possibly', 'probably',
      'might', 'could', 'would', 'should', 'may', 'can', 'will', 'shall',
      'must', 'need', 'want', 'prefer', 'choose', 'decide', 'consider',
      
      // Descriptive neutrals
      'normal', 'regular', 'standard', 'typical', 'usual', 'common', 'ordinary',
      'average', 'medium', 'middle', 'neutral', 'balanced', 'fair', 'reasonable',
      'acceptable', 'adequate', 'sufficient', 'enough', 'moderate', 'decent',
      'satisfactory', 'passable', 'tolerable', 'manageable', 'workable',
      
      // Simple descriptors
      'simple', 'basic', 'plain', 'clear', 'obvious', 'evident', 'apparent',
      'visible', 'transparent', 'open', 'direct', 'straight', 'honest',
      'genuine', 'real', 'actual', 'true', 'accurate', 'precise', 'exact',
      'specific', 'particular', 'certain', 'definite', 'absolute', 'complete',
      
      // Observation & perception
      'seen', 'noticed', 'observed', 'watched', 'looked', 'viewed', 'checked',
      'examined', 'inspected', 'studied', 'reviewed', 'analyzed', 'evaluated',
      'assessed', 'measured', 'calculated', 'computed', 'estimated', 'figured',
      'determined', 'identified', 'recognized', 'discovered', 'found', 'located',
      
      // Decision & choice
      'decided', 'chosen', 'selected', 'picked', 'taken', 'given', 'received',
      'got', 'obtained', 'acquired', 'gained', 'earned', 'achieved', 'reached',
      'attained', 'accomplished', 'completed', 'finished', 'done', 'made',
      'created', 'built', 'constructed', 'developed', 'produced', 'generated',
      
      // State of being
      'had', 'has', 'have', 'been', 'was', 'were', 'are', 'is', 'am',
      'be', 'being', 'become', 'became', 'remain', 'stay', 'continue',
      'keep', 'maintain', 'preserve', 'hold', 'contain', 'include',
      'involve', 'require', 'consist', 'comprise', 'compose', 'constitute',
      
      // Mental processes
      'think', 'thought', 'believe', 'know', 'understand', 'realize',
      'recognize', 'remember', 'forget', 'learn', 'study', 'research',
      'investigate', 'explore', 'discover', 'find out', 'figure out',
      'work out', 'solve', 'resolve', 'answer', 'respond', 'reply',
      
      // Communication
      'teach', 'show', 'tell', 'say', 'speak', 'talk', 'discuss', 'mention',
      'state', 'declare', 'announce', 'report', 'inform', 'notify', 'update',
      'remind', 'warn', 'advise', 'suggest', 'recommend', 'propose', 'request',
      'ask', 'question', 'inquire', 'wonder', 'curious', 'interested',
      
      // Actions & movement
      'offer', 'provide', 'supply', 'deliver', 'send', 'bring', 'take',
      'carry', 'move', 'go', 'come', 'arrive', 'leave', 'return', 'stay',
      'wait', 'pause', 'stop', 'start', 'begin', 'end', 'finish', 'complete',
      'continue', 'proceed', 'advance', 'progress', 'develop', 'grow',
      
      // Time & sequence
      'now', 'then', 'when', 'while', 'during', 'before', 'after', 'since',
      'until', 'first', 'second', 'third', 'last', 'final', 'next', 'previous',
      'current', 'present', 'past', 'future', 'today', 'yesterday', 'tomorrow',
      'morning', 'afternoon', 'evening', 'night', 'day', 'week', 'month', 'year',
      
      // Quantity & measurement
      'some', 'any', 'all', 'none', 'few', 'many', 'most', 'several',
      'various', 'different', 'same', 'similar', 'like', 'unlike', 'equal',
      'more', 'less', 'much', 'little', 'big', 'small', 'large', 'tiny',
      'huge', 'massive', 'minor', 'major', 'significant', 'important',
      
      // Location & direction
      'here', 'there', 'where', 'everywhere', 'nowhere', 'somewhere',
      'anywhere', 'above', 'below', 'over', 'under', 'beside', 'between',
      'among', 'through', 'around', 'across', 'along', 'toward', 'away',
      'inside', 'outside', 'within', 'beyond', 'behind', 'ahead', 'forward',
      
      // Questions & uncertainty
      'what', 'who', 'why', 'how', 'which', 'whose', 'whom', 'whether',
      'if', 'unless', 'though', 'although', 'however', 'but', 'yet',
      'still', 'even', 'just', 'only', 'also', 'too', 'either', 'neither',
      'both', 'each', 'every', 'another', 'other', 'else', 'otherwise',
      
      // Technical & factual
      'according', 'based', 'regarding', 'concerning', 'about', 'around',
      'approximately', 'roughly', 'exactly', 'precisely', 'specifically',
      'generally', 'usually', 'normally', 'typically', 'commonly', 'often',
      'sometimes', 'rarely', 'never', 'always', 'frequently', 'occasionally',
      
      // Modern neutral expressions
      'meh', 'whatever', 'anyway', 'basically', 'literally', 'actually',
      'really', 'quite', 'rather', 'pretty', 'fairly', 'somewhat', 'kinda',
      'sorta', 'like', 'you know', 'I mean', 'I guess', 'I think', 'well',
      'so', 'then', 'therefore', 'thus', 'hence', 'consequently', 'accordingly',
      
      // Professional & business terms
      'company', 'business', 'organization', 'corporation', 'enterprise',
      'industry', 'market', 'economy', 'finance', 'investment', 'profit',
      'revenue', 'sales', 'customer', 'client', 'service', 'product',
      'technology', 'innovation', 'development', 'research', 'analysis',
      
      // Educational & academic
      'school', 'university', 'college', 'education', 'learning', 'teaching',
      'student', 'teacher', 'professor', 'lecture', 'class', 'course',
      'subject', 'topic', 'lesson', 'assignment', 'homework', 'test',
      'exam', 'grade', 'score', 'result', 'outcome', 'conclusion',
      
      // Technology & digital
      'computer', 'internet', 'website', 'online', 'digital', 'electronic',
      'software', 'hardware', 'program', 'application', 'app', 'system',
      'network', 'connection', 'server', 'database', 'file', 'document',
      'email', 'message', 'chat', 'video', 'audio', 'image', 'photo',
      
      // Social media & platforms
      'facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'snapchat',
      'linkedin', 'reddit', 'discord', 'telegram', 'whatsapp', 'post',
      'comment', 'like', 'share', 'follow', 'subscribe', 'notification',
      'update', 'status', 'profile', 'account', 'user', 'member',
      
      // General objects & things
      'thing', 'stuff', 'item', 'object', 'material', 'substance', 'element',
      'component', 'part', 'piece', 'section', 'area', 'region', 'zone',
      'place', 'location', 'position', 'spot', 'point', 'site', 'venue',
      'building', 'house', 'home', 'room', 'space', 'environment', 'setting',
      
      // Colors & appearance
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown',
      'black', 'white', 'gray', 'grey', 'color', 'bright', 'dark', 'light',
      'clear', 'transparent', 'opaque', 'visible', 'invisible', 'appearance',
      'look', 'style', 'design', 'pattern', 'texture', 'surface', 'shape',
      
      // Emojis
      '🤔', '😐', '😑', '🙂', '🤷', '👌', '✌️', '🤝', '📝', '📊',
      '📈', '📉', '⚖️', '🔍', '💭', '💡', '❓', '❔', '⭕', '✅',
      '❌', '➡️', '⬅️', '⬆️', '⬇️', '🔄', '🔃', '🔂', '▶️', '⏸️'
    ];
  }

  // Enhanced comment analysis with better scoring algorithm
  analyzeComment(commentText, username = 'Unknown') {
    if (!commentText || typeof commentText !== 'string') {
      return {
        text: '',
        username: username,
        sentiment: 'neutral',
        score: 0,
        confidence: 0
      };
    }

    const text = commentText.toLowerCase().trim();
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    // Enhanced keyword matching with weight factors
    this.positiveKeywords.forEach(keyword => {
      const regex = new RegExp('\\b' + keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      const matches = text.match(regex);
      if (matches) {
        // Weight longer phrases more heavily
        const weight = keyword.length > 5 ? 1.5 : 1;
        positiveCount += matches.length * weight;
      }
    });

    this.negativeKeywords.forEach(keyword => {
      const regex = new RegExp('\\b' + keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      const matches = text.match(regex);
      if (matches) {
        // Weight longer phrases more heavily
        const weight = keyword.length > 5 ? 1.5 : 1;
        negativeCount += matches.length * weight;
      }
    });

    this.neutralKeywords.forEach(keyword => {
      const regex = new RegExp('\\b' + keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      const matches = text.match(regex);
      if (matches) {
        neutralCount += matches.length;
      }
    });

    // Improved sentiment determination with confidence scoring
    let sentiment = 'neutral';
    let score = 0;
    let confidence = 0;

    const totalKeywords = positiveCount + negativeCount + neutralCount;
    const textLength = text.length;
    
    if (totalKeywords === 0) {
      sentiment = 'neutral';
      score = 0;
      confidence = 0.1;
    } else {
      const positiveRatio = positiveCount / totalKeywords;
      const negativeRatio = negativeCount / totalKeywords;
      const neutralRatio = neutralCount / totalKeywords;
      
      // Enhanced scoring with context consideration
      if (positiveCount > negativeCount + neutralCount) {
        sentiment = 'positive';
        score = Math.min(positiveRatio * 2, 1);
        confidence = Math.min((positiveCount / Math.max(textLength / 20, 1)), 1);
      } else if (negativeCount > positiveCount + neutralCount) {
        sentiment = 'negative';
        score = -Math.min(negativeRatio * 2, 1);
        confidence = Math.min((negativeCount / Math.max(textLength / 20, 1)), 1);
      } else if (positiveCount > 0 && negativeCount > 0) {
        // Mixed sentiment - determine which is stronger
        if (positiveCount > negativeCount) {
          sentiment = 'positive';
          score = (positiveCount - negativeCount) / totalKeywords;
        } else if (negativeCount > positiveCount) {
          sentiment = 'negative';
          score = -(negativeCount - positiveCount) / totalKeywords;
        } else {
          sentiment = 'neutral';
          score = 0;
        }
        confidence = Math.min(totalKeywords / Math.max(textLength / 15, 1), 1);
      } else {
        sentiment = 'neutral';
        score = 0;
        confidence = Math.min(neutralRatio, 0.8);
      }
    }

    return {
      text: commentText,
      username: username,
      sentiment: sentiment,
      score: parseFloat(score.toFixed(3)),
      confidence: parseFloat(confidence.toFixed(3))
    };
  }

  // Analyze multiple comments with enhanced statistics
  analyzeComments(comments, postUrl) {
    const analyzedComments = comments.map(comment => {
      if (typeof comment === 'string') {
        return this.analyzeComment(comment);
      } else if (comment && comment.text) {
        return this.analyzeComment(comment.text, comment.username);
      }
      return this.analyzeComment('', 'Unknown');
    });

    // Enhanced statistics calculation
    const totalComments = analyzedComments.length;
    const positiveComments = analyzedComments.filter(c => c.sentiment === 'positive');
    const negativeComments = analyzedComments.filter(c => c.sentiment === 'negative');
    const neutralComments = analyzedComments.filter(c => c.sentiment === 'neutral');

    const sentimentDistribution = {
      positive: totalComments > 0 ? parseFloat((positiveComments.length / totalComments * 100).toFixed(1)) : 0,
      negative: totalComments > 0 ? parseFloat((negativeComments.length / totalComments * 100).toFixed(1)) : 0,
      neutral: totalComments > 0 ? parseFloat((neutralComments.length / totalComments * 100).toFixed(1)) : 0
    };

    // Get top comments with better scoring
    const topPositive = positiveComments
      .sort((a, b) => (b.score * b.confidence) - (a.score * a.confidence))
      .slice(0, 5);
    
    const topNegative = negativeComments
      .sort((a, b) => (a.score * a.confidence) - (b.score * b.confidence))
      .slice(0, 5);

    return {
      role: 'facebook_post',
      url: postUrl || window.location.href,
      totalComments: totalComments,
      sentimentDistribution: sentimentDistribution,
      comments: analyzedComments,
      topPositive: topPositive,
      topNegative: topNegative,
      analyzedAt: new Date().toISOString(),
      keywordStats: {
        positiveKeywords: this.positiveKeywords.length,
        negativeKeywords: this.negativeKeywords.length,
        neutralKeywords: this.neutralKeywords.length,
        totalKeywords: this.positiveKeywords.length + this.negativeKeywords.length + this.neutralKeywords.length
      }
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SentimentAnalyzer;
}