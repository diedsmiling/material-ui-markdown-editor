export default function getTextNode(node: Node) {
  return Array.from(node.childNodes).find(child => child.nodeType === Node.TEXT_NODE);
}
