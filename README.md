# metamorphose-trimmer
Browser extension and Javascript for cleaning up the message board index on metamorphose.org

This simple Chrome extension only affects the message board index pages on Metamorphose.org and removes some page links on topics that have more than 25 pages. This brings the width of the index down to a much more reasonable range, so you can see the timestamp for the latest post and access page links without scrolling. It keeps the first 5 page links and the last 10 and reduces everything in between those down to 10 links. The thread pages still have all the links, so if you want a specific page, just click any page link in the index first and then select the page from the thread itself.

For example, a popular thread with 113 pages will trim down to this instead of listing all 113 page links:

Page 1 2 3 4 5 10 20 30 40 50 59 69 79 89 99 104 105 106 107 108 109 110 111 112 113

The Javascript also works in Safari (and presumably other browsers) and can be run from the Javascript console.

To install, open chrome://extensions/ and enable "Developer mode", then click "Load unpacked" and select the directory that has the manifest.json file.

You can also install an extension from the Chrome store that allows you to run a custom script when you visit a URL and just paste the script there along with the pattern to match the index pages. For example, the "Custom Javascript for Websites 2" extension will work well. Just open the extension when you are on the site and paste the Javascript into the window. The code contains an address check to make sure it only runs on the message board index pages. https://chromewebstore.google.com/detail/ddbjnfjiigjmcpcpkmhogomapikjbjdk
