var hello = document.getElementById('hello')
var at = document.getElementById('at')
var dotcom = document.getElementById('dotcom')
var social = document.getElementById('social')
var links = document.getElementById('links')

function moverWeb () {
  hello.style.fill = ('#dddddd')
  at.style.fill = ('#dddddd')
}

function moverSocial () {
  hello.style.fill = ('#dddddd')
  dotcom.style.fill = ('#dddddd')

  links.classList.add('hover')
}

function resetEmail () {
  hello.style.fill = ('#222222')
  at.style.fill = ('#222222')
  dotcom.style.fill = ('#222222')

  links.classList.remove('hover')
}

function moverLink () {
  social.classList.add('hover')

  hello.style.fill = ('#dddddd')
  dotcom.style.fill = ('#dddddd')
}

function moutLink () {
  social.classList.remove('hover')

  hello.style.fill = ('#222222')
  dotcom.style.fill = ('#222222')
}
