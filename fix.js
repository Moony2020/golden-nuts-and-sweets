
const fs = require('fs');
let text = fs.readFileSync('c:/coding-projects/Golden-Foodstuff-Trading -Co/app/[locale]/page.tsx', 'utf8');

const search = '<div className={styles.featuresInner}>';
const mapBlock = '{stats.map((s, i) => (\\n            <div\\n              key={i}\\n              className={${styles.feature}   }\\n            >\\n              <strong className={styles.featureValue}>{s.value}</strong>\\n              <span className={styles.featureLabel}>{s.desc}</span>\\n            </div>\\n          ))}';

const oldStr = search + '\\n          ' + mapBlock;

const newStr = search + '\\n          {stats.map((s, i) => (\\n            <div key={orig-} className={styles.feature}>\\n              <strong className={styles.featureValue}>{s.value}</strong>\\n              <span className={styles.featureLabel}>{s.desc}</span>\\n            </div>\\n          ))}\\n          {stats.map((s, i) => (\\n            <div key={dup1-} className={${styles.feature} }>\\n              <strong className={styles.featureValue}>{s.value}</strong>\\n              <span className={styles.featureLabel}>{s.desc}</span>\\n            </div>\\n          ))}\\n          {stats.map((s, i) => (\\n            <div key={dup2-} className={${styles.feature} }>\\n              <strong className={styles.featureValue}>{s.value}</strong>\\n              <span className={styles.featureLabel}>{s.desc}</span>\\n            </div>\\n          ))}';

// Just replace everything from search to the end of the map block using regex.
const regex = /<div className=\{styles\.featuresInner\}>[\s\S]*?\{stats\.map\(\(s, i\) => \([\s\S]*?<\/div>\s*\)\)\}/;
text = text.replace(regex, newStr);

fs.writeFileSync('c:/coding-projects/Golden-Foodstuff-Trading -Co/app/[locale]/page.tsx', text);
console.log('Replaced successfully.');

