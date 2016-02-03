import { join } from 'path';
import { wrap } from 'co';
import { readFile } from 'mz/fs';
import remark from 'remark';
import remarkHtml from 'remark-html';
import remarkYaml from 'remark-yaml';
import { safeLoad } from 'js-yaml';

const processor = remark().use(remarkYaml).use(remarkHtml, {entities: 'escape'});
const parser = remark().use(remarkYaml);

export default wrap(function *(fpath) {
  const md = yield readFile(join(__dirname, '../../content', fpath), 'utf8');
  const article = processor.process(md, {gfm: true});
  const config = safeLoad(parser.parse(md).children[0].value);
  return { config, article };
});
