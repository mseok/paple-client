import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import mdAttrs from 'markdown-it-attrs';
import mdEmoji from 'markdown-it-emoji';
import mdTaskLists from 'markdown-it-task-lists';
import mdExpandTabs from 'markdown-it-expand-tabs';
import mdAbbr from 'markdown-it-abbr';
import mdSup from 'markdown-it-sup';
import mdSub from 'markdown-it-sub';
import mdMark from 'markdown-it-mark';
import mdImsize from 'markdown-it-imsize';

const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    langPrefix: 'language-',
    typographer: true,
    highlight: function(str, lang) {
        return `<pre class="line-numbers"><code class="language-${lang}">${str}</code></pre>`
    }
})
    .use(mdAttrs)
    .use(mdEmoji)
    .use(mdTaskLists, {label: true, labelAfter: true})
    .use(mdExpandTabs)
    .use(mdAbbr)
    .use(mdSup)
    .use(mdSub)
    .use(mdMark)
    .use(mdImsize)

export default function markdownToHTML(markdownText) {
    return md.render(markdownText)
};