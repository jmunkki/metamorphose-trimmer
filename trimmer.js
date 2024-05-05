// MIT License
// 
// Copyright (c) 2024 Juri Munkki
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


// Determine if the table is a link of page links
function isFirstTdPage(table) {
	const firstTd = table.getElementsByTagName('td')[0];
	return firstTd && firstTd.textContent.trim() === 'Page';
}

//	Prune page links from threads with too many pages
function trimPageLinks() {
	// Define the number of links to always show at the start and end
	const tables = document.getElementsByTagName('table');
	const startShow = 5;
	const endShow = 10;
	const maxMiddleLinks = 10;
	
	let toRemove = [];
	// Find the tables for each thread that has page links
	for(let table of tables) {
		if (isFirstTdPage(table)) {
			// Calculate the number of middle links to show
			const links = Array.from(table.querySelectorAll('table td a'));
			const totalLinks = links.length;
			const middleLinks = totalLinks - startShow - endShow;
			if(middleLinks > maxMiddleLinks) {
				// Schedule to remove some of the links in the middle
				let visibilityThreshold = middleLinks / 2;
				links.forEach((link, index) => {
					if (index >= startShow && index < totalLinks - endShow) {
						visibilityThreshold -= maxMiddleLinks;
						if(visibilityThreshold < 0) {
							visibilityThreshold += middleLinks;
						}
						else {
							toRemove.push(link.parentNode);
						}
					}
				});
			}
		}
	}
	toRemove.forEach(td => td.remove());
}

function isCorrectPage() {
	// Regular expression to match the URL pattern
	const urlPattern = /https?:\/\/(www\.)?metamorphose\.org\/thread\/index\.htp.*se0=thread&se1=index/;
	return urlPattern.test(window.location.href);
}

//	Check URL just in case:
if (isCorrectPage()) {
	// Run the function to modify page links
	trimPageLinks();
}
