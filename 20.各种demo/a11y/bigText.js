const ruleType = (target) => {
  const __role = !!target.getAttribute('role') && target.getAttribute('role').toUpperCase() || target.tagName.toUpperCase()

  const __roleName = {
    IMG: '图片',
    BUTTON: '按钮',
    INPUT: '输入框',
    CHECKBOX: '复选框',
    RADIO: '单选框',
    OPTION: '下拉框',
    A: '链接'
  }
  if (__role == 'INPUT') {
    if (target.type == 'radio') {
      return '单选框';
    } else if (target.type == 'checkbox') { // button reset file
      return '复选框';
    } else if (target.type == 'text') { // button reset file
      return '文本框';
    } else if (target.type == 'submit') {
      return '提交按钮';
    } else if (target.type == 'reset') {
      return '重置按钮';
    } else if (target.type == 'password') {
      return '密码输入框';
    } else {
      return '输入框';
    }
  }
  return __roleName[__role] || '文本'
}
const parseTagText = (target) => {
  const __name = ruleType(target)
  const __role = !!target.getAttribute('role') && target.getAttribute('role').toUpperCase()

  if (__role === 'A' || target.tagName === 'A') {
    console.log('这是一个链接:' + target.alt || target.title || target.innerText);
    return `链接 ${target.alt || target.title || target.innerText}`;
  }

  if (target.children.length === 0) {
    if (__role === 'IMG' || target.tagName === 'IMG') {
      console.log('这是一张图片:' + target.alt || target.title);
      return `图片 ${target.alt || target.title}`;
    }
    if (__role === 'BUTTON' || target.tagName === 'BUTTON') {
      console.log('这是一个按钮:' + target.innerText);
      return `按钮 ${target.alt || target.title || target.innerText}`;
    }
    if (__role === 'INPUT' || target.tagName === 'INPUT') {
      console.log(`这是一个${__name}:` + target.alt || target.title || target.value);
      return `${__name} ${target.alt || target.title || target.value}`;
    }

    if (__role === 'LABEL' || target.tagName === 'LABEL') {
      const __linkId = target.getAttribute('for')
      const __linkDom = document.getElementById(__linkId)
      if (!!__linkDom && !!__linkDom.type && __linkDom.type == 'radio') {
        console.log(`这是一个单选:` + target.alt || target.title || target.innerText);
        return `单选 ${target.alt || target.title || target.innerText}`;
      }
    }

    if (target.alt || target.title || target.innerText) {
      console.log(`${__name} ${target.alt || target.title || target.innerText}`);
      return `${__name} ${target.alt || target.title || target.innerText}`;
    }
    return ''
  }

  if (target.children.length < 5 && (target.alt || target.title || target.innerText)) {
    console.log(`${__name} ${target.alt || target.title || target.innerText}`);
    return `${__name} ${target.alt || target.title || target.innerText}`;
  }

  return ''

}




const mouseOver = (event) => {
  var event = window.event || event;
  var target = event.target || event.srcElement;
  var __parentNodeId = target.parentNode.id
  var __isAssist = __parentNodeId.indexOf('BigText') > -1
  const activeBtn = document.getElementById('BigText')
  activeBtn.innerText = parseTagText(target);
  if (__isAssist || activeBtn.innerText == '文本') {
    activeBtn.innerText = ''
    return
  }
}

const addEvent = (element, type, callback) => {
  const ignore = ['DOMContentLoaded']
  let __type = ignore.includes(type) ? type : 'on' + type
  if (element.addEventListener) {
    element.addEventListener(type, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent(__type, callback);
  } else {
    element[__type] = callback;
  }
}

addEvent(document.querySelector('body'), 'mouseover', mouseOver)