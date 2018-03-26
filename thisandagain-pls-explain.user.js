// ==UserScript==
// @name         thisandagain Summoner
// @namespace    thisandagainPlsExplainThisPost
// @version      2.0
// @description  Adds a button to posts to magically summon @thisandagain
// @author       Zro716
// @match        https://scratch.mit.edu/discuss/*
// @grant        none
// ==/UserScript==

const csrf = document.cookie.match(/scratchcsrftoken=([0-9a-zA-Z]+)/)[1]

// the only textarea is the markitup editor which is only shown if the user is logged in
if (document.querySelector('textarea')) {
	var posts = document.querySelectorAll('.blockpost.roweven.firstpost')
	if (posts.length) for (var p = 0, plsexplain, btn, id, ul; p < posts.length; ++p) {
		id = posts[p].id.match(/\d+/)[0]
		
		plsexplain = document.createElement('li')
		//plsexplain.appendChild(document.createTextNode('| '))
		
		btn = document.createElement('button')
		btn.innerHTML = 'thisandagain pls explain'
		btn.id = id
		btn.addEventListener('click', function (e) {
			if (!confirm('Are you sure you want to summon thisandagain? Remember, please do not use this to spam him.')) return;
			
			var xhr = new XMLHttpRequest()
			xhr.open('POST', 'https://scratch.mit.edu/site-api/comments/user/thisandagain/add/', true)
			xhr.setRequestHeader('X-CSRFToken', csrf)
			xhr.onload = function () {
				if (xhr.status == 200) {
					alert('thisandagain has been summoned. Please be patient while he arrives.')
				} else {
					console.error(xhr.response)
					alert('Oops! An error happened.')
				}
			}
			
			xhr.send(JSON.stringify({
				content: `@thisandagain pls explain https://scratch.mit.edu/discuss/post/${e.target.id}/`, 
				parent_id: '', 
				commentee_id: ''
			}))
		})
		
		plsexplain.appendChild(btn)
		ul = posts[p].querySelector('.postfootright>ul')
		ul.insertBefore(plsexplain, ul.firstChild.nextSibling)
	}
}

