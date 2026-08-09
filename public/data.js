// Six Linkin Park songs from four periods of the band's career, used as
// English material.
//
// No lyrics are stored here, by design. The teaching layer below is written
// from scratch; the words themselves are pasted into the page at lesson time
// and never leave the browser. See the note in index.html.

const SONGS = [
  {
    id: 'in-the-end',
    title: 'In the End',
    album: 'Hybrid Theory',
    year: 2000,
    era: 'The nu-metal years',
    about:
      'A song about effort that leads nowhere — the frustration of giving everything to a relationship, a job or a goal and watching it fall apart anyway. The rapped verse and sung chorus became the template for the band\'s early sound, and this is still the song most people meet them through.',
    aboutZh:
      '一首關於「白費力氣」的歌——把一切投入一段關係、一份工作或一個目標，最後卻眼睜睜看著它瓦解。饒舌主歌加上旋律副歌的結構，奠定了樂團早期的聲音，也是多數人認識他們的第一首歌。',
    vocab: [
      {
        word: 'matter',
        pos: 'v.',
        gloss: 'to be important',
        zh: '重要、有影響',
        example: 'It doesn\'t matter how long the report takes, as long as it is right.',
      },
      {
        word: 'effort',
        pos: 'n.',
        gloss: 'the work and energy you put into something',
        zh: '努力、心力',
        example: 'She put a lot of effort into the presentation.',
      },
      {
        word: 'futile',
        pos: 'adj.',
        gloss: 'certain to fail; pointless',
        zh: '徒勞的、白費的',
        example: 'Arguing with him about it was futile — he had already decided.',
      },
      {
        word: 'slip away',
        pos: 'phr. v.',
        gloss: 'to disappear slowly, without you being able to stop it',
        zh: '悄悄溜走、逐漸失去',
        example: 'I could feel the opportunity slipping away.',
      },
      {
        word: 'fall apart',
        pos: 'phr. v.',
        gloss: 'to break into pieces; to stop working or succeeding',
        zh: '瓦解、崩潰',
        example: 'The deal fell apart three days before we signed.',
      },
      {
        word: 'in the end',
        pos: 'idiom',
        gloss: 'after everything that happened; finally',
        zh: '到頭來、最後',
        example: 'We tried four suppliers, and in the end we went back to the first one.',
      },
    ],
    focus: {
      title: 'It doesn\'t matter + wh-word',
      body:
        '<em>Matter</em> here is a verb, not a noun. The pattern is <strong>It doesn\'t matter</strong> + <em>what / how / who / when / where</em> + clause. Note the word order after the wh-word: it is statement order, not question order.',
      examples: [
        'It doesn\'t matter <strong>what</strong> you say. (not: <s>what do you say</s>)',
        'It doesn\'t matter <strong>how hard</strong> we try.',
        'It doesn\'t matter <strong>who</strong> started it.',
      ],
    },
    questions: [
      'Tell me about something you worked hard at that did not work out. What happened?',
      'Is effort still worth something when the result is a failure? Why?',
      'Which matters more to you — the result, or how you got there?',
    ],
  },

  {
    id: 'numb',
    title: 'Numb',
    album: 'Meteora',
    year: 2003,
    era: 'The nu-metal years',
    about:
      'Someone worn down by another person\'s expectations — a parent, a boss, a teacher — until they stop feeling anything at all. The song is written from the point of view of the person being pressured, which is why it lands so hard with teenagers and, quietly, with adults too.',
    aboutZh:
      '一個被他人期待壓垮的人——父母、上司、老師——壓到最後什麼感覺都沒有了。整首歌是從「被期待的那一方」的角度寫的，這也是為什麼它對青少年特別有力，對大人也一樣，只是安靜一點。',
    vocab: [
      {
        word: 'numb',
        pos: 'adj.',
        gloss: 'unable to feel anything, physically or emotionally',
        zh: '麻木的、失去知覺的',
        example: 'After the third round of layoffs, everyone in the office had gone numb.',
      },
      {
        word: 'expectation',
        pos: 'n.',
        gloss: 'what someone believes you should do or become',
        zh: '期望、期待',
        example: 'He grew up under enormous expectations from his father.',
      },
      {
        word: 'live up to',
        pos: 'phr. v.',
        gloss: 'to be as good as someone hoped or expected',
        zh: '達到（期望）、不辜負',
        example: 'The film didn\'t quite live up to the reviews.',
      },
      {
        word: 'suffocate',
        pos: 'v.',
        gloss: 'to be unable to breathe; to make someone feel trapped and unable to breathe',
        zh: '窒息、令人喘不過氣',
        example: 'I love my family, but sometimes the attention suffocates me.',
      },
      {
        word: 'disappoint',
        pos: 'v.',
        gloss: 'to make someone sad by not being what they hoped',
        zh: '使失望',
        example: 'I\'d rather say no now than disappoint them later.',
      },
      {
        word: 'aware',
        pos: 'adj.',
        gloss: 'noticing or knowing that something is true',
        zh: '意識到的、察覺的',
        example: 'Are you aware of how often you apologise in meetings?',
      },
    ],
    focus: {
      title: 'tired of + -ing, and become / get / go + adjective',
      body:
        'After <em>tired of</em>, <em>sick of</em> and <em>afraid of</em>, a verb takes <strong>-ing</strong>, never <em>to</em>. And <em>become / get</em> + adjective describes a change of state — the difference between <em>I am numb</em> (a fact) and <em>I became numb</em> (a process). <em>Go</em> + adjective does the same job but only with a fixed set of mostly unwanted or natural changes — <em>go numb, go quiet, go blind, go grey</em> — never <s>go tired</s> or <s>go frustrated</s>.',
      examples: [
        'I\'m tired of <strong>explaining</strong> the same thing. (not: <s>tired to explain</s>)',
        'She got <strong>frustrated</strong> and left.',
        'Over ten years he became <strong>very careful</strong> about what he promised.',
        'Twenty minutes in the cold and his hands <strong>went numb</strong>. (not: <s>went tired</s>)',
      ],
    },
    questions: [
      'Whose expectations do you feel most in your life right now?',
      'Is there a situation at work where you have stopped reacting? Describe it.',
      'What is the difference between being calm and being numb?',
    ],
  },

  {
    id: 'somewhere-i-belong',
    title: 'Somewhere I Belong',
    album: 'Meteora',
    year: 2003,
    era: 'The nu-metal years',
    about:
      'The search for a place, a person, or a version of yourself that feels like home. Less angry than the songs around it and more honest — the singer admits he does not yet know what he is looking for, only that he has not found it.',
    aboutZh:
      '尋找一個地方、一個人，或一個「像自己」的版本。比同專輯其他歌少了憤怒、多了誠實——他承認自己也還不知道在找什麼，只知道還沒找到。',
    vocab: [
      {
        word: 'belong',
        pos: 'v.',
        gloss: 'to feel happy and accepted in a place or group',
        zh: '歸屬、屬於',
        example: 'It took two years before I felt I belonged in that company.',
      },
      {
        word: 'let go',
        pos: 'phr. v.',
        gloss: 'to stop holding something; to stop trying to control it',
        zh: '放手、放下',
        example: 'You have to let go of the idea that everyone will agree with you.',
      },
      {
        word: 'heal',
        pos: 'v.',
        gloss: 'to become well again, in body or in feeling',
        zh: '痊癒、療癒',
        example: 'It took her years to heal after that argument.',
      },
      {
        word: 'lost',
        pos: 'adj.',
        gloss: 'not knowing where you are or what to do next',
        zh: '迷失的、茫然的',
        example: 'I felt completely lost in my first month abroad.',
      },
      {
        word: 'reach for',
        pos: 'phr. v.',
        gloss: 'to stretch towards something you want',
        zh: '伸手去拿、努力追求',
        example: 'He reached for a career he could actually explain to his parents.',
      },
      {
        word: 'genuine',
        pos: 'adj.',
        gloss: 'real, not pretended',
        zh: '真誠的、真正的',
        example: 'Her interest in the job was genuine.',
      },
    ],
    focus: {
      title: 'somewhere / anywhere / nowhere + a describing clause',
      body:
        'These words behave like nouns and can be followed directly by a clause with no <em>that</em> and no preposition. <strong>Somewhere I belong</strong> = <em>a place where I belong</em>. Notice the same trick with <em>something</em>, <em>someone</em>, <em>anything</em>.',
      examples: [
        'I want to live <strong>somewhere I can walk to work</strong>.',
        'There is <strong>nothing I can do</strong> about it.',
        'She is <strong>someone I trust</strong>.',
      ],
    },
    questions: [
      'Where do you feel most like yourself? Describe the place.',
      'Have you ever joined a group and never felt part of it? What was missing?',
      'What is one thing you should probably let go of this year?',
    ],
  },

  {
    id: 'waiting-for-the-end',
    title: 'Waiting for the End',
    album: 'A Thousand Suns',
    year: 2010,
    era: 'The experimental years',
    about:
      'The strange, empty space after something has finished but before the next thing has started. Musically it is a long way from where the band began — electronic, half-sung, half-rapped — and it split their audience straight down the middle.',
    aboutZh:
      '一件事已經結束、下一件事還沒開始的那段空白，既奇怪又空。音樂上離樂團的出發點已經很遠——電子、半唱半饒舌——也把歌迷分成了兩半。',
    vocab: [
      {
        word: 'hold on',
        pos: 'phr. v.',
        gloss: 'to keep going through something difficult; to keep gripping',
        zh: '撐住、堅持',
        example: 'Just hold on until the end of the quarter.',
      },
      {
        word: 'move on',
        pos: 'phr. v.',
        gloss: 'to leave a situation or feeling behind and continue',
        zh: '向前走、放下過去',
        example: 'He never really moved on after the company closed.',
      },
      {
        word: 'regret',
        pos: 'n. / v.',
        gloss: 'sadness about something you did or failed to do',
        zh: '後悔、遺憾',
        example: 'My only regret is that I didn\'t ask sooner.',
      },
      {
        word: 'grip',
        pos: 'v. / n.',
        gloss: 'to hold something very tightly',
        zh: '緊握、抓牢',
        example: 'She gripped the handrail the whole way down.',
      },
      {
        word: 'transition',
        pos: 'n.',
        gloss: 'the period of changing from one state to another',
        zh: '過渡、轉變期',
        example: 'The transition from student to employee took me about a year.',
      },
      {
        word: 'inevitable',
        pos: 'adj.',
        gloss: 'certain to happen; impossible to avoid',
        zh: '無可避免的',
        example: 'Once the funding stopped, closing the office was inevitable.',
      },
    ],
    focus: {
      title: 'wait for + object + to + verb',
      body:
        'You do not <s>wait something</s> — you <strong>wait for</strong> it. When a second person or thing does the action, the pattern is <strong>wait for + noun + to + verb</strong>. Compare with <em>waiting to hear</em>, where the same person does both actions.',
      examples: [
        'I\'m waiting for <strong>the rain to stop</strong>.',
        'We\'re waiting for <strong>her to decide</strong>.',
        'I\'m waiting <strong>to hear</strong> from them. (same person — no <em>for</em>)',
      ],
    },
    questions: [
      'Are you in the middle of a transition right now? What ended, and what has not started?',
      'What is something you held on to for too long?',
      'When is waiting a good strategy, and when is it just avoidance?',
    ],
  },

  {
    id: 'one-more-light',
    title: 'One More Light',
    album: 'One More Light',
    year: 2017,
    era: 'The quiet album',
    about:
      'A song written for a friend of the band who had died, arguing that one person\'s loss still matters even though the world is enormous and keeps moving. Chester Bennington died two months after the album came out, and the song became the way a great many people mourned him.',
    aboutZh:
      '這首歌是為樂團一位過世的朋友寫的，講的是：即使世界這麼大、又不停往前走，一個人的離開仍然重要。專輯發行兩個月後 Chester Bennington 過世，於是這首歌成了許多人悼念他的方式。',
    vocab: [
      {
        word: 'grief',
        pos: 'n.',
        gloss: 'deep sadness, especially after someone dies',
        zh: '悲慟、哀傷',
        example: 'Grief doesn\'t follow a schedule.',
      },
      {
        word: 'care',
        pos: 'v.',
        gloss: 'to feel that someone or something is important to you',
        zh: '在乎、關心',
        example: 'People care more than they say out loud.',
      },
      {
        word: 'go out',
        pos: 'phr. v.',
        gloss: '(of a light or fire) to stop burning or shining',
        zh: '熄滅',
        example: 'The candle went out before anyone noticed.',
      },
      {
        word: 'count',
        pos: 'v.',
        gloss: 'to be worth something; to be included as important',
        zh: '算數、有分量',
        example: 'Small kindnesses count more than people think.',
      },
      {
        word: 'grateful',
        pos: 'adj.',
        gloss: 'feeling thankful',
        zh: '感激的、心懷感謝',
        example: 'I\'m grateful you called when you did.',
      },
      {
        word: 'reach out',
        pos: 'phr. v.',
        gloss: 'to contact someone, often to offer or ask for help',
        zh: '主動聯繫、伸出援手',
        example: 'If it gets heavy, reach out to someone. Don\'t wait.',
      },
    ],
    focus: {
      title: '"Who cares?" — the same words, two opposite meanings',
      body:
        'The same words carry both meanings. Dismissive, it means <em>nobody does, and it isn\'t important</em>. Genuine, it asks who is actually affected. The <strong>if</strong>-clause is not the cue — <em>Who cares if it rains?</em> is usually dismissive too. Stance and context decide, and intonation helps: falling and flat is dismissive, rising and slow is genuine.',
      examples: [
        '<strong>Who cares?</strong> It\'s only a draft. (dismissive)',
        '<strong>Who cares if</strong> one client leaves quietly? (genuine — the answer is: the whole team should)',
        'Compare: <strong>So what?</strong> vs. <strong>Then what?</strong>',
      ],
    },
    questions: [
      'Who would notice first if you had a very bad week? How would they notice?',
      'What do people in your culture say to someone who is grieving? Does it help?',
      'How do you tell the difference between someone who is tired and someone who is struggling?',
    ],
  },

  {
    id: 'heavy-is-the-crown',
    title: 'Heavy Is the Crown',
    album: 'From Zero',
    year: 2024,
    era: 'The return',
    about:
      'The cost of being at the top — the weight that arrives with the position. This is the band\'s first era with Emily Armstrong sharing vocals, seven years after they stopped, and the title is a deliberate old-fashioned inversion that makes the sentence sound like a warning.',
    aboutZh:
      '站上高位要付的代價——位置一到，重量也跟著來。這是樂團停了七年之後、由 Emily Armstrong 加入共同主唱的第一個時期；歌名刻意用了老派的倒裝，讓整句話聽起來像一句警告。',
    vocab: [
      {
        word: 'crown',
        pos: 'n.',
        gloss: 'what a king or queen wears; a symbol of power',
        zh: '王冠、王位',
        example: 'She wore the crown for eleven years.',
      },
      {
        word: 'burden',
        pos: 'n.',
        gloss: 'a heavy load, usually a responsibility',
        zh: '負擔、重擔',
        example: 'Being the only one who speaks English became a burden.',
      },
      {
        word: 'earn',
        pos: 'v.',
        gloss: 'to get something because you deserve it',
        zh: '賺得、贏得',
        example: 'Trust is earned slowly and lost quickly.',
      },
      {
        word: 'deserve',
        pos: 'v.',
        gloss: 'to be good enough to receive something',
        zh: '值得、應得',
        example: 'After that quarter, the team deserved a proper break.',
      },
      {
        word: 'carry',
        pos: 'v.',
        gloss: 'to hold and move something; to take responsibility for it',
        zh: '扛、承擔',
        example: 'He carried the whole project for six months.',
      },
      {
        word: 'take its toll',
        pos: 'idiom',
        gloss: 'to cause damage slowly over time',
        zh: '造成損耗、逐漸消耗',
        example: 'The travel schedule started to take its toll.',
      },
    ],
    focus: {
      title: 'Inversion for emphasis: adjective first',
      body:
        'Normal order is <em>The crown is heavy</em>. Putting the adjective first — <strong>Heavy is the crown</strong> — is a literary inversion that throws all the weight onto the adjective. It sounds formal, proverbial, slightly biblical. Useful to recognise; use it sparingly.',
      examples: [
        'Normal: <em>The road ahead is long.</em> → Inverted: <strong>Long is the road ahead.</strong>',
        'Normal: <em>His fall was great.</em> → Inverted: <strong>Great was his fall.</strong>',
        'Everyday cousin: <strong>Never</strong> have I seen anything like it.',
      ],
    },
    questions: [
      'What is the heaviest responsibility you carry right now?',
      'Has anyone ever handed you a position you did not feel ready for? What happened?',
      'Can a team survive replacing the person at the front? What has to be true for it to work?',
    ],
  },
];
