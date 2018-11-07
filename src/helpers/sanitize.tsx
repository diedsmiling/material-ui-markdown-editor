const rules = [
  { regex: /(\r\n\t|\n|\r\t)/gm, replacement: '<br/>'},
  { regex: /(\*\*|__)(.*?)\1/g, replacement: '<strong>**$2**</strong>' }, // bold
];

export default function sanitize(str: string): string {
  let text = str;
  rules.forEach((rule) => {
    text = text.replace(rule.regex, rule.replacement);
  });
  return text;
}
