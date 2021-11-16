import { Board, ChError, ChThread, Index, Page, Post } from "../../types/response.types";

export const BOARDS_CORRECT_HTML = 
`
    <!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
            <span class="sub" data-description="Notices">
                [<a href="/rules.html">RULEZ</a>]
            </span>
            <span class="sub" data-description="Services">
                [<a href="/rules.html">RULEZ</a>]
            </span>
            <span class="sub" data-description="Elsewhere">
                [<a href="/rules.html">RULEZ</a>]
            </span>
            <span class="sub" data-description="TECH STUFF">
                [<a href="/progr/index.html" title="LIGMA">LIGMA</a>]
            </span>
        </body>
    </html>
`

export const BAD_HTML = `<OH><NO>I AM HAVING A BAAADDDDD TIME/`;

export const BOARDS_NO_CHILDREN =
`
    <!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
            <span class="sub" data-description="Notices">
            </span>
            <span class="sub" data-description="Services">
            </span>
            <span class="sub" data-description="Elsewhere">
            </span>
            <span class="sub" data-description="TECH STUFF">
            </span>
        </body>
    </html>
`

export const THREAD_HTML= 
`
<div class="thread" id="thread_28375" data-board="λ">
   <div class="files">
      <div class="file">
         <p class="fileinfo">File: <a href="/λ/src/1635837697955-0.png" target="_blank">1635837697955-0.png</a> <span class="details">(51.99 KB, 826x569, 826:569, <span class="postfilename" title="Screenshot 2021-11-02 152105.png">Screenshot 2021-11-02 1521….png</span>) <span class='unimportant image_id'><a href="http://imgops.com/https://lainchan.org/λ/src/1635837697955-0.png" target="_blank">ImgOps</a> <a href="http://iqdb.org/?url=https://lainchan.org/λ/src/1635837697955-0.png" target="_blank">iqdb</a></span></span></p>
         <a href="/λ/src/1635837697955-0.png" target="_blank"><img class="post-image" src="/λ/thumb/1635837697955-0.png" style="width:300px;height:207px" alt="" /></a>
      </div>
   </div>
   <div class="post op" id="op_28375" >
      <p class="intro"><input type="checkbox" class="delete" name="delete_28375" id="delete_28375" /><label for="delete_28375"><span class="subject">Help Requested</span> <a class="email" href="mailto:noraesteed@tutanota.com"><span class="name">Jiraya</span></a> <time datetime="2021-11-02T07:21:38Z">2021-11-02 07:21:38</time></label>&nbsp;<a class="post_no" id="post_no_28375" onclick="highlightReply(28375)" href="/λ/res/28375.html#28375">No.</a><a class="post_no" onclick="citeReply(28375)" href="/λ/res/28375.html#q28375">28375</a><a href="/λ/res/28375.html">[Reply]</a></p>
      <div class="body">Hey guys.  I'm trying to generate multiple addresses on the Binance Smart Chain Network using this tool.  <br/><br/><a href="https://web3js.readthedocs.io/en/v1.2.0/web3-eth-accounts.html" rel="nofollow" target="_blank">https://web3js.readthedocs.io/en/v1.2.0/web3-eth-accounts.html</a><br/><br/>I need to generate 2200 addresses and then transfer 5000 tokens to each address.  This is for a raffle that is going to be taking place very soon in which each 5000 tokens qualify as an entry but needs to be in a separate wallet.  <br/><br/><strong>After the raffle ends I will want to be able to recall those tokens back to the main sending wallet</strong>, instead of sending all 2200 back manually one by one.  I think this tool is able to accomplish that exactly but I am not sure how to use it?  Where do I start?  Your enlightenment is appreciated</div>
   </div>
   <div class="postcontainer" id="pc28392" data-board="λ" >
      <div class="sidearrows">&gt;&gt;</div>
      <div class="post reply" id="reply_28392">
         <p class="intro"><input type="checkbox" class="delete" name="delete_28392" id="delete_28392" /><label for="delete_28392"><span class="subject">Multiple ETH addresses under 1 account</span> <span class="name">Jiraya</span> <time datetime="2021-11-03T08:12:19Z">2021-11-03 08:12:19</time></label>&nbsp;<a class="post_no" id="post_no_28392" onclick="highlightReply(28392)" href="/λ/res/28375.html#28392">No.</a><a class="post_no" onclick="citeReply(28392)" href="/λ/res/28375.html#q28392">28392</a></p>
         <div class="files">    </div>
         <div class="body" >I'm trying to make a smart contract on ETH which can control 1000 ETH addresses of my own for a school project.  I would want to be able to disperse tokens to my addresses and then recall them back to the sending wallet at a later time.  Any help regarding this is appreciated.  If you help me and your solution works leave me your ETH or BTC address for $50 reward.  Thanks!</div>
      </div>
   </div>
   <br/>
   <div class="postcontainer" id="pc28471" data-board="λ" >
      <div class="sidearrows">&gt;&gt;</div>
      <div class="post reply" id="reply_28471">
         <p class="intro"><input type="checkbox" class="delete" name="delete_28471" id="delete_28471" /><label for="delete_28471"><span class="name">Technician</span> <time datetime="2021-11-08T19:41:19Z">2021-11-08 19:41:19</time></label>&nbsp;<a class="post_no" id="post_no_28471" onclick="highlightReply(28471)" href="/λ/res/28375.html#28471">No.</a><a class="post_no" onclick="citeReply(28471)" href="/λ/res/28375.html#q28471">28471</a></p>
         <div class="files">    </div>
         <div class="body" >
            how can you not figure this out? <br/><br/>1. make master wallet<br/>2. loop 2200 times with 
            <pre style=" display: inline!important;padding-top: 0px;padding-bottom: 0px;"><code class="hljs css" style="display: inline!important;padding-top: 0px;padding-bottom: 0px; "><span class="hljs-selector-tag">web3</span><span class="hljs-selector-class">.eth</span><span class="hljs-selector-class">.accounts</span><span class="hljs-selector-class">.create</span>(<span class="hljs-selector-tag">web3</span><span class="hljs-selector-class">.utils</span><span class="hljs-selector-class">.randomHex</span>(32)); </code></pre>
            3. make 2200 * 5000 tokens for master wallet<br/>4. send 5000 tokens to the generated wallets<br/>5. for each wallet make a scheduled transaction to send the 5000 tokens to master wallet<br/><span class="quote"><br/>&gt;Name user</span><br/><span class="quote">&gt;Email field filled out</span><br/><span class="quote">&gt;Can't use a library </span><br/><span class="quote">&gt;JS</span><br/>How did you even find this site?
         </div>
      </div>
   </div>
   <br/>
   <div class="postcontainer" id="pc28554" data-board="λ" >
      <div class="sidearrows">&gt;&gt;</div>
      <div class="post reply" id="reply_28554">
         <p class="intro"><input type="checkbox" class="delete" name="delete_28554" id="delete_28554" /><label for="delete_28554"><span class="name">Koichiro</span> <time datetime="2021-11-15T16:08:49Z">2021-11-15 16:08:49</time></label>&nbsp;<a class="post_no" id="post_no_28554" onclick="highlightReply(28554)" href="/λ/res/28375.html#28554">No.</a><a class="post_no" onclick="citeReply(28554)" href="/λ/res/28375.html#q28554">28554</a></p>
         <div class="files">    </div>
         <div class="body" ><a onclick="highlightReply('28392', event);" href="/λ/res/28375.html#28392">&gt;&gt;28392</a><br/>Can you at least be honest? It’s not for a school project, it’s botting a random token for profit. I don’t think people here care about that. This isn’t hyper progressive woke liberal leftist Twitter, Reddit, Discord, this is Lainchan.</div>
      </div>
   </div>
   <br/><br class="clear"/>
   <hr/>
</div>
`

export const PAGE_HTML = 
`
<!doctype html>
<html>
   <head>
   </head>
   <body class="8chan vichan is-not-moderator active-index" data-stylesheet="dark.css">
      <div class="bar top">
         <div class="boardlist"><span class="sub" data-description="Notices">[ <a href="/donate.html">$$$</a> / <a href="/rules.html">rules</a> / <a href="/faq.html">faq</a> / <a href="/news.html">news</a> ]</span>  <span class="sub" data-description="STEM">[ <a href="/λ/index.html" title="Programming">λ</a> / <a href="/Δ/index.html" title="Do It Yourself">diy</a> / <a href="/sec/index.html" title="Security">sec</a> / <a href="/Ω/index.html" title="Technology">tech</a> ]</span>  <span class="sub" data-description="People">[ <a href="/inter/index.html" title="Games and Interactive Media">inter</a> / <a href="/lit/index.html" title="Literature">lit</a> / <a href="/music/index.html" title="Musical and Audible Media">music</a> / <a href="/vis/index.html" title="Visual Media">vis</a> / <a href="/hum/index.html" title="Humanity">hum</a> / <a href="/drug/index.html" title="Drugs 3.0">drg</a> / <a href="/zzz/index.html" title="Consciousness and Dreams">zzz</a> ]</span>  <span class="sub" data-description="Misc">[ <a href="/layer/index.html" title="layer">layer</a> / <a href="/q/index.html" title="Questions and Complaints">q</a> / <a href="/r/index.html" title="Random">r</a> ]</span>  <span class="sub" data-description="Overboards 1">[ <a href="/culture/index.html">cult</a> / <a href="/psy/index.html">psy</a> ]</span>  <span class="sub" data-description="Overboards 2">[ <a href="/mega/index.html">mega</a> / <a href="/random/index.html">random</a> ]</span>  <span class="sub" data-description="Elsewhere">[ <a href="https://github.com/lainchan/lainchan"><i class="fa">&#xf09b;</i></a> / <a href="https://twitter.com/_lainchan"><i class="fa">&#xf099;</i></a> ]</span>  <span class="sub" data-description="Services">[ <a href="/calendar.html">cal</a> / <a href="/irc.html">irc</a> / <a href="/radio.html">radio</a> / <a href="/stream.html">stream</a> / <a href="/zine/">zine</a> ]</span></div>
         <script type='text/javascript'>if (typeof do_boardlist != 'undefined') do_boardlist();</script>
      </div>
      <img class="board_image" src="/b.php" style="width:384px;height:128px" alt="" />
      <div id="pagewrap">
         <header>
            <h1 class="glitch" data-text="/λ/ - Programming">/λ/ - Programming</h1>
            <div class="subtitle">Consider; create; explore; understand; optimize.</div>
         </header>
         ${THREAD_HTML}
         <div class="boardlist bottom"><span class="sub" data-description="Notices">[ <a href="/donate.html">$$$</a> / <a href="/rules.html">rules</a> / <a href="/faq.html">faq</a> / <a href="/news.html">news</a> ]</span>  <span class="sub" data-description="STEM">[ <a href="/λ/index.html" title="Programming">λ</a> / <a href="/Δ/index.html" title="Do It Yourself">diy</a> / <a href="/sec/index.html" title="Security">sec</a> / <a href="/Ω/index.html" title="Technology">tech</a> ]</span>  <span class="sub" data-description="People">[ <a href="/inter/index.html" title="Games and Interactive Media">inter</a> / <a href="/lit/index.html" title="Literature">lit</a> / <a href="/music/index.html" title="Musical and Audible Media">music</a> / <a href="/vis/index.html" title="Visual Media">vis</a> / <a href="/hum/index.html" title="Humanity">hum</a> / <a href="/drug/index.html" title="Drugs 3.0">drg</a> / <a href="/zzz/index.html" title="Consciousness and Dreams">zzz</a> ]</span>  <span class="sub" data-description="Misc">[ <a href="/layer/index.html" title="layer">layer</a> / <a href="/q/index.html" title="Questions and Complaints">q</a> / <a href="/r/index.html" title="Random">r</a> ]</span>  <span class="sub" data-description="Overboards 1">[ <a href="/culture/index.html">cult</a> / <a href="/psy/index.html">psy</a> ]</span>  <span class="sub" data-description="Overboards 2">[ <a href="/mega/index.html">mega</a> / <a href="/random/index.html">random</a> ]</span>  <span class="sub" data-description="Elsewhere">[ <a href="https://github.com/lainchan/lainchan"><i class="fa">&#xf09b;</i></a> / <a href="https://twitter.com/_lainchan"><i class="fa">&#xf099;</i></a> ]</span>  <span class="sub" data-description="Services">[ <a href="/calendar.html">cal</a> / <a href="/irc.html">irc</a> / <a href="/radio.html">radio</a> / <a href="/stream.html">stream</a> / <a href="/zine/">zine</a> ]</span></div>
         <footer>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p class="unimportant" style="margin-top:20px;text-align:center;">- <a href="http://tinyboard.org/">Tinyboard</a> + <a href='https://int.vichan.net/devel/'>vichan</a> + <a href='https://github.com/lainchan/lainchan'>lainchan</a> 5.1.3 -<br><a href="http://tinyboard.org/">Tinyboard</a> Copyright &copy; 2010-2014 Tinyboard Development Group<br><a href="https://engine.vichan.net/">vichan</a> Copyright &copy; 2012-2016 vichan-devel<br><a href="https://github.com/lainchan/lainchan">lainchan</a> Copyright &copy; 2014-2017 lainchan Administration</p>
            <p class="unimportant" style="text-align:center;">All trademarks, copyrights, comments, and images on this page are owned by and are the responsibility of their respective parties.</p>
            <p class="unimportant" style="text-align:center;">The administration of lainchan.org has been issued 0 (zero) requests for information by any third party,<br/>including but not limited to government agencies.</p>
         </footer>
      </div>
      <div class="bar bottom">
         <div class="pages">
            Previous [  <a class="selected">1</a> / <a href="/λ/2.html">2</a> / <a href="/λ/3.html">3</a> / <a href="/λ/4.html">4</a> / <a href="/λ/5.html">5</a> / <a href="/λ/6.html">6</a> / <a href="/λ/7.html">7</a> / <a href="/λ/8.html">8</a> / <a href="/λ/9.html">9</a> / <a href="/λ/10.html">10</a> / <a href="/λ/11.html">11</a> / <a href="/λ/12.html">12</a> / <a href="/λ/13.html">13</a> ] 
            <form action="/λ/2.html" method="get"><input type="submit" value="Next" /></form>
            |  <a href="/λ/catalog.html">Catalog</a> |  <a href="/">Home</a>
         </div>
      </div>
      </div><script type="text/javascript">ready();</script>
   </body>
</html>
`

export const EMPTY_HTML =
`
    <!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
        </body>
    </html>
`

export const ANY_500_ERR: ChError = 
    {name: 'ERR', message: 'WHOA DUDE THERE IS AN ERROR', status: { code: 500, name: 'ERR'}};

export const CORRECT_BOARD: Board = { id: 'a', title: 'AAA', type: 'LETTERS'};

export const CORRECT_INDEX: Index = { boards: [CORRECT_BOARD] };

export const CORRECT_THREAD: ChThread =
{
    id: '28375',
    board: 'progr',
    pinned: false,
    replies: -1,
    images: -1,
    title: 'Help Requested',
    thumbNail: '/λ/thumb/1635837697955-0.png',
    expanded: false,
    posts: [
      {
        tripcode: '',
        posterName: 'Jiraya',
        dateTime: '2021-11-02T07:21:38Z',
        id: '28375',
        text: [
            {
                pt: null,
                text: "Hey guys.  I'm trying to generate multiple addresses on the Binance Smart Chain Network using this tool.  "
            },
            { br: null },
            { br: null },
            {
                anc: null,
                href: 'https://web3js.readthedocs.io/en/v1.2.0/web3-eth-accounts.html',
                text: 'https://web3js.readthedocs.io/en/v1.2.0/web3-eth-accounts.html'
            },
            { br: null },
            { br: null },
            {
                pt: null,
                text: 'I need to generate 2200 addresses and then transfer 5000 tokens to each address.  This is for a raffle that is going to be taking place very soon in which each 5000 tokens qualify as an entry but needs to be in a separate wallet.  '
            },
            { br: null },
            { br: null },
            {
                bdfc: null,
                text: 'After the raffle ends I will want to be able to recall those tokens back to the main sending wallet'
            },
            {
                pt: null,
                text: ', instead of sending all 2200 back manually one by one.  I think this tool is able to accomplish that exactly but I am not sure how to use it?  Where do I start?  Your enlightenment is appreciated'
            }
        ],
        isOP: true,
        files: [      
            {
                url: '/λ/src/1635837697955-0.png',
                name: 'Screenshot 2021-11-02 1521….png',
                thumbnail: '/λ/thumb/1635837697955-0.png'
            }
        ],
        repliesById: []
      },
      {
        tripcode: '',
        posterName: 'Jiraya',
        dateTime: '2021-11-03T08:12:19Z',
        id: '28392',
        text: [
            {
                pt: null,
                text: "I'm trying to make a smart contract on ETH which can control 1000 ETH addresses of my own for a school project.  I would want to be able to disperse tokens to my addresses and then recall them back to the sending wallet at a later time.  Any help regarding this is appreciated.  If you help me and your solution works leave me your ETH or BTC address for $50 reward.  Thanks!"     
            },          
        ],
        isOP: false,
        files: [],
        repliesById: ['28554']
      },
      {
        tripcode: '',
        posterName: 'Technician',
        dateTime: '2021-11-08T19:41:19Z',
        id: '28471',
        text: [
            { pt: null, text: '\n            how can you not figure this out? ' },
            { br: null },
            { br: null },
            { pt: null, text: '1. make master wallet' },
            { br: null },
            { pt: null, text: '2. loop 2200 times with \n            ' },
            {
                blc: null,
                text: '<code class="hljs css" style="display: inline!important;padding-top: 0px;padding-bottom: 0px; "><span class="hljs-selector-tag">web3</span><span class="hljs-selector-class">.eth</span><span class="hljs-selector-class">.accounts</span><span class="hljs-selector-class">.create</span>(<span class="hljs-selector-tag">web3</span><span class="hljs-selector-class">.utils</span><span class="hljs-selector-class">.randomHex</span>(32)); </code>'
            },
            {
                pt: null,
                text: '\n            3. make 2200 * 5000 tokens for master wallet'
            },
            { br: null },
            { pt: null, text: '4. send 5000 tokens to the generated wallets' },
            { br: null },
            {
                pt: null,
                text: '5. for each wallet make a scheduled transaction to send the 5000 tokens to master wallet'
            },
            { br: null },
            { qt: null, text: '<br>&gt;Name user' },
            { br: null },
            { qt: null, text: '&gt;Email field filled out' },
            { br: null },
            { qt: null, text: "&gt;Can't use a library " },
            { br: null },
            { qt: null, text: '&gt;JS' },
            { br: null },
            { pt: null, text: 'How did you even find this site?\n         ' },

        ],
        isOP: false,
        files: [],
        repliesById: []
      },
      {
        tripcode: '',
        posterName: 'Koichiro',
        dateTime: '2021-11-15T16:08:49Z',
        id: '28554',
        text: [
            { anc: null, href: '/λ/res/28375.html#28392', text: '&gt;&gt;28392' },
            { br: null },
            {
                pt: null,
                text: 'Can you at least be honest? It’s not for a school project, it’s botting a random token for profit. I don’t think people here care about that. This isn’t hyper progressive woke liberal leftist Twitter, Reddit, Discord, this is Lainchan.'
            },
        ],
        isOP: false,
        files: [],
        repliesById: []
      }
    ]
  };

export const CORRECT_PAGE: Page = 
{
    board: 'progr',
    num: 1,
    threads: [CORRECT_THREAD],
    totalPages: 13,
}