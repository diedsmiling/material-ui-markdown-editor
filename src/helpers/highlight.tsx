const rules = [
  { regex: /(\*\*|__)(.*?)\1/g, replacement: '<strong>**$2**</strong>' }, // bold
];

export default function highlight(str: string): string {
  let text = str;
  rules.forEach((rule) => {
    text = str.replace(rule.regex, rule.replacement);
  });

  return text;
}
