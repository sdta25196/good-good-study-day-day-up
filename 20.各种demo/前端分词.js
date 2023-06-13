// 获取分句
const segmenter = new Intl.Segmenter(
  'zh', { granularity: 'sentence' }
  // 'zh', { granularity: 'word' } // 词
);

console.log(
  Array.from(
    segmenter.segment('你好，我是 ConardLi。我来了！你是谁？你在哪？'),
    s => s.segment
  )
);


// 获取分词

var a = new Intl.Segmenter('zh', { granularity: 'word' });

Array.from(a.segment('你好，我是 ConardLi。我来了！你是谁？你在哪？')).filter(s => s.isWordLike).map(s => s.segment)