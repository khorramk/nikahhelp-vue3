const thankfulThings = [
  {
    label: "For being born",
    value: "For being born",
    description:
      "You would not experience life and the wonders of creation if you were not born.",
  },
  {
    label: "Siblings",
    value: "Siblings",
    description:
      "Even if there is sibling rivalary, your sibling is more likely to stand up for you and protect you rather than a stranger.",
  },
  {
    label: "Teacher",
    value: "Teacher",
    description:
      "A good teacher leaves their imprint on your life, listen to you, care for you, they teach you selflessness, co-operation, consideration, empathy, sympathy, curiosity and love of learning, love your questions and make you feel special.",
  },
  {
    label: "Charties and NGOs",
    value: "Charties and NGOs",
    description: "They are there to help the needy and those who have fallen through the cracks, showing humanity never stops despite borders, prejudice, inquality, war, oppression and couuntless other difficulties.",
  },
  {
    label: "Being able to do charitable work",
    value: "Being able to do charitable work",
    description:
      "A smile is a charity, anyone can do charitable work every day of their life, we just need to look for opportunity to help others, say a good word, talk to someone who is feeling down, conttribute financially and support the good work of others, and speak out agianst oppression and injustice.",
  },
  {
    label: "Good Health",
    value: "Good Health",
    description: "Even if your health isn't great, it could be worse and you likely still have some working parts to be thankful for.",
  },
  {
    label: "Money in the Bank",
    value: "Money in the Bank",
    description: "Having just a few coins makes you richer than most people on Earth.",
  },
  {
    label: "Good Friends",
    value: "Good Friends",
    description:
      "Often, it's the quality of friendships, not the quantity.",
  },
  {
    label: "Freedom of Religion",
    value: "Freedom of Religion",
    description: "Being able to worship whomever and however you want is something many people don't ever experience.",
  },
  {
    label: "My Parents",
    value: "My Parents",
    description:
      "Even they are now in their old age, but they looked after me when I was little. I am what I am now, it is because of them. ",
  },
  {
    label: "Weekends or quiet time",
    value: "Weekends or quiet time",
    description:
      "There is something magical about weekends or quiet time",
  },
  {
    label: "Having a Partner",
    value: "Having a Partner",
    description:
      "Being in a romantic relationship can teach you so much about the world and yourself.",
  },
  {
    label: "Pets",
    value: "Pets",
    description:
      "Pets offer one of the best examples of unconditional love.",
  },
  {
    label: "Learning from Mistakes",
    value: "Learning from Mistakes",
    description:
      "If we never made mistakes, we wouldn't learn much so it is one of those things we should be thankful for.",
  },
  {
    label: "Opportunity to Get an Education",
    value: "Opportunity to Get an Education",
    description:
      "The opportunity to attend school is something many people don't have.",
  },
  {
    label: "Laughter",
    value: "Laughter",
    description: "Without laughter, the world would be a sad place.",
  },
  {
    label: "Having a Home",
    value: "Having a Home",
    description:
      "Whether you live in an apartment, a mansion, or a tent, having a place to call home is something to be thankful for",
  },
  {
    label: "An Ability to Read",
    value: "An Ability to Read",
    description:
      "If you are reading this right now, you have a lot to be thankful for.",
  },
  {
    label: "Breathing Fresh Air",
    value: "Breathing Fresh Air",
    description:
      "Being able to step outside to breathe in fresh air is a good reminder how many little things we should be thankful for.",
  },
  {
    label: "A Bed to Sleep",
    value: "A Bed to Sleep",
    description:
      "A bed is one of those things that is easy to take for granted, until you don't have one.",
  },
  // {
  //   label: "Laughter",
  //   value: "Laughter",
  //   description: "Without laughter, the world would be a sad place.",
  // },
  {
    label: "Safety and Security",
    value: "Safety and Security",
    description: "Being able to wake up without immense fear frees us up to really live life.",
  },
  {
    label: "Cars and transport",
    value: "Cars and transport",
    description:
      "Without cars and transport, it would take a lot longer to get our activities done.",
  },
  {
    label: "Sunshine",
    value: "Sunshine",
    description:
      "The sun's warmth can brighten any day, benefits us and other life forms.",
  },
  {
    label: "Time",
    value: "Time",
    description: "Although we often don't think there's enough of it, time is something we shouldn't take for granted.",
  },
  {
    label: "Clean Water",
    value: "Clean Water",
    description: "Many people on earth lack access to clean water.",
  },
  {
    label: "Love",
    value: "Love",
    description: "The world sure would be a different place if we lacked the ability to love.",
  },
  // {
  //   label: "Time",
  //   value: "Time",
  //   description: "Although we often don't think there's enough of it, time is something we shouldn't take for granted.",
  // },
  {
    label: "Books",
    value: "Books",
    description: "Books provide an opportunity to enter another world all from the comfort of your own home.",
  },
  {
    label: "Kindness of Strangers",
    value: "Kindness of Strangers",
    description: "Never take the kindness of a stranger for granted.",
  },
  {
    label: "Campfires",
    value: "Campfires",
    description: "The simplicity of a campfire creates lifelong memories.",
  },
  {
    label: "Pain",
    value: "Pain",
    description:
      "Without pain, it would be difficulty to appreciate life’s joys.",
  },
  {
    label: "Art",
    value: "Art",
    description: "The world would be less beautiful if art didn’t exist.",
  },
  {
    label: "Holidays",
    value: "Holidays",
    description:
      "Any reason to celebrate is something we should be thankful for.",
  },
  {
    label: "Freedom of Speech",
    value: "Freedom of Speech",
    description:
      "Being able to express your thoughts and feelings freely should never be taken for granted.",
  },
  {
    label: "Rainbows",
    value: "Rainbows",
    description: "The beauty of a rainbow is unmatched.",
  },
  {
    label: "Tears",
    value: "Tears",
    description:
      "Sometimes when there are no words to say, tears express how we feel for us.",
  },
  {
    label: "Waking up Today",
    value: "Waking up Today",
    description:
      "Simply waking up today means you have things to be thankful for.",
  },

  {
    label: "Indoor Plumbing",
    value: "Indoor Plumbing",
    description:
      "Indoor plumbing not only provides convenience, it spares us from disease.",
  },
  {
    label: "Wisdom that Comes with Age",
    value: "Wisdom that Comes with Age",
    description: "Thankfully, we grow smarter over time.",
  },
  {
    label: "Mountains",
    value: "Mountains",
    description: "Mountains provide us with beauty and recreation.",
  },
  {
    label: "Eyesight",
    value: "Eyesight",
    description: "Being able to see allows us to view the world’s beauty.",
  },
  {
    label: "Grocery Stores",
    value: "Grocery Stores",
    description:
      "Grocery stores mean we don’t have to spend all of our time getting our own food.",
  },
  {
    label: "Sunsets",
    value: "Sunsets",
    description:
      "Sunsets are a reminder that we should enjoy the simple things in life.",
  },
  {
    label: "Entertainment",
    value: "Entertainment",
    description: "Entertainment gives us a way to relax and enjoy life.",
  },
  {
    label: "My Mind",
    value: "My Mind",
    description:
        "Being able to think, remember, and solve problems sure makes life easier.",
  },
  {
    label: "Employment",
    value: "Employment",
    description:
      "Even if you don’t like your job, being employed means someone thought you were special enough to hire.",
  },
  {
    label: "Diversity",
    value: "Diversity",
    description: "The world would be a boring place without diversity.",
  },
  {
    label: "Moon and Stars",
    value: "Moon and Stars",
    description: "The moon and stars encourage us to dream.",
  },
  {
    label: "Electricity",
    value: "Electricity",
    description: "Electricity makes most of our chores efficient.",
  },
  {
    label: "Air Conditioning",
    value: "Air Conditioning",
    description:
      "Staying cool on a hot day is something people wouldn’t have dreamed about in past centuries.",
  },
  {
    label: "Hearing",
    value: "Hearing",
    description:
      "Being able to hear your loved one’s voice is something that not everyone gets to do.",
  },
  {
    label: "Children",
    value: "Children",
    description:
      "Watching children laugh, grow, and dream can keep things in perspective.",
  },
  {
    label: "Ability to Learn",
    value: "Ability to Learn",
    description:
      "The ability to learn new things means we have endless potential.",
  },
  {
    label: "People Willing to Teach",
    value: "People Willing to Teach",
    description:
      "Whether it’s your grandmother teaching you to knit or your plumber showing you how to prevent future problems, be grateful that others are willing to use their time and talents to teach you something new.",
  },
  {
    label: "Oceans",
    value: "Oceans",
    description:
      "The sea creatures in the ocean almost seem too mystical to be real.",
  },
  {
    label: "Modern Medicine",
    value: "Modern Medicine",
    description:
      "Without advances in modern medicine, many of us wouldn’t be alive.",
  },
  {
    label: "Music",
    value: "Music",
    description: "Music brings out new emotions.",
  },
  {
    label: "Entrepreneurs and inventors",
    value: "Entrepreneurs and inventors",
    description:
      "Some of life’s best inventions resulted from an entrepreneur who was willing to take a risk.",
  },
  {
    label: "Warm Clothing",
    value: "Warm Clothing",
    description:
      "On a cold day, there’s nothing more important than warm clothing.",
  },
  {
    label: "Freedom to Vote",
    value: "Freedom to Vote",
    description:
      "Being able to have a say in the laws should never be taken for granted.",
  },
  {
    label: "An Internet Connection",
    value: "An Internet Connection",
    description:
      "It’s hard to believe how easy it is to take the internet for granted, seeing how none of us had just a couple of decades ago.",
  },
  {
    label: "Challenges",
    value: "Challenges",
    description:
      "Without challenges in life, we wouldn’t be the people we are now.",
  },
  {
    label: "Hiking Trails",
    value: "Hiking Trails",
    description:
      "Hiking trails give us the chance to enjoy mother’s nature beauty.",
  },
  {
    label: "Vaccines",
    value: "Vaccines",
    description: "Many of us wouldn’t be alive without today’s vaccinations.",
  },
  {
    label: "Armed Forces",
    value: "Armed Forces",
    description:
      "Our lives would likely be very different if we didn’t have protection from the armed forces.",
  },
  {
    label: "Being thankful",
    value: "Being thankful",
    description:
      "Realizing all the things you should be thankful for is the first step, practicing gratitude is what you should start doing.",
  },
  {
    label: "Other",
    value: "Other",
    description:
        "Please add what you are thankful for and the reason why you are thankful",
  },
];
export default thankfulThings;
